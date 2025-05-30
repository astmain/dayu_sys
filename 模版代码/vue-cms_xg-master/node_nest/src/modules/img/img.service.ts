import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  handleFilterObjectEmptyData,
  handleRemoveSingleFile,
  handleCurTime,
} from '@/utils/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { ImgEntity } from './entities/img.entity';
import { Repository } from 'typeorm';
import { MsgService } from '../common/msg/msg.service';
import { ImgListDto,ImgAddDto,ImgUpdateDto } from './dto/index';
import { join } from 'path';

import { uploadImgConfig } from '@/utils/config';

interface fileInterface{
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  destination: string,
  filename: string,
  path: string,
  size: number
}
@Injectable()
export class ImgService {
  private imgBaseUrl = uploadImgConfig.imgBaseUrl
  constructor(
      //依赖注入
      @InjectRepository(ImgEntity) private readonly imgEntity:Repository<ImgEntity>,
      private readonly msgService:MsgService) {
  }


  /**
   * 字典添加
   * @param addImgDto
   * @param file
   */
  async imgAdd(addImgDto: ImgAddDto,file:any) {
    const images = require("images");

    let {imgName,sort,imgSortId} = addImgDto

    const num = await this.imgEntity.createQueryBuilder().where({imgName}).getCount()
    if(num>0){
      return this.msgService.fail("图片名称重复", 404);
    }
    let {fieldname,originalname,encoding,mimetype,destination,filename,path,size} = file
    //__dirname 文件更目录
    let tempImg = join(path);//临时图片
    let originalFileName = "Original"+filename//原始图片
    let middleFileName = "Middle"+filename//中等图片
    let smallFileName = "Small"+filename//微小图片
    let saveOriginalImg = join(destination)+"/"+originalFileName;//原始图片保存的图片路径
    let saveMiddleImg = join(destination)+"/"+middleFileName;//中等图片保存的图片路径
    let saveSmallImg = join(destination)+"/"+smallFileName;//微小图片保存的图片路径
    let obj = images(tempImg).size();
    //原始
    images(tempImg).size(obj.width,obj.height).save(saveOriginalImg, {
      quality : 100                    //保存图片到文件,图片质量为100
    });
    //中
    images(tempImg).size(obj.width/2,obj.height/2).save(saveMiddleImg, {
      quality : 50                    //保存图片到文件,图片质量为50
    });
    //小
    images(tempImg).size(obj.width/4,obj.height/4).save(saveSmallImg, {
      quality : 30                    //保存图片到文件,图片质量为30
    });

    //删除图片
    handleRemoveSingleFile(tempImg,"临时图片")

    let queryRunner = await this.imgEntity.manager.connection.createQueryRunner()
    await queryRunner.startTransaction()
    try {
      await queryRunner.manager.query(`INSERT INTO g_img_list (imgName,sort,imgSortId,imgUrl,imgMidUrl,imgSmallUrl)
     VALUES ('${imgName}',${sort},'${imgSortId}','${originalFileName}','${middleFileName}','${smallFileName}')`)
      await queryRunner.commitTransaction()
    }catch (error) {
      handleRemoveSingleFile(saveOriginalImg,"原始图片")
      handleRemoveSingleFile(saveMiddleImg,"中图片")
      handleRemoveSingleFile(saveSmallImg,"小图片")
      await queryRunner.rollbackTransaction()
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }finally {
      await queryRunner.release()
    }

    return this.msgService.success()
  }

