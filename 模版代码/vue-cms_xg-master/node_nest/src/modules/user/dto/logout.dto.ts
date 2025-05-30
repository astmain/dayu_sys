//*- coding = utf-8 -*-
//@Time : 2022-11-16 22:44
//@Author : 沉默小管
//@File : logout.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm


//退出登录
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class LogoutDto{
  @ApiProperty({
    description: 'token',
    type:String,
  })
  @IsNotEmpty({ message: 'token不能为空' })
  token:string;

}