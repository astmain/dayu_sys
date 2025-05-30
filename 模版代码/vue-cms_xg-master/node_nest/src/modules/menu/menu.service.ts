import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MenuAddDto, MenuListDto, MenuUpdateDto } from './dto/index';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { MsgService } from '../common/msg/msg.service';
import { handleCurTime, handleFilterObjectEmptyData } from '@/utils/utils';
import { AuthService } from '@/modules/auth/auth.service';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { RoleEntity } from '@/modules/role/entities/role.entity';
import { RedisInstance } from '@/common/redis';
import { redisEnum, visibleEnum } from "@/common/enum";

@Injectable()
export class MenuService {
  constructor(@InjectRepository(MenuEntity) private readonly menuEntity:Repository<MenuEntity>,
              @Inject(forwardRef(() => AuthService)) private readonly authService:AuthService,
              @InjectRepository(UserEntity) private readonly userEntity:Repository<UserEntity>,
              @InjectRepository(RoleEntity) private readonly roleEntity:Repository<RoleEntity>,
              private readonly msgService:MsgService
  ) {

  }

  /**
   * 后台左侧菜单栏
   */
  async handleMenuList() {
    let menuList;
    try {
      menuList = await this.menuEntity.createQueryBuilder().select().orderBy("sort").getMany()
    }catch (error) {
      return this.msgService.fail(error);
    }
    let res = this.handleDealMenu(menuList,0).filter(res=>{
      return res??""
    })
    return this.msgService.success(res);
  }

  /**
   * 菜单添加
   * @param menuAddDto
   */
  async menuAdd(menuAddDto: MenuAddDto) {
    let {menuName,pid} = menuAddDto
    let filterData = handleFilterObjectEmptyData(menuAddDto);
    const num = await this.menuEntity.createQueryBuilder().where({menuName,pid}).getCount()
    if(num>0){
      return this.msgService.fail("菜单栏名称重复", 404);
    }
    try {
      await this.menuEntity.createQueryBuilder().insert().values({...filterData}).execute();
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }

    return this.msgService.success()
  }

  /**
   * 查询所有列表
   */
  async menuList(menuListDto:MenuListDto) {
    let id = menuListDto.id??0
    delete menuListDto.id;
    let filterData = handleFilterObjectEmptyData(menuListDto);
    let menuList;
    try {
      menuList = await this.menuEntity.createQueryBuilder().where({...filterData}).orderBy("sort").getMany()
    }catch (error) {
      return this.msgService.fail(error);
    }
    let res = this.handleDealMenu(menuList,id).filter(res=>{
      return res??""
    })
    return this.msgService.success(res);
  }


  /**
   * 处理菜单栏上下级关系
   */
  handleDealMenu(data:any,id){
    let arr = []
    for(let i in data){
      if(data[i]["pid"] == id ){
        arr[i] = data[i]
        arr[i]["children"] = this.handleDealMenu(data,data[i]["id"])?.filter((val)=>{
          return val??""
        })
      }
    }
    return arr
  }

  /**
   * 更新
   * @param menuUpdateDto
   */
  async menuUpdate(menuUpdateDto:MenuUpdateDto) {
    let {id} = menuUpdateDto
    let filterData = handleFilterObjectEmptyData(menuUpdateDto);
    try {
      await this.menuEntity.createQueryBuilder().where("id = :id", { id }).update().set({...filterData}).execute()
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }

  /**
   * 删除
   * @param id
   */
  async delete(id: string) {
    let ids = id.split(",")
    let menuList = await this.menuEntity.createQueryBuilder().delete().where("id in (:id)",{id:[...ids]}).execute()

    let queryRunner = await this.menuEntity.manager.connection.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      let allData = await this.dealPollFunction(menuList)
      if(allData.length>0){
        for(let i in allData){
          await queryRunner.manager.query(`DELETE FROM g_menu_list WHERE id = ${allData[i]["id"]}`)
        }
      }
      await queryRunner.commitTransaction()
    }catch (error){
      await queryRunner.rollbackTransaction()
      return this.msgService.fail(error);
    }finally {
      await queryRunner.release()
    }
    return this.msgService.success();
  }
  //删除父子级的数据
  async dealPollFunction(menuList){
    let data = []
    if(menuList.length>0) {//有值
      for(let i in menuList){
        let queryRunner = await this.menuEntity.manager.connection.createQueryRunner()
        await queryRunner.startTransaction()
        try {
          data = await queryRunner.manager.query(`SELECT * FROM g_menu_list WHERE id = ${menuList[i]["id"]}`)
          let menuId = menuList[i]["id"];
          let childData = await queryRunner.manager.query(`SELECT * FROM g_menu_list WHERE pid = ${menuId}`)
          if(childData.length>0){
            for(let i in childData){
              data.push({...childData[i]})
            }
            await this.dealPollFunction(childData)
          }
          await queryRunner.commitTransaction()
        }catch (error) {
          await queryRunner.rollbackTransaction()
          throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
        }finally {
          await queryRunner.release()
        }
      }
    }
    return data;
  }


