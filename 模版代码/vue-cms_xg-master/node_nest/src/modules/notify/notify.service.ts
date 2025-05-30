import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {NotifyEntity} from "./entities/notify.entity";
import {Repository} from "typeorm";
import {MsgService} from "@/modules/common/msg/msg.service";
import {NotifyUpdateDto, NotifyListDto, NotifyAddDto} from "@/modules/notify/dto";
import { handleFilterObjectEmptyData, handleCurTime } from '@/utils/utils';
import {EventsGateway} from "@/events/events.gateway";
import {UserEntity} from "@/modules/user/entities/user.entity";

@Injectable()
export class NotifyService {
    constructor(@InjectRepository(NotifyEntity) private readonly notifyEntity:Repository<NotifyEntity>,
                @InjectRepository(UserEntity) private readonly userEntity:Repository<UserEntity>,
                private readonly eventsGateway:EventsGateway,
                private readonly msgService:MsgService) {
    }
    /**
     * 消息通知发送
     * @param notifyAddDto
     */
    async notifySend(notifyAddDto: NotifyAddDto) {
        let {notifyUid} = notifyAddDto
        let noticeUidArr:any[] = notifyUid.split(",")
        let filterData = handleFilterObjectEmptyData(notifyAddDto);
        if(noticeUidArr.length>0){
            try {
                for(let i in noticeUidArr){
                    if(noticeUidArr[i]){
                        let data = {
                            ...filterData,
                            notifyUid:noticeUidArr[i]-0
                        }
                        await this.notifyEntity.createQueryBuilder().insert().values(data).execute()
                    }
                }
            }catch (error){
                throw new HttpException(error,HttpStatus.SERVICE_UNAVAILABLE)
            }
        }
        return this.msgService.success()
    }

    /**
     * 查询所有列表
     */
    async notifyList(notifyListDto:NotifyListDto) {
        let {pageSize,currentPage} = notifyListDto

        let filterData:any = handleFilterObjectEmptyData(notifyListDto);
        filterData.notifyUid = !filterData.notifyUid?"":filterData.notifyUid;
        filterData = handleFilterObjectEmptyData(filterData);
        if(filterData?.notifyName){
          let userList = await this.userEntity.createQueryBuilder().getMany()
            for(let i in userList){
            if(userList[i]["nickName"] == filterData?.notifyName || userList[i]["username"]== filterData?.notifyName){
              filterData.notifyUid = userList[i]["id"]
              break;
            }
          }
        }
        let startNum = pageSize*(currentPage-1)
        let notifyTotal;
        try {
            notifyTotal = await this.notifyEntity.createQueryBuilder().where({...filterData}).getCount()
        }catch (error) {
            return this.msgService.fail(error);
        }
        let notifyList;
        try {
            notifyList = await this.notifyEntity.createQueryBuilder().where({...filterData}).skip(startNum).take(pageSize).orderBy("status","DESC").getMany()
            if(notifyList.length>0){
                let userList = await this.userEntity.createQueryBuilder().getMany()
                for(let i in notifyList){
                    for(let q in userList){
                        if(notifyList[i]["sendNoticeUid"] == userList[q]["id"]){
                            notifyList[i]["sendNoticeName"] = userList[q]["nickName"]??userList[q]["username"]
                        }
                        if(notifyList[i]["notifyUid"] == userList[q]["id"]){
                            notifyList[i]["notifyName"] = userList[q]["nickName"]??userList[q]["username"]
                        }
                    }
                }
            }
        }catch (error) {
            return this.msgService.fail(error);
        }
        return this.msgService.success({total:notifyTotal,data:notifyList});
    }


    /**
     * 更新
     * @param notifyUpdateDto
     */
    async notifyUpdate(notifyUpdateDto:NotifyUpdateDto) {
        let {id} = notifyUpdateDto
        let filterData = handleFilterObjectEmptyData(notifyUpdateDto);
        try {
            await this.notifyEntity.createQueryBuilder().where("id = :id", { id }).update().set({...filterData}).execute();
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
            await this.notifyEntity.createQueryBuilder().delete().where("id in (:id)",{id:[...ids]}).execute()
        }catch (error){
            return this.msgService.fail(error);
        }
        return this.msgService.success();
    }

    /**
     * 修改消息通知状态
     * @param id
     * @param status
     */
    async changeNotifyStatus(id:number,status: number|string) {
        try {
            await this.notifyEntity.createQueryBuilder().where("id = :id", { id }).update().set({status}).execute();
        }catch (error) {
            return this.msgService.fail(error);
        }
        return this.msgService.success();
    }
    /**
     * 获取未读通知公告
     */
    async noReadNotice(uid:number) {
      let noReadNoticeNum;
        try {
          noReadNoticeNum = await this.notifyEntity.createQueryBuilder().where("status = :status AND notifyUid=:notifyUid", { status:2,notifyUid:uid }).getCount();
        }catch (error) {
            return this.msgService.fail(error);
        }
        return this.msgService.success(noReadNoticeNum);
    }
    /**
     * 修改消息通知状态
     */
    async changeNoticeStatus(notifyId:number) {
      let notifyRes;
        try {
          notifyRes = await this.notifyEntity.createQueryBuilder().where("id=:id", { id:notifyId }).update().set({status:1}).execute();
        }catch (error) {
            return this.msgService.fail(error);
        }
        return this.msgService.success(notifyRes);
    }
}
