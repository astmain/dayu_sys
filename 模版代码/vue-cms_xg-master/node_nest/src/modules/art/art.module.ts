import { Module } from '@nestjs/common';
import { ArtService } from './art.service';
import { ArtController } from './art.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArtEntity} from "./entities/art.entity";
import {ImgEntity} from "@/modules/img/entities/img.entity";
import {ArtSortEntity} from "@/modules/artSort/entities/artSort.entity";
import {ArtColumnEntity} from "@/modules/artColumn/entities/artColumn.entity";
import {MulterModule} from "@nestjs/platform-express";
import {extname, join} from "path";
import { diskStorage } from 'multer';
import {uploadImgConfig} from "@/utils/config";
import { ArtContentFileEntity } from '@/modules/art/entities/artContentFile.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ArtEntity,ArtSortEntity,ArtColumnEntity,ImgEntity,ArtContentFileEntity])
    , MulterModule.register({
      // 用于配置上传，这部分也可以写在路由上
      storage: diskStorage({
        destination:  join(__dirname,"../../../",uploadImgConfig.artContentImgBaseUrl),
        filename: (_, file, callback) => {
          const fileName = `${
              "artContentImg"+new Date().getTime()+ extname(file.originalname)
          }`;
          return callback(null, fileName);
        },
      }),
    })],
  controllers: [ArtController],
  providers: [ArtService]
})
export class ArtModule {}
