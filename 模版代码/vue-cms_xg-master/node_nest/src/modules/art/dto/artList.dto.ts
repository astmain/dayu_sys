//*- coding = utf-8 -*-
//@Time : 2022-11-15 19:57
//@Author : 沉默小管
//@File : menuList.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import {IsInt, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ArtListDto {
  //文章名称
  @ApiProperty({
    description: '文章名称',
    type:String,
  })
  artName:string="";

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