//*- coding = utf-8 -*-
//@Time : 2022-11-03 22:17
//@Author : 沉默小管
//@File : user.model.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from "class-validator";
import { BaseEntity } from "@/modules/common/entities/base.entity";
import { sexEnum, statusEnum } from "@/common/enum";

@Entity('g_user_sources')
export class UserSourcesEntity extends BaseEntity{

  @PrimaryGeneratedColumn({
    comment:"用户来源",
  })//自增主键
  id:number;

  @Column({
    type:"varchar",
    length:300,
    comment:"网络地址",
  })
  webUrl: string;

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
