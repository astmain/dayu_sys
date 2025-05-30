import { BaseEntity } from "@/modules/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { sexEnum, statusEnum } from '@/common/enum';

@Entity("g_notice")
export class NoticeEntity extends BaseEntity{
  @PrimaryGeneratedColumn({
    comment:"通知公告",
  })//主键
  id:number;

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
    type:"longtext",
    nullable:false,
    comment:"公告内容",
  })
  content: string;

  @Column({
    type:"enum",
    enum:[statusEnum.start,statusEnum.stop],
    default:statusEnum.start,
    comment:"状态 1正常 2关闭",
  })
  status: number;

  @Column({
    type:"int",
    nullable:true,
    comment:"创建人id",
  })
  createUid: number;
}
