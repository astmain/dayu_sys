//*- coding = utf-8 -*-
//@Time : 2022-11-15 19:57
//@Author : 沉默小管
//@File : menuList.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm


import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from '@/modules/common/dto/base.dto';

export class SysConfigListDto extends BaseDto{
  //系统配置
  @ApiProperty({
    description: '系统配置',
    type:String,
  })
  key:string="";

  @ApiProperty({
    description: '用户id',
    type:Number,
  })
  uid:number;
}