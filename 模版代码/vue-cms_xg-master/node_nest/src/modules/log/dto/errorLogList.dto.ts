//*- coding = utf-8 -*-
//@Time : 2022-11-15 19:57
//@Author : 沉默小管
//@File : menuList.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ErrorLogListDto {
  //操作员的名称
  @ApiProperty({
    description: '操作员名称',
    type:String,
  })
  operName:string;

  //创建时间 区间
  @ApiProperty({
    description: '创建时间',
    type:String,
  })
  createTime:string;

  //一页显示条数
  @ApiProperty({
    description: '一页的数量',
    type:Number,
  })
  @IsInt({message:"pageSize需要传为整数"})
  @IsNotEmpty({ message: 'pageSize不允许为空' })
  pageSize:number=999;

  //当前页码
  @ApiProperty({
    description: '当前页数',
    type:Number,
  })
  @IsInt({message:"currentPage需要传为整数"})
  @IsNotEmpty({ message: 'currentPage不允许为空' })
  currentPage:number=1;
}