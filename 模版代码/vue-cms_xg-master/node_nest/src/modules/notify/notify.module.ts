import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {NotifyEntity} from "./entities/notify.entity";
import {EventsModule} from "@/events/events.module";
import {UserEntity} from "@/modules/user/entities/user.entity";

@Module({
  imports:[TypeOrmModule.forFeature([NotifyEntity,UserEntity]),EventsModule],
  // imports:[TypeOrmModule.forFeature([NotifyEntity,TaskSchedulingEntity])],
  controllers: [NotifyController],
  providers: [NotifyService]
})
export class NotifyModule {}
