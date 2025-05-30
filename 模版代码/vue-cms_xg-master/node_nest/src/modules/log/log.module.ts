import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LoginLogEntity} from "./entities/loginLog.entity";
import {OperationLogEntity} from "./entities/operationLog.entity";
import { UserEntity } from '@/modules/user/entities/user.entity';
import {ErrorLogEntity} from "@/modules/log/entities/errorLog.entity";

@Module({
  imports:[TypeOrmModule.forFeature([LoginLogEntity,OperationLogEntity,UserEntity,ErrorLogEntity])],
  controllers: [LogController],
  providers: [LogService]
})
export class LogModule {}
