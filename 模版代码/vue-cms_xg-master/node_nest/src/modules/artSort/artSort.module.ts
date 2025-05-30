import { Module } from '@nestjs/common';
import { ArtSortService } from './artSort.service';
import { ArtSortController } from './artSort.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArtSortEntity} from "./entities/artSort.entity";

@Module({
  imports:[TypeOrmModule.forFeature([ArtSortEntity])],
  controllers: [ArtSortController],
  providers: [ArtSortService]
})
export class ArtSortModule {}
