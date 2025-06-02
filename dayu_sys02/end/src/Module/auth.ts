import {Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {APP_GUARD} from "@nestjs/core";
// 自定义
import {auth} from '../Controller/auth';
import {const_jwt} from "../util/const_jwt";
import {AuthGuard} from "../util/AuthGuard";


@Module({
    imports: [
        JwtModule.register({global: true, secret: const_jwt.secret, signOptions: const_jwt.signOptions}),//jwt//私钥//24小时*30天
    ],
    controllers: [
        auth,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        }
    ],
})
export class __auth {
}

