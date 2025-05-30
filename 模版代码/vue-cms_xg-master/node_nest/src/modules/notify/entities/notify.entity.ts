import { BaseEntity } from "@/modules/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { notifyStatusEnum, statusEnum } from '@/common/enum';

@Entity("g_notify")
export class NotifyEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment:"消息通知",
    })//主键
    id:number;

    @Column({
        type:"int",
        nullable:true,
        comment:"公告id获取公告类型 如果没有就是自定义",
    })
    noticeId: number;

    @Column({
        type:"int",
        nullable:true,
        comment:"消息通知接收者uid",
    })
    notifyUid: number;

    @Column({
        type:"int",
        nullable:true,
        comment:"发送通知人uid",
    })
    sendNoticeUid: number;

    @Column({
        type:"enum",
        enum:[notifyStatusEnum.read,notifyStatusEnum.unread],
        default:notifyStatusEnum.unread,
        comment:"消息通知状态 1已读 2未读 默认为2 已读后，顶部消息消失",
    })
    status: number;

    @Column({
        type:"varchar",
        length:100,
        comment:"公告标题",
    })
    title: string;

    @Column({
        type:"tinyint",
        comment:"公告类型",
    })
    noticeType: number;

    @Column({
      type:"text",
      nullable:false,
      comment:"消息通知内容 替换内容中{name} {price}等字眼",
    })
    content: string;
}
