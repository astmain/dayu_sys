import { Module } from '@nestjs/common';
import { ArtColumnService } from './artColumn.service';
import { ArtColumnController } from './artColumn.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArtColumnEntity} from "./entities/artColumn.entity";

@Module({
  imports:[TypeOrmModule.forFeature([ArtColumnEntity])],
  controllers: [ArtColumnController],
  providers: [ArtColumnService]
})
export class ArtColumnModule {}
