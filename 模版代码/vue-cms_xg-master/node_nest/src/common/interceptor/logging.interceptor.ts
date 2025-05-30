import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import * as requestIp from 'request-ip';
import {
  handleDealIpv6ToIpv4,
  handleFilterObjectEmptyData,
  handleGetUrlParams,
  handleRecordLogs,
  securityMd5,
} from '@/utils/utils';
import { LoginLogAddDto, OperationLogAddDto } from '@/modules/log/dto';
import { getConnection } from 'typeorm';
import { OperationLogEntity } from '@/modules/log/entities/operationLog.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { LoginLogEntity } from '@/modules/log/entities/loginLog.entity';
import { loginStatusEnum, operationTypeEnum, userTypeEnum } from '@/common/enum';
import { RoleEntity } from '@/modules/role/entities/role.entity';
import { Reflector } from '@nestjs/core';
import { isPublicKey } from '@/common/decorator/noAuth.decorator';

type logType = "loginLog" | "operationLog"
type operationType = operationTypeEnum.add | operationTypeEnum.edit | operationTypeEnum.search | operationTypeEnum.delete | operationTypeEnum.other | operationTypeEnum.otherLogin
interface dataInterface {
  data:any                    //日志具体操作内容
  logType:logType             //日志类型
  operationId?:number|string  //操作id
  operationType?:operationType//操作类型
}
//日志拦截器 记录操作日志
@Injectable()//依赖注入
export class LoggingInterceptor<T> implements NestInterceptor {
  private readonly data:dataInterface
  private operationId:any
  constructor(data: dataInterface) {
    this.data = data;
  }

  async intercept(context: ExecutionContext, next: CallHandler<T>): Promise<any> {
    console.log('LoggingInterceptor-Before...');
    const request = context.switchToHttp().getRequest();
    const isAuth = (new Reflector()).getAllAndOverride<boolean>(isPublicKey,[
      context.getHandler(),
      context.getClass()
    ])
    this.operationId = await this.handleToData(this.data,request,true,isAuth)
    const now = Date.now();
    return next.handle().pipe(
      map(async (val) => {
        console.log(`LoggingInterceptor-After... ${Date.now() - now}ms`)
        if(this.data.logType=="operationLog"){
          await this.handleToData({data:JSON.stringify(val),logType:"operationLog",operationId:this.operationId},request,false,isAuth)
        }
        return await new Promise((resolve, reject)=>{
          resolve(val)
        })
      }),
    );
  }

