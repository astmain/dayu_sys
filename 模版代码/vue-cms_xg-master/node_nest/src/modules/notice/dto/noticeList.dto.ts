//*- coding = utf-8 -*-
//@Time : 2022-11-15 19:57
//@Author : 沉默小管
//@File : menuList.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class NoticeListDto {
  // @IsString({ message: '角色名称必须为字符串' })
  @ApiProperty({
    description: '公告标题',
    type:String,
  })
  @IsString({ message: '公告标题必须为字符串' })
  title:string="";

  //一页显示条数
  @ApiProperty({
    description: '一页的数量',
    type:Number,
  })
  pageSize:number=999;

  //当前页码
  @ApiProperty({
    description: '当前页数',
    type:Number,
  })
  currentPage:number=1;
}