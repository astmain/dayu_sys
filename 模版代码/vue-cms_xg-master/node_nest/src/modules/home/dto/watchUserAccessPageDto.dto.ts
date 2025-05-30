//*- coding = utf-8 -*-
//@Time : 2022-11-10 12:01
//@Author : 沉默小管
//@File : login.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class WatchUserAccessPageDto{
  @ApiProperty({
    description: '页面地址',
    type:String,
  })
  @IsNotEmpty({ message: '页面地址不能为空' })
  pageUrl:string;

  @ApiProperty({
    description: '页面名称',
    type:String,
  })
  @IsNotEmpty({ message: '页面名称不能为空' })
  pageName:string;
}