  /**
   *
   * @param data
   * @param req
   * @param isAdd 操作具体类型  true 添加 false 编辑更新
   */
  async handleToData (data:dataInterface,req,isAdd?:boolean,isAuth?:boolean):Promise<any> {

    let operationContent = data.data
    let logType = data.logType
    let operationType = data.operationType

    let clientIp = requestIp.getClientIp(req)
    clientIp = handleDealIpv6ToIpv4(clientIp)
    if(logType == "loginLog"){
      let { username,userType,password,operationSystem,browser,isPcOrIphone } = req.body
      //在白名单加入访问记录
      handleRecordLogs(1,{url:req.url,clientIp})
      //插入操作访问数据库中
      let userData = await this.userDetailByUsernameAndPwd(username,password)
      if(!userData?.id && userType==userTypeEnum.formalType){
        await this.loginLogAdd({username,password,uid:-1,ip:clientIp,operationSystem,browser,isPcOrIphone,status:loginStatusEnum.fail});
        throw new HttpException("账号密码错误",HttpStatus.SERVICE_UNAVAILABLE)
      }else{
        //插入操作日志数据库中
        await this.loginLogAdd({username,password,uid:userData?.id,ip:clientIp,operationSystem,browser,isPcOrIphone,status:loginStatusEnum.success});
      }
      return true;
    }else if(logType == "operationLog"){
      if(isAdd){
        let operationSystem,browser="";
        let isPcOrIphone=0;
        let uid=0;
        if(req.method.toLowerCase()=="get"){
          operationSystem =handleGetUrlParams(req.url, "operationSystem")
          browser =handleGetUrlParams(req.url, "browser")
          isPcOrIphone =parseInt(handleGetUrlParams(req.url, "isPcOrIphone"))
          isPcOrIphone = isNaN(isPcOrIphone)?0:isPcOrIphone
          uid =parseInt(handleGetUrlParams(req.url, "uid"))
        }else{
          operationSystem =req.body.operationSystem
          browser =req.body.browser
          isPcOrIphone =req.body.isPcOrIphone
          uid =req.body.uid
        }
        //无差别加入操作记录
        handleRecordLogs(2,{detail:"请求url:"+req.url+" 请求ip:"+clientIp+" 操作类型:"+operationType+" 详细操作:"+operationContent,status:"success"})
        if (uid > 0) {
          //判断是否为试用角色，并做操作判断
          await this.handleIsTrialRole(uid)

          let requestMethod = req.method
          let requestParams = ""
          if(requestMethod.toLowerCase()=="post"){
            requestParams = req.body
          }else{
            requestParams = req.query
          }
          let requestUrl = req.originalUrl
          let addContent:OperationLogAddDto = {
            respondParams: "",
            requestParams:requestParams?JSON.stringify(requestParams):"",
            operationContent,
            operationType,
            requestMethod,
            requestUrl,
            requestIp:clientIp,
            uid,
            operationSystem,
            browser,
            isPcOrIphone,
          }
          //插入操作日志数据库中
          let operationId = await this.operationLogAdd(addContent);
          return operationId;
        }else if(isAuth){
          return -1;
        }else{
          throw new UnauthorizedException('请先登录,无法添加操作记录');
        }
      }else{
        let operationId = data.operationId
        //更新操作日志响应数据
        await this.operationLogUpdateResponse(data.data,operationId);
        return true;
      }
    }
  }
  //是否为试用角色
  async handleIsTrialRole(uid:number|string){
    let isTrialRole = false;
    let user = await getConnection().createQueryBuilder().select(["roleId"]).from(UserEntity, 'user').where({ id:uid }).getRawOne()
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
    if(isTrialRole && (this.data.operationType==operationTypeEnum.add || this.data.operationType==operationTypeEnum.delete || this.data.operationType==operationTypeEnum.edit)){
      throw new UnauthorizedException('试用账号，暂无开放该功能。请联系开发者。');
    }
    return true
  }
  /**
   * 操作添加
   * @param operationLogAddDto
   */
  async operationLogAdd (operationLogAddDto:OperationLogAddDto) {
    let filterData = handleFilterObjectEmptyData(operationLogAddDto);
    let operationData;
    try {
      operationData = await getConnection().createQueryBuilder().from(OperationLogEntity, 'operationLog').insert().values({...filterData}).execute()
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }
    return operationData?.identifiers[0]["id"];
  }
  /**
   * 更新操作日志响应数据
   * @param respondParams
   * @param id
   */
  async operationLogUpdateResponse (respondParams:any,id:number|string) {
    try {
      await getConnection().createQueryBuilder().from(OperationLogEntity, 'operationLog').where("id = :id",{id}).update().set({respondParams,status:loginStatusEnum.success}).execute()
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }
    return true;
  }
  /**
   * 通过用户id查找用户详情
   */
  async userDetailByUsernameAndPwd (username:string,password:string):Promise<UserEntity | undefined> {
    let originalPwd = password
    password = securityMd5(password)
    return await getConnection().createQueryBuilder().from(UserEntity, 'user').where({
      username,
      password,
      originalPwd
    }).getRawOne()
  }

  /**
   * 登陆成功或者失败记录
   * @param loginLogAdd
   */
  async loginLogAdd (loginLogAdd: LoginLogAddDto) {
    let filterData = handleFilterObjectEmptyData(loginLogAdd);
    try {
      await getConnection().createQueryBuilder().from(LoginLogEntity, 'loginLog').insert().values({...filterData}).execute()
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }
    return true;
  }
}
