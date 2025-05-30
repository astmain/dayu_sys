//*- coding = utf-8 -*-
//@Time : 2022-11-15 19:57
//@Author : 沉默小管
//@File : menuList.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm


import { ApiProperty } from "@nestjs/swagger";

export class SendEmailDto {

  @ApiProperty({
    description: '接收方邮箱',
    type:String,
  })
  toEmail:string="";

}