/*- coding = utf-8 -*-
@Time : 2023/5/13 16:44
@Author : 管茂良
@File : rateLimit.guard.ts
@web  : www.php-china.com
@Software: WebStorm
*/

import { ExecutionContext, HttpException, HttpStatus } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";
import * as requestIp from 'request-ip';
import { getConnection } from 'typeorm';
import { IpBlackListEntity } from '@/modules/ipBlackList/entities/ipBlackList.entity';
import { RedisInstance } from '@/common/redis';
import {handleDealIpv6ToIpv4} from "@/utils/utils";
import { redisEnum } from "@/common/enum";

export class RateLimitGuard extends ThrottlerGuard{
  async canActivate(context: ExecutionContext) {
    let redis = new RedisInstance("rateLimitGuard",redisEnum.rateLimitGuard)
    const request = context.switchToHttp().getRequest();
    let clientIp = requestIp.getClientIp(request)
    clientIp = handleDealIpv6ToIpv4(clientIp)

    let attempts = await redis.get("client:" + clientIp)??0
    let ipCount = await getConnection().createQueryBuilder().from(IpBlackListEntity, 'ipBlackList').where("ipBlackList.ip = :ip",{ip:clientIp}).getCount()
    if(ipCount>0 && attempts>1){
      throw new HttpException("ip被封，请联系管理员",HttpStatus.NOT_FOUND);
    }else{
      const limit = this.options.limit;
      const ttl = this.options.ttl;
      try {
        if (typeof limit === "number") {
          if (typeof ttl === "number") {
            await this.handleRequest(context, limit, ttl)
          }
        }
      }catch (err){
        err.response = "请别请求次数过多，防止被封。如被封，请联系管理员"
        err.message = "请别请求次数过多，防止被封。如被封，请联系管理员"
        //大于2次，封禁ip
        if(attempts>=1){
            //添加ip进黑名单
          await getConnection().createQueryBuilder().from(IpBlackListEntity, 'IpBlackList').insert().values({ip:clientIp}).execute()
          throw new HttpException(err,HttpStatus.TOO_MANY_REQUESTS);
        }else{
          await redis.set("client:" + clientIp, attempts=attempts+1,3600*24*7*1000)
          throw new HttpException(err,HttpStatus.TOO_MANY_REQUESTS);
        }
      }
      return true;
    }
  }
}
