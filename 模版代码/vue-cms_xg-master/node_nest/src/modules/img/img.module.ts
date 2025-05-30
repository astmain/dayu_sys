import { Module } from '@nestjs/common';
import { ImgService } from './img.service';
import { ImgController } from './img.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImgEntity } from './entities/img.entity';
import {MulterModule} from "@nestjs/platform-express";
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import {uploadImgConfig} from "@/utils/config";

@Module({
  imports:[TypeOrmModule.forFeature([ImgEntity])
    , MulterModule.register({
      // 用于配置上传，这部分也可以写在路由上
      storage: diskStorage({
        destination:  join(__dirname,"../../../",uploadImgConfig.imgBaseUrl),
        filename: (_, file, callback) => {
          const fileName = `${
              new Date().getTime()+ extname(file.originalname)
          }`;
          return callback(null, fileName);
        },
      }),
    })
  ],
  controllers: [ImgController],
  providers: [ImgService]
})
export class ImgModule {}
