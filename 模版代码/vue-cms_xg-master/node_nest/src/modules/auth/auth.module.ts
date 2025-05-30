import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtKey } from '@/utils/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      //生成token的key
      secret:jwtKey.secret,
      // signOption可以在JwtModule设定
      // 或是在createToken时候设定
      signOptions: {
        //token的有效时长
        expiresIn: jwtKey.expireTime,
      },
    }),forwardRef(()=>UserModule)
  ],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
