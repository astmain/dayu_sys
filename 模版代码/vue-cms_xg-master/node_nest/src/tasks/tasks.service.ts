import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import {getConnection} from "typeorm";
import {ArtEntity} from "@/modules/art/entities/art.entity";
import {ArtContentFileEntity} from "@/modules/art/entities/artContentFile.entity";
import { handleDealOsTime, handleRemoveSingleFile } from "@/utils/utils";
import {join} from "path";
import {uploadImgConfig} from "@/utils/config";
import { osUtils } from "@/utils/osUtils";
import os from "os";
import { RedisInstance } from '@/common/redis';
import { redisEnum } from "@/common/enum";

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private artContentImgBaseUrl = uploadImgConfig.artContentImgBaseUrl

  @Cron("* * * * * *")
  async handleTest(){

  }

  // @Cron('59 59 23 * * *')//每隔45秒执行一次
  @Cron('59 23 * * * *')//每隔1秒执行一次
  async handleCron() {
    const fs = require('fs');
    let artList = await getConnection().createQueryBuilder().from(ArtEntity, 'g_art_list').where("artContentId != ''").getRawMany()
    let artContentIdArr = []
    for(let i in artList){
      let arr = artList[i]["artContentId"].split(',');
      if(arr.length > 0){
        for(let w in arr){
          artContentIdArr.push(arr[w])
        }
      }
    }
    artContentIdArr = Array.from(new Set(artContentIdArr))
    let artContentFile = await getConnection().createQueryBuilder().from(ArtContentFileEntity, 'g_art_content_file').where("id not in (:id)",{id:[...artContentIdArr]}).getRawMany()
    let pathImgUrl = join(this.artContentImgBaseUrl)
    for(let i in artContentFile){
      if (fs.existsSync(pathImgUrl)) {
        const pathImgUrlArr = fs.readdirSync(pathImgUrl);
        for(let w in pathImgUrlArr){
            if(artContentFile[i]["fileName"] == pathImgUrlArr[w]){
              handleRemoveSingleFile(join(this.artContentImgBaseUrl)+"/"+pathImgUrlArr[w],"文章内容图片")
            }
        }
      }
    }
    console.log("执行成功");
  }

  // @Interval(1000)//每隔10秒执行一次
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }

  // @Timeout(5000)//5秒只执行一次
  // handleTimeout() {
  //   this.logger.debug('Called once after 5 seconds');
  // }
}
