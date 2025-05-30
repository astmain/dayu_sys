//*- coding = utf-8 -*-
//@Time : 2022-11-03 22:17
//@Author : 沉默小管
//@File : user.model.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@/modules/common/entities/base.entity";

@Entity('g_active_page')
export class ActivePageEntity extends BaseEntity{

  @PrimaryGeneratedColumn({
    comment:"活跃页面",
  })//自增主键
  id:number;

  @Column({
    type:"varchar",
    length:300,
    comment:"页面地址",
  })
  pageUrl: string;

  @Column({
    type:"varchar",
    length:100,
    comment:"页面名称",
  })
  pageName: string;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"登录ip",
  })
  ip: string;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"浏览器",
  })
  browser: string;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"操作系统",
  })
  os: string;
}
