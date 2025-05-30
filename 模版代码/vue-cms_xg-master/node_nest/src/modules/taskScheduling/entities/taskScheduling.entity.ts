//*- coding = utf-8 -*-
//@Time : 2022-11-03 22:17
//@Author : 沉默小管
//@File : user.model.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from "class-validator";
import { BaseEntity } from "@/modules/common/entities/base.entity";
import { sexEnum, statusEnum, userTypeEnum } from "@/common/enum";
import { Transform } from "class-transformer";

@Entity('g_task_scheduling')
export class TaskSchedulingEntity extends BaseEntity{

  @PrimaryGeneratedColumn({
    comment:"任务调度",
  })//自增主键
  id:number;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"任务名称",
  })
  name: string;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"任务类名",
  })
  taskClass: string;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"表达式",
  })
  expression: string;

}
