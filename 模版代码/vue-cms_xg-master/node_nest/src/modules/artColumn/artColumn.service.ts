import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ArtColumnListDto, ArtColumnAddDto, ArtColumnUpdateDto} from "@/modules/artColumn/dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MsgService} from "@/modules/common/msg/msg.service";
import {ArtColumnEntity} from "./entities/artColumn.entity";
import {handleFilterObjectEmptyData, handleCurTime} from "@/utils/utils";

@Injectable()
export class ArtColumnService {
    constructor(@InjectRepository(ArtColumnEntity) private readonly artColumnEntity:Repository<ArtColumnEntity>,
                private readonly msgService:MsgService
    ) {}
    /**
     * 文章类型添加
     * @param artColumnAddDto
     */
    async artColumnAdd(artColumnAddDto: ArtColumnAddDto) {
        let {columnName,sort} = artColumnAddDto
        let filterData = handleFilterObjectEmptyData(artColumnAddDto);

      const num = await this.artColumnEntity.createQueryBuilder().where({columnName}).getCount()
      if(num>0){
        return this.msgService.fail("文章类型名称重复", 404);
      }
        try {
          await this.artColumnEntity.createQueryBuilder().insert().values({...filterData}).execute();
        }catch (error) {
            throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
        }
        return this.msgService.success()
    }

    /**
     * 查询所有列表
     */
    async artColumnList(artColumnListDto:ArtColumnListDto) {
        let {columnName,pageSize,currentPage} = artColumnListDto
        let filterData = handleFilterObjectEmptyData(artColumnListDto);
        let startNum = pageSize*(currentPage-1)
        let artColumnTotal;
        try {
            artColumnTotal = await this.artColumnEntity.createQueryBuilder().where({...filterData}).getCount()
        }catch (error) {
            return this.msgService.fail(error);
        }
        let artColumn;
        try {
            artColumn = await this.artColumnEntity.createQueryBuilder().where({...filterData}).skip(startNum).take(pageSize).getMany()
        }catch (error) {
            return this.msgService.fail(error);
        }
        return this.msgService.success({total:artColumnTotal,data:artColumn});
    }

    /**
     * 更新
     * @param artColumnUpdateDto
     */
    async artColumnUpdate(artColumnUpdateDto:ArtColumnUpdateDto) {
        let {id,columnName,sort} = artColumnUpdateDto
        let filterData = handleFilterObjectEmptyData(artColumnUpdateDto);
        try {
            await this.artColumnEntity.createQueryBuilder().where("id = :id", { id }).update().set({...filterData}).execute();
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
            await this.artColumnEntity.createQueryBuilder().delete().where("id in (:id)",{id:[...ids]}).execute()
        }catch (error){
            return this.msgService.fail(error);
        }
        return this.msgService.success();
    }
}
