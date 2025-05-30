import { forwardRef,Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { AuthService } from '../auth/auth.service';
import {MsgService} from "@/modules/common/msg/msg.service";
import {RoleEntity} from "@/modules/role/entities/role.entity";
import { LoginLogEntity } from '@/modules/log/entities/loginLog.entity';
import { ArtEntity } from '@/modules/art/entities/art.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { handleFilterObjectEmptyData, handleParseTime, handleSort } from "@/utils/utils";
import { ObtainUserSourcesDto, WatchUserAccessPageDto } from './dto/index';
import {UserSourcesEntity} from "@/modules/home/entities/userSources.entity";
import {ActivePageEntity} from "@/modules/home/entities/activePage.entity";
import {Base64} from "js-base64";


@Injectable()
export class HomeService {
  constructor(
    //依赖注入
    @InjectRepository(UserEntity) private readonly userEntity:Repository<UserEntity>,
    @InjectRepository(RoleEntity) private readonly roleEntity:Repository<RoleEntity>,
    @InjectRepository(LoginLogEntity) private readonly logEntity:Repository<LoginLogEntity>,
    @InjectRepository(ArtEntity) private readonly artEntity:Repository<ArtEntity>,
    @InjectRepository(UserSourcesEntity) private readonly userSourcesEntity:Repository<UserSourcesEntity>,
    @InjectRepository(ActivePageEntity) private readonly activePageEntity:Repository<ActivePageEntity>,
    @Inject(forwardRef(() => AuthService)) private readonly authService:AuthService,
    private readonly msgService:MsgService
  ) {}

  //后台访问人数总数
  async accessStatistics(){
    let loginLogTotal;
    try {
      loginLogTotal = await this.logEntity.createQueryBuilder().getCount()
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success(loginLogTotal==0?"0":loginLogTotal);
  }

  //文章总数
  async artStatistics(){
    let artTotal;
    try {
      artTotal = await this.artEntity.createQueryBuilder().getCount()
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success(artTotal==0?"0":artTotal);
  }

  //访问人数时间段
  async accessTimeSlot(arr:string[]){
    let loginLogArr = []
    try {
      for(let i in arr){
        let curTime = handleParseTime(new Date(arr[i]+" 00:00:00").getTime())
        let endTime = handleParseTime(new Date(arr[i]+" 23:59:59").getTime())
        let curNum = await this.logEntity.createQueryBuilder().where("addTime BETWEEN :curTime AND :endTime", { curTime,endTime }).getCount()
        loginLogArr.push({
          curDate:arr[i],
          curNum
        })
      }
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success(loginLogArr??[]);
  }
  //获取用户来源
  async obtainUserSources(obtainUserSourcesDto:ObtainUserSourcesDto){
    let filterData = handleFilterObjectEmptyData(obtainUserSourcesDto);
    try {
      await this.userSourcesEntity.createQueryBuilder().insert().values({...filterData,webUrl:Base64.decode(obtainUserSourcesDto.webUrl)}).execute();
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }
  //用户来源排名
  async userSourcesTop(){
    let data = []
    try {
      let userSources = await this.userSourcesEntity.createQueryBuilder().getMany()
      let webUrl = []
      let webArr = []
      for(let i in userSources){
        if(!webUrl.includes(userSources[i]["webUrl"])){
          webUrl.push(userSources[i]["webUrl"])
          webArr.push(userSources[i]["pageUrl"])
        }
      }
      for(let w in webUrl){
        data.push({
          webUrl:webUrl[w],
          num:0,
        })
      }
      for(let i in userSources){
        for(let q in data){
          if(data[q]["webUrl"]==userSources[i]["webUrl"]){
            data[q]["num"]++;
          }
        }
      }
      data = data.sort(handleSort("num", "desc"))
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success(data);
  }

  //监听用户访问页面
  async watchUserAccessPage(watchUserAccessPageDto:WatchUserAccessPageDto){
    let filterData = handleFilterObjectEmptyData(watchUserAccessPageDto);
    try {
      await this.activePageEntity.createQueryBuilder().insert().values({...filterData}).execute();
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }
  //活跃页面排名
  async activePageTop(){
    let data = []
    try {
      let activePageData = await this.activePageEntity.createQueryBuilder().getMany()
      let webUrl = []
      let webArr = []
      for(let i in activePageData){
        if(!webArr.includes(activePageData[i]["pageUrl"])){
          webUrl.push({pageUrl:activePageData[i]["pageUrl"],pageName:activePageData[i]["pageName"]})
          webArr.push(activePageData[i]["pageUrl"])
        }
      }
      for(let w in webUrl){
        data.push({
          pageUrl:webUrl[w]["pageUrl"],
          pageName:webUrl[w]["pageName"],
          num:0,
        })
      }
      for(let i in activePageData){
        for(let q in data){
          if(data[q]["pageUrl"]==activePageData[i]["pageUrl"]){
            data[q]["num"]++;
          }
        }
      }
      data = data.sort(handleSort("num", "desc"))
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success(data);
  }

}
