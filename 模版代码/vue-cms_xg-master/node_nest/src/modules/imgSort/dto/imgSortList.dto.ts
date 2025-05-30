//*- coding = utf-8 -*-
//@Time : 2022-11-15 19:57
//@Author : 沉默小管
//@File : menuList.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import {IsDefined, IsEmpty, IsInt, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ImgSortListDto {
  //图片名称
  @ApiProperty({
    description: '图片分类名称',
    type:String,
  })
  sortName:string;

  //一页显示条数
  @ApiProperty({
    description: '一页的数量',
    type:Number,
  })
  @IsOptional()//可选
  pageSize:number=999;

  //当前页码
  @ApiProperty({
    description: '当前页数',
    type:Number,
  })
  @IsOptional()//可选
  currentPage:number=1;
}