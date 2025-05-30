import { Module } from '@nestjs/common';
import { ImgSortService } from './imgSort.service';
import { ImgSortController } from './imgSort.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ImgSortEntity} from "./entities/imgSort.entity";
import { ImgEntity } from "@/modules/img/entities/img.entity";

@Module({
  imports:[TypeOrmModule.forFeature([ImgSortEntity,ImgEntity])],
  controllers: [ImgSortController],
  providers: [ImgSortService]
})
export class ImgSortModule {}
