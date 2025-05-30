//*- coding = utf-8 -*-
//@Time : 2022-11-13 12:00
//@Author : 沉默小管
//@File : auth.strategy.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtKey } from '@/utils/config';

// JWT 的验证策略
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtKey.secret,
    })
  }
  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: any) {
    console.log(payload,"payload");
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    return { userId: payload.id, username: payload.username};
  }
}