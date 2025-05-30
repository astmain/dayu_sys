//*- coding = utf-8 -*-
//@Time : 2022-11-10 12:01
//@Author : 沉默小管
//@File : login.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class AccessTimeSlotDto{
  @ApiProperty({
    description: '时间段',
    type:String,
  })
  @IsNotEmpty({ message: '时间段' })
  dateRangeArr:string;
}