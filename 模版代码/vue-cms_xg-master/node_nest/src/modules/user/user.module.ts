import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import {UserController} from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import {MiddlewareCustom} from "@/common/middleware/index"
import { AuthModule } from '../auth/auth.module';
import {RoleEntity} from "@/modules/role/entities/role.entity";
import {SysConfigEntity} from "@/modules/sysConfig/entities/sysConfig.entity";
import {ImgEntity} from "@/modules/img/entities/img.entity";
import { MenuEntity } from '@/modules/menu/entities/menu.entity';
import { IpBlackListEntity } from '@/modules/ipBlackList/entities/ipBlackList.entity';
import { SysConfigService } from '@/modules/sysConfig/sysConfig.service';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,IpBlackListEntity,RoleEntity,SysConfigEntity,ImgEntity,MenuEntity]),forwardRef(()=>AuthModule)],
  controllers:[UserController],
  providers: [UserService,SysConfigService],
  exports:[UserService]
})
export class UserModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    //依赖注入中间件
    consumer.apply(MiddlewareCustom).forRoutes("user")
  }
}
