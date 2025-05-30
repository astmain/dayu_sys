import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TaskSchedulingService } from './taskScheduling.service';
import {TaskSchedulingController} from './taskScheduling.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskSchedulingEntity } from './entities/taskScheduling.entity';
import {MiddlewareCustom} from "@/common/middleware/index"
import { AuthModule } from '../auth/auth.module';
import {RoleEntity} from "@/modules/role/entities/role.entity";
import {SysConfigEntity} from "@/modules/sysConfig/entities/sysConfig.entity";
import {ImgEntity} from "@/modules/img/entities/img.entity";
import { MenuEntity } from '@/modules/menu/entities/menu.entity';
import { IpBlackListEntity } from '@/modules/ipBlackList/entities/ipBlackList.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TaskSchedulingEntity,IpBlackListEntity,RoleEntity,SysConfigEntity,ImgEntity,MenuEntity]),forwardRef(()=>AuthModule)],
  controllers:[TaskSchedulingController],
  providers: [TaskSchedulingService],
  exports:[TaskSchedulingService]
})
export class TaskSchedulingModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    //依赖注入中间件
    consumer.apply(MiddlewareCustom).forRoutes("user")
  }
}