  /**
   * 查询所有列表
   */
  async imgList(imgListDto:ImgListDto) {
    let {pageSize,currentPage} = imgListDto
    let filterData = handleFilterObjectEmptyData(imgListDto);
    let startNum = pageSize*(currentPage-1)
    let imgTotal;
    try {
      imgTotal = await this.imgEntity.createQueryBuilder().where({...filterData}).getCount()
    }catch (error) {
      return this.msgService.fail(error);
    }
    let imgList;
    try {
      imgList = await this.imgEntity.createQueryBuilder().where({...filterData}).skip(startNum).take(pageSize).orderBy("sort").getMany()
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success({total:imgTotal,data:imgList});
  }


  /**
   * 更新图片
   * @param imgUpdateDto
   * @param file
   */
  async imgUpdate(imgUpdateDto:ImgUpdateDto,file:fileInterface) {
    let images = require("images");

    let {id,imgName,imgSortId,sort,isUpload} = imgUpdateDto
    let filterData = handleFilterObjectEmptyData(imgUpdateDto);
    const num = await this.imgEntity.createQueryBuilder().where("imgName = :imgName AND id != :id",{imgName,id}).getCount()
    if(num>0){
      return this.msgService.fail("图片名称重复", 404);
    }
    //有上传图片
    if(isUpload==1){
      let {fieldname,originalname,encoding,mimetype,destination,filename,path,size} = file
      let tempImg = join(path);//临时图片
      let originalFileName = "Original"+filename//原始图片
      let middleFileName = "Middle"+filename//中等图片
      let smallFileName = "Small"+filename//微小图片
      let saveOriginalImg = join(destination)+"/"+originalFileName;//原始图片保存的图片路径
      let saveMiddleImg = join(destination)+"/"+middleFileName;//中等图片保存的图片路径
      let saveSmallImg = join(destination)+"/"+smallFileName;//微小图片保存的图片路径
      let obj = images(tempImg).size();
      //原始
      images(tempImg).size(obj.width,obj.height).save(saveOriginalImg, {
        quality : 100                    //保存图片到文件,图片质量为50
      });
      //中
      images(tempImg).size(obj.width/2,obj.height/2).save(saveMiddleImg, {
        quality : 50                    //保存图片到文件,图片质量为50
      });
      //小
      images(tempImg).size(obj.width/4,obj.height/4).save(saveSmallImg, {
        quality : 30                    //保存图片到文件,图片质量为50
      });

      const imgRes = await this.imgEntity.createQueryBuilder().where({id}).getOne()
      handleRemoveSingleFile(tempImg,"临时图片")
      handleRemoveSingleFile(join(this.imgBaseUrl)+"/"+imgRes?.imgUrl,"原始图片")
      handleRemoveSingleFile(join(this.imgBaseUrl)+"/"+imgRes?.imgMidUrl,"中图片")
      handleRemoveSingleFile(join(this.imgBaseUrl)+"/"+imgRes?.imgSmallUrl,"小图片")
      let queryRunner = await this.imgEntity.manager.connection.createQueryRunner()
      await queryRunner.startTransaction()
      try {
        await queryRunner.manager.query(`UPDATE g_img_list SET imgName='${imgName}',imgUrl='${originalFileName}',imgMidUrl='${middleFileName}',
       imgSmallUrl='${smallFileName}',imgSortId=${imgSortId},sort=${sort} WHERE id=${id}`)
        await queryRunner.commitTransaction()
      }catch (error) {
        handleRemoveSingleFile(saveOriginalImg,"原始图片")
        handleRemoveSingleFile(saveMiddleImg,"中图片")
        handleRemoveSingleFile(saveSmallImg,"小图片")
        await queryRunner.rollbackTransaction()
        throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
      }finally {
        await queryRunner.release()
      }
    }else{
      try {
        await this.imgEntity.createQueryBuilder().where("id = :id", { id }).update().set({...filterData}).execute();
      }catch (error) {
        throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
      }
    }
    return this.msgService.success();
  }

  /**
   * 删除
   * @param id
   */
  async delete(id: string) {
    let imgRes = await this.imgEntity.createQueryBuilder().where({id}).getOne()

    handleRemoveSingleFile(join(this.imgBaseUrl)+"/"+imgRes?.imgUrl,"原始图片")
    handleRemoveSingleFile(join(this.imgBaseUrl)+"/"+imgRes?.imgMidUrl,"中图片")
    handleRemoveSingleFile(join(this.imgBaseUrl)+"/"+imgRes?.imgSmallUrl,"小图片")

    let ids = id.split(",")
    try {
      await this.imgEntity.createQueryBuilder().delete().where("id in (:id)",{id:[...ids]}).execute()
    }catch (error){
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }
}
