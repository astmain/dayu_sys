import { Module } from '@nestjs/common';
import { SysConfigService } from './sysConfig.service';
import { SysConfigController } from './sysConfig.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SysConfigEntity} from "./entities/sysConfig.entity";
import { UserEntity } from '@/modules/user/entities/user.entity';
import { RoleEntity } from '@/modules/role/entities/role.entity';

@Module({
  imports:[TypeOrmModule.forFeature([SysConfigEntity,UserEntity,RoleEntity])],
  controllers: [SysConfigController],
  providers: [SysConfigService]
})
export class SysConfigModule {}
