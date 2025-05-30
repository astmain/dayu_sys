import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MsgService} from "@/modules/common/msg/msg.service";
import {
  ErrorLogAddDto,
  ErrorLogListDto,
  LoginLogByUidDto,
  LoginLogListDto,
  OperationLogAddDto,
  OperationLogByUidDto,
  OperationLogListDto
} from "./dto";
import {LoginLogEntity} from "./entities/loginLog.entity";
import {OperationLogEntity} from "./entities/operationLog.entity";
import {handleFilterObjectEmptyData, handleParseTime} from '@/utils/utils';
import { UserEntity } from '@/modules/user/entities/user.entity';
import {ErrorLogEntity} from "@/modules/log/entities/errorLog.entity";

@Injectable()
export class LogService {
  constructor(
    //依赖注入
    @InjectRepository(LoginLogEntity) private readonly logEntity:Repository<LoginLogEntity>,
    @InjectRepository(OperationLogEntity) private readonly operationLogEntity:Repository<OperationLogEntity>,
    @InjectRepository(UserEntity) private readonly userEntity:Repository<UserEntity>,
    @InjectRepository(ErrorLogEntity) private readonly errorEntity:Repository<ErrorLogEntity>,
    private readonly msgService:MsgService
  ) {}

  /**
   * 访问日志
   * @param loginLogDto
   */
  async loginLog(loginLogDto:LoginLogListDto) {
    let {createTime,pageSize,currentPage} = loginLogDto
    let filterData:any = handleFilterObjectEmptyData(loginLogDto);
    delete filterData.uid
    delete filterData.isPcOrIphone
    delete filterData.browser
    delete filterData.operationSystem
    let logWhere:any = ""
    let logParams:any = {}
    if(createTime?.length > 0){
      let startTime = handleParseTime(new Date(createTime[0]+" 00:00:00").getTime())
      let endTime = handleParseTime(new Date(createTime[1]+" 23:59:59").getTime())
      logWhere = "addTime BETWEEN :startTime AND :endTime"
      logParams = { startTime,endTime }
    }
    let startNum = pageSize*(currentPage-1)
    let loginLogTotal;
    try {
      loginLogTotal = await this.logEntity.createQueryBuilder().where(logWhere, logParams).getCount()
    }catch (error) {
      return this.msgService.fail(error);
    }
    let user = await this.userEntity.createQueryBuilder().select(["id", "username"]).getRawMany()
    let loginLog;
    try {
      loginLog = await this.logEntity.createQueryBuilder().select(["addTime","browser","id","ip","isPcOrIphone","operationSystem","roleId","status","uid","updateTime","username"]).where({...filterData}).skip(startNum).take(pageSize).orderBy("addTime","DESC").getRawMany()
      for(let i in loginLog){
        for(let q in user){
          if(loginLog[i]["uid"]==user[q]["id"]){
            loginLog[i]["username"] = user[q]["nickName"]??user[q]["username"];
            break;
          }
        }
      }
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success({total:loginLogTotal,data:loginLog});
  }

  /**
   * 通过用户id获取访问日志
   * @param loginLogByUidDto
   */
  async loginLogListByUid(loginLogByUidDto:LoginLogByUidDto) {
    let {uid,pageSize,currentPage} = loginLogByUidDto
    let startNum = pageSize*(currentPage-1)
    let loginLogTotal;
    try {
      loginLogTotal = await this.logEntity.createQueryBuilder().where({uid}).getCount()
    }catch (error) {
      return this.msgService.fail(error);
    }
    let user = await this.userEntity.createQueryBuilder().select(["id", "username"]).getRawMany()
    let loginLog;
    try {
      loginLog = await this.logEntity.createQueryBuilder().select(["addTime","browser","id","ip","isPcOrIphone","operationSystem","roleId","status","uid","updateTime","username"]).where({uid}).skip(startNum).take(pageSize).orderBy("addTime","DESC").getRawMany()
      for(let i in loginLog){
        for(let q in user){
          if(loginLog[i]["uid"]==user[q]["id"]){
            loginLog[i]["username"] = user[q]["nickName"]??user[q]["username"];
            break;
          }
        }
      }
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success({total:loginLogTotal,data:loginLog});
  }

  /**
   * 删除
   */
  async cleanLoginLog() {
    try {
      await this.logEntity.createQueryBuilder().delete().where("id > 0").execute()
    }catch (error){
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }

  /**
   * 操作日志
   * @param operationLogByUidDto
   */
  async operationLog(operationLogByUidDto:OperationLogListDto) {
    let {operName,createTime,pageSize,currentPage} = operationLogByUidDto
    let operationWhere:any = ""
    if(createTime?.length > 0){
      let startTime = handleParseTime(new Date(createTime[0]+" 00:00:00").getTime())
      let endTime = handleParseTime(new Date(createTime[1]+" 23:59:59").getTime())
      operationWhere = `AND operationLog.addTime BETWEEN ${startTime} AND ${endTime}`
    }
    let startNum = pageSize*(currentPage-1)
    let operationTotal;
    try {
      operationTotal = await this.operationLogEntity.createQueryBuilder("operationLog").where(operationWhere).getCount()
    }catch (error) {
      return this.msgService.fail(error);
    }
    let user = await this.userEntity.createQueryBuilder().select(["id","username","nickName"]).getRawMany()

    let operationList;
    try {
      if(operName){
        operationList = await this.operationLogEntity.createQueryBuilder("operationLog").leftJoin(UserEntity,"user","user.id = operationLog.uid")
            .where(`user.nickName = '${operName}' ${operationWhere}`).skip(startNum).take(pageSize).orderBy("operationLog.addTime","DESC").getMany()
      }else{
        operationList = await this.operationLogEntity.createQueryBuilder("operationLog").where(operationWhere).skip(startNum).take(pageSize).orderBy("operationLog.addTime","DESC").getMany()
      }
      for(let i in operationList){
        for(let q in user){
          if(operationList[i]["uid"]==user[q]["id"]){
            operationList[i]["operName"] = user[q]["nickName"]??user[q]["username"];
            break;
          }
        }
      }
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success({total:operationTotal,data:operationList});
  }

  /**
   * 通过用户id获取操作日志
   * @param operationLogByUidDto
   */
  async operationLogByUid(operationLogByUidDto:OperationLogByUidDto) {
    let {uid,pageSize,currentPage} = operationLogByUidDto
    let startNum = pageSize*(currentPage-1)
    let operationTotal;
    try {
      operationTotal = await this.operationLogEntity.createQueryBuilder().where({uid}).getCount()
    }catch (error) {
      return this.msgService.fail(error);
    }
    let user = await this.userEntity.createQueryBuilder().select(["id","username"]).getRawMany()
    let operationList;
    try {
      operationList = await this.operationLogEntity.createQueryBuilder().where({uid}).skip(startNum).take(pageSize).orderBy("addTime","DESC").getMany()
      for(let i in operationList){
        for(let q in user){
          if(operationList[i]["uid"]==user[q]["id"]){
            operationList[i]["operName"] = user[q]["nickName"]??user[q]["username"];
            break;
          }
        }
      }
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success({total:operationTotal,data:operationList});
  }

  /**
   * 操作添加
   * @param operationLogAddDto
   */
  async operationLogAdd(operationLogAddDto: OperationLogAddDto) {
    let filterData = handleFilterObjectEmptyData(operationLogAddDto);
    try {
      await this.operationLogEntity.createQueryBuilder().insert().values({...filterData}).execute()
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }
    return true;
  }

  /**
   * 删除
   * @param id
   */
  async operationLogDel(id: string) {
    let ids = id.split(",")
    try {
      await this.operationLogEntity.createQueryBuilder().delete().where("id in (:id)",{id:[...ids]}).execute()
    }catch (error){
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }
  /**
   * 清空操作日志
   */
  async cleanOperationLog() {
    try {
      await this.operationLogEntity.createQueryBuilder().delete().where("id > 0").execute()
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }
    return true;
  }

  /**
   * 错误日志
   * @param errorLogListDto
   */
  async errorLog(errorLogListDto:ErrorLogListDto) {
    let {operName,createTime,pageSize,currentPage} = errorLogListDto
    let errorWhere:any = ""
    if(createTime?.length > 0){
      let startTime = handleParseTime(new Date(createTime[0]+" 00:00:00").getTime())
      let endTime = handleParseTime(new Date(createTime[1]+" 23:59:59").getTime())
      errorWhere = `AND error.addTime BETWEEN ${startTime} AND ${endTime}`
    }
    let startNum = pageSize*(currentPage-1)
    let errorTotal;
    try {
      errorTotal = await this.errorEntity.createQueryBuilder().where(errorWhere).getCount()
    }catch (error) {
      return this.msgService.fail(error);
    }
    let user = await this.userEntity.createQueryBuilder().select(["id","username","nickName"]).getRawMany()
    let errorList;
    try {
      if(operName){
        errorList = await this.errorEntity.createQueryBuilder("error").leftJoin(UserEntity,"user","user.id = error.uid")
            .where(`user.nickName = '${operName}' ${errorWhere}`).skip(startNum).take(pageSize).orderBy("error.addTime","DESC").getMany()
      }else{
        errorList = await this.errorEntity.createQueryBuilder("error").where(errorWhere).skip(startNum).take(pageSize).orderBy("error.addTime","DESC").getMany()
      }

      for(let i in errorList){
        for(let q in user){
          if(errorList[i]["uid"]==user[q]["id"]){
            errorList[i]["operName"] = user[q]["nickName"]??user[q]["username"];
            break;
          }
        }
      }
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success({total:errorTotal,data:errorList});
  }

  /**
   * 记录报错信息进数据库
   * @param errorLogAddDto
   */
  async errorLogAdd(errorLogAddDto: ErrorLogAddDto) {
    let filterData = handleFilterObjectEmptyData(errorLogAddDto);
    try {
      await this.errorEntity.createQueryBuilder().insert().values({...filterData}).execute()
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }
    return true;
  }
  /**
   * 记录报错信息进数据库
   */
  async cleanErrorLog() {
    try {
      await this.errorEntity.createQueryBuilder().delete().where("id > 0").execute()
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }
    return true;
  }
}
