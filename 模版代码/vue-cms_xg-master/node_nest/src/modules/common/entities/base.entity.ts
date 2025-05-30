//*- coding = utf-8 -*-
//@Time : 2022-11-28 18:27
//@Author : 沉默小管
//@File : base.entity.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import { Column } from 'typeorm';

export class BaseEntity {
  @Column({
    type:"timestamp",
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
    comment:"更新时间",
  })
  updateTime: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    comment:"添加时间",
  })
  addTime: Date;

}
