import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MsgService} from "@/modules/common/msg/msg.service";
import {ArtEntity} from "./entities/art.entity";
import { ArtAddDto } from './dto/artAdd.dto';
import { ArtUpdateDto } from "@/modules/art/dto";
import { ArtListDto} from "./dto";
import { ArtSortEntity } from "@/modules/artSort/entities/artSort.entity";
import { ArtColumnEntity } from "@/modules/artColumn/entities/artColumn.entity";
import { handleFilterObjectEmptyData, handleCurTime } from "@/utils/utils";
import { ImgEntity } from "@/modules/img/entities/img.entity";
import { sysBase } from '@/utils/config';
import { ArtContentFileEntity } from '@/modules/art/entities/artContentFile.entity';

@Injectable()
export class ArtService {
  constructor(@InjectRepository(ArtEntity) private readonly artEntity:Repository<ArtEntity>,
              @InjectRepository(ArtSortEntity) private readonly artSortEntity:Repository<ArtSortEntity>,
              @InjectRepository(ArtColumnEntity) private readonly artColumnEntity:Repository<ArtColumnEntity>,
              @InjectRepository(ImgEntity) private readonly imgEntity:Repository<ImgEntity>,
              @InjectRepository(ArtContentFileEntity) private readonly artContentFileEntity:Repository<ArtContentFileEntity>,
              private readonly msgService:MsgService
  ) {}

  /**
   * 文章添加
   * @param addArtDto
   */
  async artAdd(addArtDto: ArtAddDto) {
    let {artName,artContentId} = addArtDto
    let filterData = handleFilterObjectEmptyData(addArtDto);
    const num = await this.artEntity.createQueryBuilder().where({artName}).getCount()
    if(num>0){
      return this.msgService.fail("文章名称重复", 404);
    }

    if(artContentId && artContentId.split(",").length>0){
      let artContentIdArr = artContentId.split(",")
      //更新文章图片状态
      for(let i in artContentIdArr){
        await this.artContentFileEntity.createQueryBuilder().where("id = :id", { id:artContentIdArr[i] }).update().set({status:2}).execute()
      }
    }
    try {
      await this.artEntity.createQueryBuilder().insert().values({...filterData}).execute();
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }
    return this.msgService.success()
  }

  /**
   * 查询所有列表
   * @param artListDto
   */
  async artList(artListDto:ArtListDto) {
    let {artName,pageSize,currentPage} = artListDto
    let filterData = handleFilterObjectEmptyData(artListDto);
    let startNum = pageSize*(currentPage-1)
    let artTotal;
    try {
      artTotal = await this.artEntity.createQueryBuilder().where({...filterData}).getCount()
    }catch (error) {
      return this.msgService.fail(error);
    }
    let artList;
    try {
      artList = await this.artEntity.createQueryBuilder().where({...filterData}).skip(startNum).take(pageSize).getMany()
      if(artList.length>0 && artList){
        let artSort = await this.artSortEntity.createQueryBuilder().select(["id","artSortName"]).getRawMany()
        let artColumn = await this.artColumnEntity.createQueryBuilder().select(["id","columnName"]).getRawMany()
        let picList = await this.imgEntity.createQueryBuilder().select(["id","imgMidUrl"]).getRawMany()

        for(let i in artList){
          if(artList[i]["artContentId"]){
            artList[i]["artContentFileArr"] = []
            let idArr = artList[i]["artContentId"].split(",")
            for(let w in idArr){
              if(idArr[w]){
                let artContentFile = await this.artContentFileEntity.createQueryBuilder().select(["fileName"]).where("id = :id",{id:idArr[w]}).getRawOne()
                artList[i]["artContentFileArr"].push({
                  id:idArr[w],
                  fileName:artContentFile["fileName"],
                })
              }
            }
          }
          for(let q in artSort){
            if(artList[i]["artSortId"] == artSort[q]["id"]){
              artList[i]["artSortName"] = artSort[q]["artSortName"]??"";
            }
          }
          for(let w in picList){
            if(artList[i]["picId"] == picList[w]["id"]){
              artList[i]["picUrl"] = picList[w]["imgMidUrl"]??"";
            }
          }
          for(let e in artColumn){
            if(artList[i]["artColumnId"] == artColumn[e]["id"]){
              artList[i]["columnName"] = artColumn[e]["columnName"]??"";
            }
          }
        }
      }
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success({total:artTotal,data:artList});
  }


  /**
   * 更新
   * @param artUpdateDto
   */
  async artUpdate(artUpdateDto:ArtUpdateDto) {
    let {id,artContentId} = artUpdateDto
    let filterData = handleFilterObjectEmptyData(artUpdateDto);
    if(artContentId && artContentId.split(",").length>0){
      let artContentIdArr = artContentId.split(",")
      //更新文章图片状态
      for(let i in artContentIdArr){
        await this.artContentFileEntity.createQueryBuilder().where("id = :id", { id:artContentIdArr[i] }).update().set({status:2}).execute()
      }
    }
    try {
      await this.artEntity.createQueryBuilder().where("id = :id", { id }).update().set({...filterData}).execute();
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }

  /**
   * 删除
   * @param id
   */
  async delete(id: string) {
    let ids = id.split(",")
    try {
      await this.artEntity.createQueryBuilder().delete().where("id in (:id)",{id:[...ids]}).execute()
    }catch (error){
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }

  /**
   * 是否显示
   * @param id
   * @param status
   */
  async artChangeStatus(id:number,status: number|string) {
    try {
      await this.artEntity.createQueryBuilder().where("id = :id", { id }).update().set({status}).execute();
    }catch (error){
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }

  /**
   * 是否显示
   * @param file
   */
  async handleArtContentImgUpload(file:any) {
    let {filename} = file
    let artContentImg = sysBase.host+":"+sysBase.port+"/static/artContentImg/"+filename
    let addData = {
      fileName:filename,
      type:1,
      status:1
    }
    let artContent = await this.artContentFileEntity.createQueryBuilder().insert().values({...addData}).execute()
    let id = artContent.identifiers[0]["id"]
    let data = {
      id,
      imgUrl:artContentImg
    }
    return this.msgService.success(data);
  }
}
