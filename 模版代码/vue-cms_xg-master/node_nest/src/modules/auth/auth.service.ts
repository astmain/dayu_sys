import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {JwtService} from '@nestjs/jwt';
import {UserService} from '../user/user.service';
import { jwtKey } from "@/utils/config";

@Injectable()
export class AuthService {
  constructor(
      @Inject(forwardRef(() => UserService)) private readonly userService:UserService,
      private readonly jwtService:JwtService
  ) {}
  //生成token
  createToken(user:userInterface){
    const payload = {id:user.id,username: user.username,ip:user.ip};
    return this.jwtService.sign(payload,{
      expiresIn:user.expireTime?user.expireTime:jwtKey.expireTime
    })
  }
  /**
   * @本地身份策略调用方法
   * @调用UserService里面的findUserName方法通过username找到用户
   * @param username
   * @param password
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.userDetailByUserName(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
  /**
   * @token验证方法获取id值
   * @param token
   */
  async verifyToken(token: string): Promise<any> {
    try {
      if (!token) return false;
      const data = this.jwtService.verify(token.replace('VueCms_xg ', ''));
      return data;
    } catch (e) {
      return false;
    }
  }
  /**
   * 通过token获取data
   * @param token
   */
  async handleTokenGetData(token: string): Promise<any> {
    if (!token) return false;
    return this.jwtService.decode(token);
  }

}
