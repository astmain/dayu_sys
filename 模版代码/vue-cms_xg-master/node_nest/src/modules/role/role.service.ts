import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {RoleEntity} from "./entities/role.entity";
import {Repository} from "typeorm";
import {MsgService} from "@/modules/common/msg/msg.service";
import {RoleUpdateDto, RoleListDto, RoleAddDto} from "@/modules/role/dto";
import { handleFilterObjectEmptyData, handleCurTime } from '@/utils/utils';

@Injectable()
export class RoleService {
    constructor(@InjectRepository(RoleEntity) private readonly roleEntity:Repository<RoleEntity>,
                private readonly msgService:MsgService) {
    }
    /**
     * 角色添加
     * @param roleAddDto
     */
    async roleAdd(roleAddDto: RoleAddDto) {
        let {roleName} = roleAddDto
      let filterData = handleFilterObjectEmptyData(roleAddDto);

      const num = await this.roleEntity.createQueryBuilder().where({roleName}).getCount()
      if(num>0){
        return this.msgService.fail("角色名称重复", 404);
      }
        try {
          await this.roleEntity.createQueryBuilder().insert().values({...filterData}).execute()
        }catch (error) {
            throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
        }
        return this.msgService.success()
    }

    /**
     * 查询所有列表
     */
    async roleList(roleListDto:RoleListDto) {
        let {pageSize,currentPage} = roleListDto
        let filterData = handleFilterObjectEmptyData(roleListDto);
        let startNum = pageSize*(currentPage-1)
        let roleTotal;
        try {
            roleTotal = await this.roleEntity.createQueryBuilder().where({...filterData}).getCount()
        }catch (error) {
            return this.msgService.fail(error);
        }
        let roleList;
        try {
            roleList = await this.roleEntity.createQueryBuilder().where({...filterData}).skip(startNum).take(pageSize).getMany()
        }catch (error) {
            return this.msgService.fail(error);
        }
        return this.msgService.success({total:roleTotal,data:roleList});
    }


    /**
     * 更新
     * @param roleUpdateDto
     */
    async roleUpdate(roleUpdateDto:RoleUpdateDto) {
        let {id} = roleUpdateDto
        let filterData = handleFilterObjectEmptyData(roleUpdateDto);
        try {
            await this.roleEntity.createQueryBuilder().where("id = :id", { id }).update().set({...filterData}).execute();
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
            await this.roleEntity.createQueryBuilder().delete().where("id in (:id)",{id:[...ids]}).execute()
        }catch (error){
            return this.msgService.fail(error);
        }
        return this.msgService.success();
    }

    /**
     * 修改角色状态
     * @param id
     * @param status
     */
    async changeRoleStatus(id:number,status: number|string) {
        try {
            await this.roleEntity.createQueryBuilder().where("id = :id", { id }).update().set({status}).execute();
        }catch (error) {
            return this.msgService.fail(error);
        }
        return this.msgService.success();
    }
}
