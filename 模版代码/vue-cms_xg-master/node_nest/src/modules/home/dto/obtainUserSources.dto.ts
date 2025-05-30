//*- coding = utf-8 -*-
//@Time : 2022-11-10 12:01
//@Author : 沉默小管
//@File : login.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ObtainUserSourcesDto{
  @ApiProperty({
    description: '来源地址',
    type:String,
  })
  @IsNotEmpty({ message: '来源地址不能为空' })
  webUrl:string;
}
