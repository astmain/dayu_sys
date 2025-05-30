import { Module } from '@nestjs/common';
import { IpBlackListService } from './ipBlackList.service';
import { IpBlackListController } from './ipBlackList.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {IpBlackListEntity} from "./entities/ipBlackList.entity";

@Module({
  imports:[TypeOrmModule.forFeature([IpBlackListEntity])],
  controllers: [IpBlackListController],
  providers: [IpBlackListService]
})
export class IpBlackListModule {}
