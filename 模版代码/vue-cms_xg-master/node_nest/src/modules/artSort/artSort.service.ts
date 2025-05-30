import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ArtSortListDto, ArtSortAddDto, ArtSortUpdateDto} from "@/modules/artSort/dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MsgService} from "@/modules/common/msg/msg.service";
import {ArtSortEntity} from "./entities/artSort.entity";
import {handleFilterObjectEmptyData, handleCurTime} from "@/utils/utils";

@Injectable()
export class ArtSortService {
    constructor(@InjectRepository(ArtSortEntity) private readonly artSortEntity:Repository<ArtSortEntity>,
                private readonly msgService:MsgService
    ) {}
    /**
     * 文章类型添加
     * @param artSortAddDto
     */
    async artSortAdd(artSortAddDto: ArtSortAddDto) {
        let {artSortName,sort} = artSortAddDto
        let filterData = handleFilterObjectEmptyData(artSortAddDto);
        const num = await this.artSortEntity.createQueryBuilder().where({artSortName}).getCount()
        if(num>0){
            return this.msgService.fail("文章类型名称重复", 404);
        }
        try {
          await this.artSortEntity.createQueryBuilder().insert().values({...filterData}).execute();
        }catch (error) {
            throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
        }
        return this.msgService.success()
    }

  /**
   * 查询所有列表
   * @param artSortListDto
   */
  async artSortList(artSortListDto:ArtSortListDto) {
        let {pageSize,currentPage} = artSortListDto
        let filterData = handleFilterObjectEmptyData(artSortListDto);
        let startNum = pageSize*(currentPage-1)
        let artSortTotal;
        try {
            artSortTotal = await this.artSortEntity.createQueryBuilder().where({...filterData}).getCount()
        }catch (error) {
            return this.msgService.fail(error);
        }
        let artSort;
        try {
            artSort = await this.artSortEntity.createQueryBuilder().where({...filterData}).skip(startNum).take(pageSize).getMany()
        }catch (error) {
            return this.msgService.fail(error);
        }
        return this.msgService.success({total:artSortTotal,data:artSort});
    }

    /**
     * 更新
     * @param artSortUpdateDto
     */
    async artSortUpdate(artSortUpdateDto:ArtSortUpdateDto) {
        let {id} = artSortUpdateDto
        let filterData = handleFilterObjectEmptyData(artSortUpdateDto);
        try {
            await this.artSortEntity.createQueryBuilder().where("id = :id", { id }).update().set({...filterData}).execute();
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
            await this.artSortEntity.createQueryBuilder().delete().where("id in (:id)",{id:[...ids]}).execute()
        }catch (error){
            return this.msgService.fail(error);
        }
        return this.msgService.success();
    }
}
