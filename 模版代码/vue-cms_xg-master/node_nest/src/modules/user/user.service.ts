import { forwardRef, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from "axios"
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { getConnection, Repository } from 'typeorm';
import {
  handleCurTime,
  handleDealIpv6ToIpv4,
  handleFilterObjectEmptyData, handleGetCode, handleInterceptToken,
  handleReplaceSpecialChar,
  securityMd5,
} from '@/utils/utils';
import { AuthService } from '../auth/auth.service';
import { GiteeLoginDto, OnlineUserListDto, QqLoginDto, UserAddDto, UserListDto, UserUpdateDto } from './dto';
import { MsgService } from '@/modules/common/msg/msg.service';
import { RoleEntity } from '@/modules/role/entities/role.entity';
import { SysConfigEntity } from '@/modules/sysConfig/entities/sysConfig.entity';
import { ImgEntity } from '@/modules/img/entities/img.entity';
import { MenuEntity } from '@/modules/menu/entities/menu.entity';
import {
  commonEnum,
  operationTypeEnum,
  permsEnum,
  redisEnum,
  sysConfigEnum,
  userLoginStatusEnum,
  userTypeEnum,
} from '@/common/enum';
import { RedisInstance } from '@/common/redis';
import { SysConfigService } from '@/modules/sysConfig/sysConfig.service';
import { giteeOauthConfig, qqOauthConfig } from '@/utils/config';

interface resInterface {
  data:boolean|string
  msg:string
}

@Injectable()
export class UserService {

  constructor(
    //依赖注入
    @InjectRepository(UserEntity) private readonly userEntity:Repository<UserEntity>,
    @InjectRepository(RoleEntity) private readonly roleEntity:Repository<RoleEntity>,
    @InjectRepository(SysConfigEntity) private readonly sysConfigEntity:Repository<SysConfigEntity>,
    @InjectRepository(ImgEntity) private readonly imgEntity:Repository<ImgEntity>,
    @InjectRepository(MenuEntity) private readonly menuEntity:Repository<MenuEntity>,
    @Inject(forwardRef(() => AuthService)) private readonly authService:AuthService,
    private readonly sysConfigService:SysConfigService,
    private readonly msgService:MsgService,
  ) {}

  /**
   * 用户列表
   * @param userListDto
   */
  async userList(userListDto:UserListDto) {
    let {pageSize,currentPage} = userListDto
    let filterData = handleFilterObjectEmptyData(userListDto);
    let startNum = pageSize*(currentPage-1)
    let userTotal;
    try {
      userTotal = await this.userEntity.createQueryBuilder().where({...filterData}).getCount()
    }catch (error) {
      return this.msgService.fail(error);
    }
    let user;
    try {
      user = await this.userEntity.createQueryBuilder().where({...filterData}).skip(startNum).take(pageSize).getMany()
      if(user.length>0){
        let roleList = await this.roleEntity.createQueryBuilder().select(["id","roleName"]).getRawMany();
        for(let i in user){
          for(let q in roleList){
            if(user[i]["roleId"] == roleList[q]["id"]){
              user[i]["roleName"] = roleList[q]["roleName"]??"";
            }
          }

          if(user[i]["headImgId"]>0 && user[i]["headImgId"]){
            let img = await this.imgEntity.createQueryBuilder().select(["id","imgMidUrl"]).where("id = :id",{id:user[i]["headImgId"]}).getRawOne();
            user[i]["headImg"] = img?img["imgMidUrl"]:""
          }else{
            user[i]["headImg"] = ""
          }
        }
      }

    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success({total:userTotal,data:user});
  }

  /**
   * 添加用户
   * @param userAddDto
   */
  async userAdd(userAddDto: UserAddDto) {
    let {nickName,username,originalPwd} = userAddDto
    if(!nickName){
      userAddDto.nickName = username
    }
    let filterData = handleFilterObjectEmptyData(userAddDto);
    const num = await this.userEntity.createQueryBuilder().where({username}).getCount()
    if(num>0){
      return this.msgService.fail("用户名重复", 404);
    }
    let password = JSON.parse(JSON.stringify(originalPwd))
    password = securityMd5(password)
    try {
      await this.userEntity.createQueryBuilder().insert().values({...filterData,originalPwd,password}).execute();
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }
    return this.msgService.success()
  }

  /**
   * 编辑用户
   * @param userUpdateDto
   */
  async userUpdate(userUpdateDto:UserUpdateDto) {
    let {id,password,originalPwd} = userUpdateDto
    let filterData = handleFilterObjectEmptyData(userUpdateDto);
    password = JSON.parse(JSON.stringify(originalPwd))
    password = securityMd5(password)
    try {
      await this.userEntity.createQueryBuilder().where("id = :id", { id }).update().set({...filterData,originalPwd,password}).execute();
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
    try {
      await this.userEntity.createQueryBuilder().delete().where("id in (:id)",{id:[...ids]}).execute()
    }catch (error){
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }

  /**
   * 通过用户名查找用户详情
   * @param username
   */
  async userDetailByUserName(username:string):Promise<UserEntity>{
    return await this.userEntity.createQueryBuilder().where({username}).getOne()
  }

  /**
   * 通过用户id查找用户详情
   * @param id
   */
  async userDetailByUserId(id:number):Promise<UserEntity | undefined>{
    let userDetail  =  await this.userEntity.createQueryBuilder().select(["*"]).where({id}).getRawOne();
    if(userDetail["headImgId"]>0 && userDetail["headImgId"]){
      let img = await this.imgEntity.createQueryBuilder().select(["id","imgMidUrl"]).where("id = :id",{id:userDetail["headImgId"]}).getRawOne();
      userDetail["headImg"] = img?img["imgMidUrl"]:""
    }else{
      userDetail["headImg"] = ""
    }
    if(userDetail["roleId"]>0 && userDetail["roleId"]){
      let img = await this.roleEntity.createQueryBuilder().select(["id","roleName"]).where("id = :id",{id:userDetail["roleId"]}).getRawOne();
      userDetail["roleName"] = img?img["roleName"]:""

    }else{
      userDetail["roleName"] = ""
    }
    return userDetail
  }

  /**
   * 通过用户id查找用户详情
   * @param username
   * @param password
   */
  async userDetailByUsernameAndPwd(username:string,password:string):Promise<UserEntity | undefined>{
    let originalPwd = password
    password = securityMd5(password)
    return await this.userEntity.createQueryBuilder().where({username, password, originalPwd}).getOne()
  }

  /**
   * 登录passport-jwt
   * @param user
   */
  async login(user:{username:string,password:string,ip:string,operationSystem:string,browser:string,userType:number}){
    //加锁
    //https://www.bookstack.cn/read/TypeORM-0.2.20-zh/spilt.21.select-query-builder.md
    // let test = await getRepository(TaskSchedulingEntity).createQueryBuilder("user").setLock("pessimistic_read").getMany();
    let {username,password,operationSystem,browser,userType} = user
    username = handleReplaceSpecialChar(username)
    password = handleReplaceSpecialChar(password)
    let userData;
    try {
      userData = await this.userDetailByUsernameAndPwd(username,password)
    } catch (error) {
      return this.msgService.fail(error)
    }
    if(userType!=userTypeEnum.formalType){
      return this.msgService.fail("试用账号不能登录,请用正式账号登录")
    }
    if(userData["status"]!=1){
      return this.msgService.fail("该账号已被停用，请联系管理员")
    }
    if(userData){
      let {id,username} = userData;
      let ip  = handleDealIpv6ToIpv4(user.ip)
      let token = this.authService.createToken({id,username,ip})
      await this.updateUserInfoStatus(id,token,ip,operationSystem,browser)
      return {
        id,username,token
      }
    }else{

      return this.msgService.fail("账号密码不匹配",HttpStatus.UNAUTHORIZED)
    }
  }
  /**
   * 退出登陆 清空token
   * @param uid
   */
  async logout(uid:number,token:string){
    await this.handleClearUserInfoInTheRedis(token)
    try {
      await this.userEntity.createQueryBuilder().where("id = :id", { id:uid }).update().set({token:""}).execute();
    }catch (error){
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }
  //清空redis中的用户信息
  async handleClearUserInfoInTheRedis(token){
    token = handleInterceptToken(token)
    let redisInstance = new RedisInstance("userInfo",redisEnum.userInfo)
    await redisInstance.del(token)
  }
  //更新用户登录信息状态
  async updateUserInfoStatus(id,token,ip,operationSystem:string,browser:string){
    let updateTime = handleCurTime();
    return await this.userEntity.createQueryBuilder().where("id = :id", { id }).update()
      .set({token,loginTime:updateTime,loginIp:ip,loginSystem:operationSystem,loginBrowser:browser}).execute();
  }

  /**
   * 解码token获取用户id和username
   * @param token
   */
  async userInfo(token:string){
    let redisInstance = new RedisInstance("userInfo",redisEnum.userInfo)
    let data = {
      "userInfo": {},//用户信息
      "permissions": [],//权限
      "roles": [],//角色
      "sysConfig": [],//系统配置
    }
    let tokenData = handleInterceptToken(token)
    if(await redisInstance.isExists(tokenData)){
      data = await redisInstance.get(tokenData)
    }else{
      let tokenData = await this.authService.verifyToken(token)
      let {id} = tokenData
      let uid = id;
      //用户详细信息
      let userData = await this.userEntity.createQueryBuilder().where({id:uid}).getOne()
      let roleId = userData?.roleId;
      let roleData = await this.roleEntity.createQueryBuilder().where({id:roleId}).getOne()
      data.userInfo = {
        id:userData.id,
        username:userData.username,
        giteeNickname:userData.giteeNickname,
        isGiteeAuth:userData.giteeId?true:false,
        qqNickname:userData.qqNickname,
        isQQAuth:userData.qqId?true:false,
        roleName:roleData.roleName??"",
        email:userData.email,
        sex:userData.sex,
        phone:userData.phone,
      }
      //权限字符
      let permissions = [];
      if(roleData?.perms==permsEnum.adminPerms){
        permissions.push("*:*:*")
      }else{
        if(roleData?.menuIds.split(",").length>0){
          let menuIdArr = roleData?.menuIds.split(",")
          for(let i in menuIdArr){
            let menuData = await this.menuEntity.createQueryBuilder().where({id:menuIdArr[i]}).getOne()
            if(menuData){
              permissions.push(menuData["perms"])
            }
          }
        }
        permissions = permissions.filter((item)=>{
          return item && item;
        })
      }
      data.permissions = permissions
      //用户角色
      data.roles = [`${roleData?.perms}`]
      let key = sysConfigEnum.baseSetting
      data.sysConfig = await this.sysConfigService.handleGetSysData(key)
      await redisInstance.set(tokenData,data)
    }
    return await this.msgService.success(data)

  }

  /**
   * 修改用户状态
   * @param id
   * @param status
   */
  async userChangeStatus(id:number,status: number|string) {
    try {
      await this.userEntity.createQueryBuilder().where("id = :id", { id }).update().set({status}).execute();
    }catch (error){
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }

  /**
   * 在线用户列表
   * @param onlineUserListDto
   */
  async onlineUserList(onlineUserListDto:OnlineUserListDto) {
    let {pageSize,currentPage} = onlineUserListDto
    let filterData = handleFilterObjectEmptyData(onlineUserListDto);
    let startNum = pageSize*(currentPage-1)
    let userTotal;
    try {
      userTotal = await this.userEntity.createQueryBuilder().where({...filterData}).getCount()
    }catch (error) {
      return this.msgService.fail(error);
    }
    let user;
    try {
      user = await this.userEntity.createQueryBuilder().where({...filterData}).skip(startNum).take(pageSize).getMany()
      if(user.length>0){
        let roleList = await this.roleEntity.createQueryBuilder().select(["id","roleName"]).getRawMany();
        for(let i in user){
          for(let q in roleList){
            if(user[i]["roleId"] == roleList[q]["id"]){
              user[i]["roleName"] = roleList[q]["roleName"]??"";
            }
          }
          if(user[i]["token"]){
            let tokenData = await this.authService.handleTokenGetData(user[i]["token"])
            if(tokenData){
              let {exp} = tokenData;
              let curTime = handleCurTime()
              user[i]["isOnline"] = exp*1000 <= curTime ? userLoginStatusEnum.Offline :userLoginStatusEnum.Online
            }else{
              user[i]["isOnline"] = userLoginStatusEnum.Offline
            }
          }else{
            user[i]["isOnline"] = userLoginStatusEnum.Offline
          }
        }
      }

    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success({total:userTotal,data:user});
  }

  /**
   * 修改状态为退出
   * 清空token
   * @param id
   */
  async changeStatusExit(id:number) {
    try {
      await this.userEntity.createQueryBuilder().where("id = :id", { id }).update().set({token:""}).execute();
    }catch (error){
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }

  /**
   * 随机登录账号
   * @param user
   */
  async randomAccountLogin(user:{username:string,password:string,ip:string,operationSystem?:string,browser?:string}){
    let {username,password,operationSystem,browser} = user
    username = handleReplaceSpecialChar(username)
    password = handleReplaceSpecialChar(password)
    //判断密码是否符合规则
    if(password.indexOf(commonEnum.itemUrl) <0 || username.indexOf("vueCms_xg")<0){
      return this.msgService.fail("账号密码不符合规则",HttpStatus.UNAUTHORIZED)
    }
    let filterData = handleFilterObjectEmptyData(user);
    const num = await this.userEntity.createQueryBuilder().where({username}).getCount()
    if(num>0){
      return this.msgService.fail("用户名重复", 404);
    }
    let originalPwd = JSON.parse(JSON.stringify(password))
    password = securityMd5(password)
    let roleData = await this.roleEntity.createQueryBuilder().where({roleName:"试用角色"}).getOne()
    try {
      await this.userEntity.createQueryBuilder().insert().values({...filterData,originalPwd,password,userType:userTypeEnum.testType,roleId:roleData.id}).execute();
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }
    let userData = await this.userDetailByUsernameAndPwd(username,originalPwd)
    let {id} = userData
    //获取token
    let ip  = handleDealIpv6ToIpv4(user.ip)
    let token = this.authService.createToken({id,username,ip,expireTime:"1h"})
    await this.updateUserInfoStatus(id,token,ip,operationSystem,browser)
    return {
      id,username,token
    }
  }

  //gitee重定向路径
  async giteeToRedirect(uid?:string|number) {
    let redis = new RedisInstance("giteeLogin",redisEnum.giteeLogin)
    await redis.set("giteeLogin"+uid,uid)
    let key = sysConfigEnum.giteeLoginConfig
    let data = await this.sysConfigService.handleGetSysData(key)
    if(!data.cid || !data.secret || !data.redirectUrl){
      return false;
    }
    let cid = data.cid;
    let redirectUrl = data.redirectUrl;//回调路劲获取code
    return giteeOauthConfig.authorizeUrl+`?client_id=${cid}&redirect_uri=${redirectUrl}&response_type=code`;
  }
  //获取gitee用户登录信息
  async getGiteeLoginInfo(giteeLoginDto:GiteeLoginDto,clientIp:string) {
    let redis = new RedisInstance("giteeLogin",redisEnum.giteeLogin)
    let {code,uid,operationSystem,browser,token} = giteeLoginDto
    //判断是否为试用用户
    if(token){
      await this.handleIsTrialRole(token+"");
    }
    let accessToken = await this.handleGetGiteeAccessToken(code)
    if(!accessToken.data){
      return this.msgService.fail("code过期，请重新登录")
    }
    let giteeInfo:any = await this.getGiteeInfoByAccessToken(accessToken.data);
    if(!giteeInfo.data){
      return this.msgService.fail("获取gitee账号信息失败")
    }
    let { id, name, avatar_url, email } = giteeInfo.data;
    let giteeId = sysConfigEnum.giteeLoginConfig + JSON.parse(JSON.stringify(id));
    let username;
    //绑定操作
    uid = await redis.get("giteeLogin"+uid);
    let isBind = false;
    if(uid){
      await this.userEntity.createQueryBuilder().delete().where("giteeId = :giteeId", { giteeId }).execute();
      await this.userEntity.createQueryBuilder().where("id = :id", { id:uid }).update().set({giteeId,giteeNickname:name}).execute();
      let userData = await this.userEntity.createQueryBuilder().where({id:uid}).getOne()
      username = userData.username
      isBind=true;
      await this.handleClearUserInfoInTheRedis(token)
    }else{
      isBind=false;
      //判断gitee是否有关联账号。如果有就登陆，没有就新创建一个账号
      let userNum = await this.userEntity.createQueryBuilder().where({ giteeId:giteeId }).getCount()
      //没有账号，注册帐号
      if(userNum<=0){
        let roleData = await this.roleEntity.createQueryBuilder().where({roleName:"试用角色"}).getOne()
        username = handleGetCode(8);
        username = await this.handleGetUsername(username);
        let originalPwd = handleGetCode(8);
        let password = JSON.parse(JSON.stringify(originalPwd))
        password = securityMd5(password)
        let userData;
        try {
          userData = await this.userEntity.createQueryBuilder().insert().values({username,originalPwd,password,giteeId:giteeId,roleId:roleData.id,giteeNickname:name}).execute();
        }catch (error) {
          throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
        }
        id = userData.identifiers[0]["id"]
      }else{
        let userData = await this.userEntity.createQueryBuilder().where({giteeId:giteeId}).getOne()
        username = userData.username
        id = userData.id;
      }
      let ip  = handleDealIpv6ToIpv4(clientIp)
      token = this.authService.createToken({id,username,ip})
      await this.updateUserInfoStatus(id,token,ip,operationSystem,browser)
    }
    return {
      id,username,token,isBind
    }
  }
  //随机生成账号
  async handleGetUsername (username){
    const num = await this.userEntity.createQueryBuilder().where({username}).getCount()
    if(num>0){
      username = handleGetCode(8);
      return this.handleGetUsername(username)
    }
    return username;
  }

  //获取gitee的accessToken
  async handleGetGiteeAccessToken(code:string):Promise<resInterface>{
    let key = sysConfigEnum.giteeLoginConfig
    let data = await this.sysConfigService.handleGetSysData(key)
    if(!data.cid || !data.secret || !data.redirectUrl){
      return {data:false,msg:""};
    }
    let cid = data.cid;
    let redirectUrl = data.redirectUrl;//回调路劲获取code
    let secret = data.secret;//回调路劲获取code
    let authData = await axios.post(giteeOauthConfig.getAccessTokenUrl,{
      code,
      client_id: cid,
      redirect_uri: redirectUrl,
      client_secret: secret,
    }).then(res=>{
      return res.data;
    }).catch(err=>{
      return err.data
    })
    if(authData?.error){
      return this.msgService.commonRes(false,authData?.error?.error_description);
    }else{
      return this.msgService.commonRes(authData?.access_token,"");
    }
  }
  //通过access_token获取gitee信息
  async getGiteeInfoByAccessToken(accessToken: boolean | string){
    let authData = await axios.get(giteeOauthConfig.giteeUserAPI+`?access_token=${accessToken}`).then(res=>{
      return res.data;
    }).catch(err=>{
      return err.data
    })
    if(authData?.error){
      return this.msgService.commonRes(false,authData?.error?.error_description);
    }else{
      return this.msgService.commonRes(authData,"");
    }
  }

  //判断系统配置是否配置
  async isExistSysConfig (type:string) {
    if(type=='gitee'){
      let key = sysConfigEnum.giteeLoginConfig
      let sysConfigData = await this.sysConfigService.handleGetSysData(key)
      if(!sysConfigData.cid || !sysConfigData.secret || !sysConfigData.redirectUrl){
        return this.msgService.fail("配置信息为空,请联系管理员");
      }
    }else if(type == 'qq'){
      let key = sysConfigEnum.qqLoginConfig
      let sysConfigData = await this.sysConfigService.handleGetSysData(key)
      if(!sysConfigData.appId || !sysConfigData.appKey || !sysConfigData.redirectUrl){
        return this.msgService.fail("配置信息为空,请联系管理员");
      }
    }
    return this.msgService.success();
  }
  //解绑gitee
  async unbindGitee(uid:string|number,token:string){
    await this.handleClearUserInfoInTheRedis(token)
    try {
      await this.userEntity.createQueryBuilder().where("id = :id", { id:uid }).update().set({giteeId:"",giteeNickname:""}).execute();
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }
    return this.msgService.success();
  }
  //解绑qq
  async unbindQQ(uid:string|number,token:string){
    await this.handleClearUserInfoInTheRedis(token)
    try {
      await this.userEntity.createQueryBuilder().where("id = :id", { id:uid }).update().set({qqId:"",qqNickname:""}).execute();
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }
    return this.msgService.success();
  }

  //qq重定向路径
  async qqToRedirect(uid?:string|number) {
    let redis = new RedisInstance("qqLogin",redisEnum.qqLogin)
    await redis.set("qqLogin"+uid,uid)
    let key = sysConfigEnum.qqLoginConfig
    let data = await this.sysConfigService.handleGetSysData(key)
    if(!data.appId || !data.appKey || !data.redirectUrl){
      return false;
    }
    let appId = data.appId;
    let redirectUrl = data.redirectUrl;//回调路劲
    const state = Date.now()
    let scope = "get_user_info,list_album"
    return qqOauthConfig.authorizeUrl+`&client_id=${appId}&redirect_uri=${redirectUrl}&state=${state}&scope=${scope}`;
  }

  //获取qq用户登录信息
  async getQQLoginInfo(qqLoginDto:QqLoginDto,clientIp:string) {
    let redis = new RedisInstance("qqLogin",redisEnum.qqLogin)
    let {code,uid,operationSystem,browser,token} = qqLoginDto
    //判断是否为试用用户
    if(token){
      await this.handleIsTrialRole(token+"");
    }
    let accessToken:any = await this.handleGetQQAccessToken(code)
    if(!accessToken.data){
      return this.msgService.fail("code过期，请重新登录")
    }
    let giteeInfo:any = await this.getQQInfoByAccessToken(accessToken.data.accessToken,accessToken.data.appId);
    if(!giteeInfo.data){
      return this.msgService.fail("获取qq账号信息失败")
    }
    let { nickname } = giteeInfo.data.userData;
    let qqId = sysConfigEnum.qqLoginConfig + JSON.parse(JSON.stringify(giteeInfo.data.unionid));
    let username;
    let clientId = 0;
    //绑定操作
    uid = await redis.get("qqLogin"+uid);
    let isBind = false;
    if(uid){
      await this.userEntity.createQueryBuilder().delete().where("qqId = :qqId", { qqId }).execute();
      await this.userEntity.createQueryBuilder().where("id = :id", { id:uid }).update().set({qqId,qqNickname:nickname}).execute();
      let userData = await this.userEntity.createQueryBuilder().where({id:uid}).getOne()
      username = userData.username
      clientId = userData.id;
      isBind=true;
      await redis.del("qqLogin"+uid);
    }else{
      isBind=false;
      //判断qq是否有关联账号。如果有就登陆，没有就新创建一个账号
      let userNum = await this.userEntity.createQueryBuilder().where({ qqId:qqId }).getCount()
      //没有账号，注册帐号
      if(userNum<=0){
        let roleData = await this.roleEntity.createQueryBuilder().where({roleName:"试用角色"}).getOne()
        username = handleGetCode(8);
        username = await this.handleGetUsername(username);
        let originalPwd = handleGetCode(8);
        let password = JSON.parse(JSON.stringify(originalPwd))
        password = securityMd5(password)
        let userData;
        try {
          userData = await this.userEntity.createQueryBuilder().insert().values({username,originalPwd,password,qqId:qqId,roleId:roleData.id,qqNickname:nickname}).execute();
        }catch (error) {
          throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
        }
        clientId = userData.identifiers[0]["id"]
      }else{
        let userData = await this.userEntity.createQueryBuilder().where({qqId:qqId}).getOne()
        username = userData.username
        clientId = userData.id;
      }
      let ip  = handleDealIpv6ToIpv4(clientIp)
      token = this.authService.createToken({id:clientId,username,ip})
      await this.updateUserInfoStatus(clientId,token,ip,operationSystem,browser)
    }
    return {
      id:clientId,username,token,isBind
    }
  }
  //获取gitee的accessToken
  async handleGetQQAccessToken(code:string):Promise<resInterface>{
    let key = sysConfigEnum.qqLoginConfig
    let data = await this.sysConfigService.handleGetSysData(key)
    if(!data.appId || !data.appKey || !data.redirectUrl){
      return {data:false,msg:""};
    }
    let appId = data.appId;
    let appKey = data.appKey;
    let redirectUrl = data.redirectUrl;//回调路劲获取code
    let authData = await axios.get(qqOauthConfig.getAccessTokenUrl+`&code=${code}&client_id=${appId}&client_secret=${appKey}&redirect_uri=${redirectUrl}`).then(res=>{
      let resArr = res.data.split("&")
      let accessToken = resArr[0].split("=")[1]
      let expiresIn = resArr[1].split("=")[1]
      let refreshToken = resArr[2].split("=")[1]
      return {accessToken,expiresIn,refreshToken};
    }).catch(err=>{
      return err.data
    })
    if(authData?.error){
      return this.msgService.commonRes(false,authData?.error?.error_description);
    }else{
      return this.msgService.commonRes({accessToken:authData?.accessToken,appId},"");
    }
  }
  //通过access_token获取gitee信息
  async getQQInfoByAccessToken(accessToken: boolean | string,appId:string){
    let authData = await axios.get(qqOauthConfig.openId+`?access_token=${accessToken}&unionid=1`).then(res=>{
      let data = JSON.parse(res.data.substring(9, res.data.length-3))
      let clientId = data.client_id;
      let openid = data.openid;
      let unionid = data.unionid;
      return {clientId,openid,unionid};
    }).catch(err=>{
      return err.data
    })
    if(authData?.error){
      return this.msgService.commonRes(false,authData?.error?.error_description);
    }
    let userData = await axios.get(qqOauthConfig.qqUserAPI+`?access_token=${accessToken}&oauth_consumer_key=${appId}&openid=${authData.openid}`).then(res=>{
      return res.data;
    }).catch(err=>{
      return err.data
    })
    if(userData?.error){
      return this.msgService.commonRes(false,authData?.error?.error_description);
    }else{
      return this.msgService.commonRes({userData,openid:authData.openid,unionid:authData.unionid},"");
    }
  }

  /**
   * 是否为试用角色
   * @param token
   */
  async handleIsTrialRole(token:string){
    let tokenData = await this.authService.verifyToken(token)
    let {id} = tokenData
    let isTrialRole = false;
    let user = await getConnection().createQueryBuilder().select(["roleId"]).from(UserEntity, 'user').where({ id }).getRawOne()
    if(user.roleId){
      let roleId = user.roleId;
      let roleData = await getConnection().createQueryBuilder().select(["roleName"]).from(RoleEntity, 'role').where({ id:roleId }).getRawOne()
      if(roleData.roleName == "试用角色"){
        isTrialRole = true;
      }else{
        isTrialRole = false;
      }
    }else{
      isTrialRole = true;
    }
    //拦截试用用户操作
    if(isTrialRole){
      throw new UnauthorizedException('试用账号，暂无开放该功能。请联系开发者。');
    }
    return true
  }
}
