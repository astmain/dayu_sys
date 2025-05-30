//*- coding = utf-8 -*-
//@Time : 2022-11-15 19:57
//@Author : 沉默小管
//@File : menuList.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ImgListDto {
  //图片名称
  @ApiProperty({
    description: '图片名称',
    type:String,
  })
  imgName:string="";

  //图片分类id
  @ApiProperty({
    description: '图片分类id',
    type:String,
  })
  imgSortId:number|string;

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