  /**
   * 获取当前用户的路由
   * @param token
   */
  async curRouters(token:string) {
    let tokenData = await this.authService.verifyToken(token)
    if(!tokenData){
      return this.msgService.fail("token过期");
    }
    let uid = tokenData.id;
    let redisInstance = new RedisInstance("menu",redisEnum.menu)
    let redisMenuList:any = await redisInstance.get(token+uid);
    let menuList = []
    if(redisMenuList && JSON.parse(redisMenuList)?.menuList){
      menuList = JSON.parse(redisMenuList)?.menuList;
    }
    if(menuList?.length>0){
      let menuListCount = await this.menuEntity.createQueryBuilder().getCount()
      let redisMenuListCount = this.handleGetMenuListCount(menuList)
      //菜单有变化，需要重新获取
      if(redisMenuListCount!=menuListCount){
        let res = await this.handleGetMenuListByToken(token)
        await redisInstance.set(token+uid,JSON.stringify({menuList:res}))
        //通过菜单id 获取是否勾选递归数组
        return this.msgService.success(res);
      }else{
        return this.msgService.success(menuList);
      }
    }else{
      let res = await this.handleGetMenuListByToken(token)
      await redisInstance.set(token+uid,JSON.stringify({menuList:res}))
      //通过菜单id 获取是否勾选递归数组
      return this.msgService.success(res);
    }
  }
  /**
   * 通过token获取用户id，通过用户id获取用户角色id，然后获取对应的路由列表
   * @param token
   */
  async handleGetMenuListByToken(token:string){
    let tokenData = await this.authService.verifyToken(token)
    let uid = tokenData.id;
    //用户详细信息
    let userData = await this.userEntity.createQueryBuilder().select(["roleId"]).where({id:uid}).getRawOne()
    let roleId = userData?.roleId;
    let roleData = await this.roleEntity.createQueryBuilder().select(["menuIds","roleName"]).where({id:roleId}).getRawOne()
    let menuIdsArr = roleData.roleName=="超级管理员"?[]:roleData.menuIds.split(",")
    //如果是超级管理员显示所有，如果角色不是超级管理员通过角色中的menuIds来显示对应的菜单栏

    let menuList = []
    if(menuIdsArr.length>0){
      menuList = await this.menuEntity.createQueryBuilder().select("*").where("(menuType = 1 OR menuType = 2) AND id in (:id)",{id:[...menuIdsArr]}).orderBy("sort").getRawMany()
    }else{//超级管理员，显示所有
      menuList = await this.menuEntity.createQueryBuilder().select("*").where("menuType = 1 OR menuType = 2").orderBy("sort").getRawMany()
    }
    return this.handleRecursiveLoopRouters(menuList, 0).filter(res => {
      return res ?? ""
    });
  }
  handleGetMenuListCount(list:any[]):number{
    let numTotal = 0;
    for(let i in list){
      numTotal+=1
      if(list[i]["children"]?.length>0){
        numTotal=numTotal+this.handleGetMenuListCount(list[i]["children"])
      }
    }
    return numTotal;
  }
  /**
   * 处理菜单栏上下级关系
   * lev = 1;//1为顶级导航
   */
  handleRecursiveLoopRouters(data:any,id?:number|string,lev?:number){
    let arr = []
    if(!lev){
      lev = 1;
    }
    for(let i in data){
      if(data[i]["pid"] == id ){
        let children = this.handleRecursiveLoopRouters(data,data[i]["id"],2)?.filter((val)=>{
          return val??""
        });
        let component = ""
        if(lev==1 && data[i]["menuType"]==1){
          component = "Layout"
        }else if(lev>1 && children.length>0){//二级导航以上，并且有子路由时
          component = "ParentView"
        }else{
          component = data[i]["component"]
        }
        let alwaysShow = false;
        if(children.length==1){
            alwaysShow = children[0]['visible']==true?false:true;
        }else if(children.length>0){
          alwaysShow = true
        }else{
          alwaysShow = false;
        }
        arr[i]={
          alwaysShow,//判断是否需要二级下拉框，true为需要显示，false为不需要显示.下级只有一个，那唯一的一个是隐藏的，alwaysShow也应该是true
          name:data[i]["menuName"],//菜单名称
          path:data[i]["path"]?"/"+data[i]["path"]:"/",//菜单路径
          hidden:data[i]["visible"]==1?false:true,//是否显示
          component,//组件路径
          meta:{
            icon:data[i]["icon"],
            link:data[i]["link"],
            noCache:data[i]["isCache"]==visibleEnum.show?true:false,
            title:data[i]["menuName"],
          },//组件路径
        }
        if(children.length>0){
          arr[i]={
            ...arr[i],
            children
          }
        }
      }
    }
    return arr
  }
}
