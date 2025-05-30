import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {NoticeEntity} from "./entities/notice.entity";
import {Repository} from "typeorm";
import {MsgService} from "@/modules/common/msg/msg.service";
import {NoticeUpdateDto, NoticeListDto, NoticeAddDto} from "@/modules/notice/dto";
import { handleFilterObjectEmptyData, handleCurTime } from '@/utils/utils';
import { NotifyEntity } from '@/modules/notify/entities/notify.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';

@Injectable()
export class NoticeService {
    constructor(@InjectRepository(NoticeEntity) private readonly noticeEntity:Repository<NoticeEntity>,
                @InjectRepository(NotifyEntity) private readonly notifyEntity:Repository<NotifyEntity>,
                @InjectRepository(UserEntity) private readonly userEntity:Repository<UserEntity>,
                private readonly msgService:MsgService) {
    }
    /**
     * 通知公告添加
     * @param noticeAddDto
     */
    async noticeAdd(noticeAddDto: NoticeAddDto) {
        let {title} = noticeAddDto
        let filterData = handleFilterObjectEmptyData(noticeAddDto);

        const num = await this.noticeEntity.createQueryBuilder().where({title}).getCount()
        if(num>0){
            return this.msgService.fail("公告标题重复", 404);
        }
        try {
            await this.noticeEntity.createQueryBuilder().insert().values({...filterData}).execute()
        }catch (error) {
            throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
        }
        return this.msgService.success()
    }
    /**
     * 通知公告添加
     * @param noticeAddDto
     */
    async sendNotice(noticeAddDto: NoticeAddDto) {
        let {title} = noticeAddDto
        let filterData = handleFilterObjectEmptyData(noticeAddDto);

        return this.msgService.success()
    }

    /**
     * 查询所有列表
     */
    async noticeList(noticeListDto:NoticeListDto) {
        let {pageSize,currentPage} = noticeListDto
        let filterData = handleFilterObjectEmptyData(noticeListDto);
        let startNum = pageSize*(currentPage-1)
        let noticeTotal;
        try {
            noticeTotal = await this.noticeEntity.createQueryBuilder().where({...filterData}).getCount()
        }catch (error) {
            return this.msgService.fail(error);
        }
        let noticeList;
        try {
            noticeList = await this.noticeEntity.createQueryBuilder().where({...filterData}).skip(startNum).take(pageSize).getMany()
            if(noticeList.length>0){
              let userList = await this.userEntity.createQueryBuilder().getMany();
              for(let i in noticeList){
                for(let q in userList){
                  if(noticeList[i]["createUid"] == userList[q]["id"]){
                      noticeList[i]["createName"] = userList[q]['nickName']??userList[q]["username"];
                      break;
                  }
                }
              }
            }
        }catch (error) {
            return this.msgService.fail(error);
        }
        return this.msgService.success({total:noticeTotal,data:noticeList});
    }


    /**
     * 更新
     * @param noticeUpdateDto
     */
    async noticeUpdate(noticeUpdateDto:NoticeUpdateDto) {
        let {id} = noticeUpdateDto
        let filterData = handleFilterObjectEmptyData(noticeUpdateDto);
        try {
            await this.noticeEntity.createQueryBuilder().where("id = :id", { id }).update().set({...filterData}).execute();
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
            await this.noticeEntity.createQueryBuilder().delete().where("id in (:id)",{id:[...ids]}).execute()
        }catch (error){
            return this.msgService.fail(error);
        }
        return this.msgService.success();
    }

    /**
     * 修改通知公告状态
     * @param id
     * @param status
     */
    async changeNoticeStatus(id:number,status: number|string) {
        try {
            await this.notifyEntity.createQueryBuilder().where("id = :id", { id }).update().set({status:status??1}).execute();
        }catch (error) {
            return this.msgService.fail(error);
        }
        return this.msgService.success();
    }
}
