//*- coding = utf-8 -*-
//@Time : 2022-11-16 11:30
//@Author : 沉默小管
//@File : jwtAuth.guard.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {
  ExecutionContext, HttpException, HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import * as requestIp from "request-ip";
import {handleCurTime, handleDealIpv6ToIpv4, handleRecordLogs} from "@/utils/utils";
import {getConnection} from "typeorm";
import {UserEntity} from "@/modules/user/entities/user.entity";
import {RoleEntity} from "@/modules/role/entities/role.entity";
import {SysConfigEntity} from "@/modules/sysConfig/entities/sysConfig.entity";
import { multipleLoginAccountsStatusEnum, permsEnum } from "@/common/enum";
import { Reflector } from '@nestjs/core';
import { isPublicKey } from '@/common/decorator/noAuth.decorator';

/*
1.用户登录是否过期
2.判断是否多地登录
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private curApp;
  constructor(app?:any) {
    super();
    this.curApp = app
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('进入全局守卫，查看ip黑名单，如果在里面，直接跳过链接，联系管理员');

    //reflector解析和检索Metadata装饰器实现的类，方法，属性和参数的数据
    const isAuth = (new Reflector()).getAllAndOverride<boolean>(isPublicKey,[
      context.getHandler(),
      context.getClass()
    ])
    const req = context.switchToHttp().getRequest();

    let clientIp = requestIp.getClientIp(req)
    try {
      // 获取token
      const accessToken = req.get('X-CSRF-TOKEN');
      const authData = req.get('Authorization');
      /**
       * 记录用户登陆
       */
      if(!isAuth && accessToken && authData == "Bearer vuecms.cn"){

        let authService = this.curApp.get(AuthService);
        //无差别加入操作记录
        // handleRecordLogs(2,{detail:"请求url:"+req.url+" 请求ip:"+clientIp,status:"success"})
        let tokenData = await authService.verifyToken(accessToken);
        if (Object.keys(tokenData).length > 0) {
          await this.handleMultipleLoginAccountsStatus(accessToken,clientIp);
          let requestMethod = req.method
          if(requestMethod.toLowerCase()=="post"){
            req.body = {
              ...req.body,
              uid:tokenData.id
            }
          }else{
            req.query = {
              ...req.query,
              uid:tokenData.id
            }
            req.url = req.url+"&uid="+tokenData.id;
          }
          return true;
        }else{
          throw new UnauthorizedException('请重新登录，超过登录有效期');
        }
      }else if(isAuth){
        return true;
      }else{
        throw new UnauthorizedException('请先登录');
      }
    } catch (e) {
      throw new HttpException(e,HttpStatus.SERVICE_UNAVAILABLE)
    }
  }




  /**
   * 判断是否多地登录
   * @private
   */
  async handleMultipleLoginAccountsStatus(token,clientIp){
    clientIp = handleDealIpv6ToIpv4(clientIp)
    handleRecordLogs(2,{detail:clientIp+"clientIpclientIp",status:"success"})
    let tokenData = await this.curApp.get(AuthService).verifyToken(token);
    token = token.indexOf("VueCms_xg ")>=0?token.split("VueCms_xg ")[1]:token;
    let {id,exp,ip} = tokenData
    let curTime = handleCurTime()
    if(exp*1000 <= curTime){
      throw new HttpException('token已过期', HttpStatus.BAD_GATEWAY);
    }
    let uid = id;
    //用户详细信息
    let userData = await getConnection().createQueryBuilder().from(UserEntity, 'user').where("user.id = :id",{id:uid}).getRawOne()
    let roleId = userData?.roleId;
    let roleData = await getConnection().createQueryBuilder().from(RoleEntity, 'role').where("role.id = :id",{id:roleId}).getRawOne()
    //判断是否多地登陆
    if(roleData?.perms!=permsEnum.adminPerms && roleData?.perms!=permsEnum.testPerms ){
      let sysConfigData = await getConnection().createQueryBuilder().from(SysConfigEntity, 'sysConfig').select(["value"]).where("sysConfig.key = :key",{key:"BASE_SETTING"}).getRawOne()
      let multipleLoginAccountsStatus = JSON.parse(sysConfigData["value"])?.multipleLoginAccountsStatus;

      if((userData.token!= token || clientIp!=ip) && multipleLoginAccountsStatus==multipleLoginAccountsStatusEnum.open){
        throw new HttpException('不能多地登陆', HttpStatus.BAD_REQUEST);
      }
    }
    return tokenData;
  }
}

