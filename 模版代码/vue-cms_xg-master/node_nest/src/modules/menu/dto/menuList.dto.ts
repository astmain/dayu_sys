//*- coding = utf-8 -*-
//@Time : 2022-11-15 19:57
//@Author : 沉默小管
//@File : menuList.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MenuListDto{
  @ApiProperty({
    description: '菜单id',
    type:String,
  })
  id:string;

  @ApiProperty({
    description: '菜单名称',
    type:String,
  })
  menuName:string;

  @ApiProperty({
    description: '菜单状态',
    type:Number,
  })
  status:number;

}