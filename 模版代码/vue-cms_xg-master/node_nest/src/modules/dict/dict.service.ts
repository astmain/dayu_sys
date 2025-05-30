import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DictEntity } from './entities/dict.entity';
import { Repository } from 'typeorm';
import {
  DictAddDto,
  DictUpdateDto,
  DictListDto,
  DictDataDto,
  DictDataAddDto,
  DictDataUpdateDto,
  DictDataTypeDto,
} from './dto/index';
import { MsgService } from '../common/msg/msg.service';
import {handleFilterObjectEmptyData, handleCurTime} from '@/utils/utils';
import { DictDataEntity } from './entities/dictData.entity';

@Injectable()
export class DictService {
  constructor(@InjectRepository(DictEntity) private readonly dictEntity:Repository<DictEntity>,
              @InjectRepository(DictDataEntity) private readonly dictDataEntity:Repository<DictDataEntity>,
              private readonly msgService:MsgService) {
  }
  /**
   * 字典添加
   * @param addDictDto
   */
  async dictAdd(addDictDto: DictAddDto) {
    let {dictName} = addDictDto
    let filterData = handleFilterObjectEmptyData(addDictDto);
    const num = await this.dictEntity.createQueryBuilder().where({dictName}).getCount()
    if(num>0){
      return this.msgService.fail("字典名称重复", 404);
    }
    try {
      await this.dictEntity.createQueryBuilder().insert().values({...filterData}).execute();
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }
    return this.msgService.success()
  }

  /**
   * 查询所有列表
   */
  async dictList(dictListDto:DictListDto) {
    let {pageSize,currentPage} = dictListDto
    let filterData = handleFilterObjectEmptyData(dictListDto);
    let startNum = pageSize*(currentPage-1)
    let dictTotal;
    try {
      dictTotal = await this.dictEntity.createQueryBuilder().where({...filterData}).getCount()
    }catch (error) {
      return this.msgService.fail(error);
    }
    let dictList;
    try {
      dictList = await this.dictEntity.createQueryBuilder().where({...filterData}).skip(startNum).take(pageSize).getMany()
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success({total:dictTotal,data:dictList});
  }
  /**
   * 字典详情
   */
  async dictDetail(id:string|number) {
    let dictDataDetail;
    try {
      dictDataDetail = await this.dictEntity.createQueryBuilder().where({id}).getOne();
    }catch (error){
      return this.msgService.fail(error);
    }
    return this.msgService.success({data:dictDataDetail});
  }


  /**
   * 更新
   * @param dictUpdateDto
   */
  async dictUpdate(dictUpdateDto:DictUpdateDto) {
    let {id} = dictUpdateDto
    let filterData = handleFilterObjectEmptyData(dictUpdateDto);
    try {
      await this.dictEntity.createQueryBuilder().where("id = :id", { id }).update().set({...filterData}).execute();
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }

  /**
   * 删除
   * @param id
   */
  async delete(id: string|number) {
    let ids = (id+"").split(",")
    try {
      let dictList = await this.dictEntity.createQueryBuilder().where("id in (:id)",{id:[...ids]}).getMany();
      if(dictList.length>0){
        for(let i in dictList){
          await this.dictDataEntity.createQueryBuilder().delete().where({dictId:dictList[i]["id"]}).execute();
        }
      }
      await this.dictEntity.createQueryBuilder().delete().where("id in (:id)",{id:[...ids]}).execute()
    }catch (error){
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }

  /**
   * 字典添加
   * @param dictDataAddDto
   */
  async dictDataAdd(dictDataAddDto: DictDataAddDto) {
    let {dictId,dictLabel} = dictDataAddDto
    let filterData = handleFilterObjectEmptyData(dictDataAddDto);
    const repeatNum = await this.dictDataEntity.createQueryBuilder().where({dictId,dictLabel}).getCount()
    if(repeatNum>0){
      return this.msgService.fail("字典名称重复", 404);
    }
    try {
      await this.dictDataEntity.createQueryBuilder().insert().values({...filterData}).execute();
    }catch (error) {
      throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
    }
    return this.msgService.success()
  }

  /**
   * 查询所有列表
   */
  async dictDataList(dictDataDto:DictDataDto) {
    let {pageSize,currentPage} = dictDataDto
    let filterData = handleFilterObjectEmptyData(dictDataDto);
    let startNum = pageSize*(currentPage-1)
    let dictTotal;
    try {
      dictTotal = await this.dictDataEntity.createQueryBuilder().where({...filterData}).getCount()
    }catch (error) {
      return this.msgService.fail(error);
    }
    let dictList;
    try {
      dictList = await this.dictDataEntity.createQueryBuilder().where({...filterData}).skip(startNum).take(pageSize).getMany()
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success({total:dictTotal,data:dictList});
  }

  /**
   * 通过字典获取数据
   */
  async dictDataType(dictDataTypeDto:DictDataTypeDto) {
    let {dictType} = dictDataTypeDto
    let filterData = handleFilterObjectEmptyData(dictDataTypeDto);
    let dict;
    try {
      dict = await this.dictEntity.createQueryBuilder().where({...filterData}).getOne()
    }catch (error) {
      return this.msgService.fail(error);
    }
    let dictDataList;
    try {
      dictDataList = await this.dictDataEntity.createQueryBuilder().where({dictId:dict["id"]}).getMany()
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success(dictDataList);
  }


  /**
   * 更新
   * @param dictDataUpdateDto
   */
  async dictDataUpdate(dictDataUpdateDto:DictDataUpdateDto) {
    let {id} = dictDataUpdateDto
    let filterData = handleFilterObjectEmptyData(dictDataUpdateDto);
    try {
      await this.dictDataEntity.createQueryBuilder().where("id = :id", { id }).update().set({...filterData}).execute();
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }

  /**
   * 删除
   * @param id
   */
  async dictDataDelete(id: string) {
    let ids = id.split(",")
    try {
      await this.dictDataEntity.createQueryBuilder().delete().where("id in (:id)",{id:[...ids]}).execute()
    }catch (error){
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }
}
