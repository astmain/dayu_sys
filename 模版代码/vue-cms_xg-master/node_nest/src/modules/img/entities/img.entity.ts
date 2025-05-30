import {BaseEntity} from "@/modules/common/entities/base.entity";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { Transform } from "class-transformer";

@Entity("g_img_list")
export class ImgEntity extends BaseEntity{
  @PrimaryGeneratedColumn({
    comment:"图片列表",
  })//主键
  id:number;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"图片名称",
  })
  imgName: string;

  @Column({
    type:"int",
    default:1,
    nullable:true,
    comment:"排序",
  })
    sort: number

  @Column({
    type:"text",
    nullable:true,
    comment:"原图图片路径",
  })
  imgUrl: string;

  @Column({
    type:"text",
    nullable:true,
    comment:"图片路径中图片",
  })
  imgMidUrl: string;

  @Column({
    type:"text",
    nullable:true,
    comment:"图片路径小图片",
  })
  imgSmallUrl: string;

  @Column({
    type:"int",
    nullable:true,
    comment:"图片类型Id",
  })
  imgSortId: number;
}
