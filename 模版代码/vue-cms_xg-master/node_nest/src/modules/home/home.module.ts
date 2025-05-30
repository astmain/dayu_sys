import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HomeService } from './home.service';
import {HomeController} from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import {RoleEntity} from "@/modules/role/entities/role.entity";
import { LoginLogEntity } from '@/modules/log/entities/loginLog.entity';
import { ArtEntity } from '@/modules/art/entities/art.entity';
import { UserEntity } from "@/modules/user/entities/user.entity";
import {ActivePageEntity} from "@/modules/home/entities/activePage.entity";
import {UserSourcesEntity} from "@/modules/home/entities/userSources.entity";

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,RoleEntity,LoginLogEntity,ArtEntity,ActivePageEntity,UserSourcesEntity]),forwardRef(()=>AuthModule)],
  controllers:[HomeController],
  providers: [HomeService],
  exports:[HomeService]
})
export class HomeModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {

  }
}
