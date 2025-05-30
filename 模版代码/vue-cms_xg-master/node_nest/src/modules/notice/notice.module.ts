import { Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {NoticeEntity} from "./entities/notice.entity";
import { NotifyEntity } from '@/modules/notify/entities/notify.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([NoticeEntity,NotifyEntity,UserEntity])],
  controllers: [NoticeController],
  providers: [NoticeService]
})
export class NoticeModule {}
