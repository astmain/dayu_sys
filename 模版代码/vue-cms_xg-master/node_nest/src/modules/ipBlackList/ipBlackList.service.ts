import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {MsgService} from "@/modules/common/msg/msg.service";
import {IpBlackListEntity} from "./entities/ipBlackList.entity";
import {handleFilterObjectEmptyData, handleCurTime} from "@/utils/utils";
import { IpBlackListAddDto, IpBlackListDto, IpBlackListUpdateDto } from '@/modules/ipBlackList/dto';

@Injectable()
export class IpBlackListService {
    constructor(@InjectRepository(IpBlackListEntity) private readonly ipBlackListEntity:Repository<IpBlackListEntity>,
                private readonly msgService:MsgService
    ) {}
    /**
     * ip黑名单添加
     * @param ipBlackListAddDto
     */
    async ipBlackListAdd(ipBlackListAddDto: IpBlackListAddDto) {
        let {ip,sort} = ipBlackListAddDto
        let filterData = handleFilterObjectEmptyData(ipBlackListAddDto);
        try {
          await this.ipBlackListEntity.createQueryBuilder().insert().values({...filterData}).execute();
        }catch (error) {
            throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
        }
        return this.msgService.success()
    }

  /**
   * ip黑名单列表
   * @param ipBlackListListDto
   */
  async ipBlackList(ipBlackListListDto:IpBlackListDto) {
        let {pageSize,currentPage} = ipBlackListListDto
        let filterData = handleFilterObjectEmptyData(ipBlackListListDto);
        let startNum = pageSize*(currentPage-1)
        let ipBlackListTotal;
        try {
            ipBlackListTotal = await this.ipBlackListEntity.createQueryBuilder().where({...filterData}).getCount()
        }catch (error) {
            return this.msgService.fail(error);
        }
        let ipBlackList;
        try {
            ipBlackList = await this.ipBlackListEntity.createQueryBuilder().where({...filterData}).skip(startNum).take(pageSize).getMany()
        }catch (error) {
            return this.msgService.fail(error);
        }
        return this.msgService.success({total:ipBlackListTotal,data:ipBlackList});
    }

    /**
     * ip黑名单更新
     * @param ipBlackListUpdateDto
     */
    async ipBlackListUpdate(ipBlackListUpdateDto:IpBlackListUpdateDto) {
        let {id} = ipBlackListUpdateDto
        let filterData = handleFilterObjectEmptyData(ipBlackListUpdateDto);
        try {
            await this.ipBlackListEntity.createQueryBuilder().where("id = :id", { id }).update().set({...filterData}).execute();
        }catch (error) {
            return this.msgService.fail(error);
        }
        return this.msgService.success();
    }

    /**
     * ip黑名单删除
     * @param id
     */
    async delete(id: string) {
        let ids = id.split(",")
        try {
            await this.ipBlackListEntity.createQueryBuilder().delete().where("id in (:id)",{id:[...ids]}).execute()
        }catch (error){
            return this.msgService.fail(error);
        }
        return this.msgService.success();
    }
}
