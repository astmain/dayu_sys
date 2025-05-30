import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ImgSortEntity} from "./entities/imgSort.entity";
import {Repository} from "typeorm";
import {MsgService} from "@/modules/common/msg/msg.service";
import {ImgSortAddDto, ImgSortListDto, ImgSortUpdateDto} from "./dto";
import {handleFilterObjectEmptyData, handleCurTime, handleRemoveSingleFile} from "@/utils/utils";
import { ImgEntity } from "@/modules/img/entities/img.entity";
import {join} from "path";
import {uploadImgConfig} from "@/utils/config";

@Injectable()
export class ImgSortService {
  private imgBaseUrl = uploadImgConfig.imgBaseUrl
  constructor(@InjectRepository(ImgSortEntity) private readonly imgSortEntity:Repository<ImgSortEntity>,
              @InjectRepository(ImgEntity) private readonly imgEntity:Repository<ImgEntity>,
              private readonly msgService:MsgService) {
  }

  /**
   * 图片分类列表
   * @param imgSortListDto
   */
  async imgSortList(imgSortListDto:ImgSortListDto) {
    let {pageSize,currentPage} = imgSortListDto
    let filterData = handleFilterObjectEmptyData(imgSortListDto);
    let startNum = pageSize*(currentPage-1)
    let imgSortTotal;
    try {
      imgSortTotal = await this.imgSortEntity.createQueryBuilder().where({...filterData}).getCount()
    }catch (error) {
      return this.msgService.fail(error);
    }
    let imgSortList;
    try {
      imgSortList = await this.imgSortEntity.createQueryBuilder().where({...filterData}).skip(startNum).take(pageSize).orderBy("sort").getMany()
      if(imgSortList.length>0){
        //计算图片分类下有多少图片数量
        let imgList = await this.imgEntity.createQueryBuilder().getMany()
        for(let i in imgSortList){
          let num = 0;
          for(let q in imgList){
            if(imgSortList[i]["id"] == imgList[q]["imgSortId"]){
              imgSortList[i]["picNum"] = ++num
            }
          }
        }
      }

    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success({total:imgSortTotal,data:imgSortList});
  }

  /**
   * 图片分类添加
   * @param imgSortAddDto
   */
  async imgSortAdd(imgSortAddDto: ImgSortAddDto) {
    let {sortName} = imgSortAddDto
    let filterData = handleFilterObjectEmptyData(imgSortAddDto);

    const num = await this.imgSortEntity.createQueryBuilder().where({sortName}).getCount()
    if(num>0){
      return this.msgService.fail("图片分类名重复", 404);
    }
    try {
      await this.imgSortEntity.createQueryBuilder().insert().values({...filterData}).execute();
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }
    return this.msgService.success()
  }

  /**
   * 更新
   * @param imgSortUpdateDto
   */
  async imgSortUpdate(imgSortUpdateDto:ImgSortUpdateDto) {
    let {id} = imgSortUpdateDto
    let filterData = handleFilterObjectEmptyData(imgSortUpdateDto);
    try {
      await this.imgSortEntity.createQueryBuilder().where("id = :id", { id }).update().set({...filterData}).execute();
    }catch (error) {
      return this.msgService.fail(error, 404);
    }
    return this.msgService.success();
  }

  /**
   * 删除图片分类和图片分类下的所有图片
   * @param id
   */
  async delete(id: string) {
    let ids = id.split(",")
    let imgSort = await this.imgSortEntity.createQueryBuilder().where("id IN (:id)",{id:[...ids]}).getMany()
    if(imgSort.length<=0){
      return this.msgService.fail("删除失败");
    }
    for(let i in imgSort){
      let imgSortId = imgSort[i]["id"]
      if(imgSortId){
        let imgRes = await this.imgEntity.createQueryBuilder().where("imgSortId = :id",{id:imgSortId}).getOne()
        if(imgRes){
          handleRemoveSingleFile(join(this.imgBaseUrl)+"/"+imgRes?.imgUrl,"原始图片")
          handleRemoveSingleFile(join(this.imgBaseUrl)+"/"+imgRes?.imgMidUrl,"中图片")
          handleRemoveSingleFile(join(this.imgBaseUrl)+"/"+imgRes?.imgSmallUrl,"小图片")

          try {
            await this.imgEntity.createQueryBuilder().delete().where("id = :id",{id:imgRes["id"]}).execute()
          }catch (error){
            return this.msgService.fail(error);
          }
        }
      }
    }
    try {
      await this.imgSortEntity.createQueryBuilder().delete().where("id IN (:id)",{id:[...ids]}).execute()
    }catch (error){
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }
}
