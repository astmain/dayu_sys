//*- coding = utf-8 -*-
//@Time : 2022-11-10 12:01
//@Author : 沉默小管
//@File : login.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from '@/modules/common/dto/base.dto';

export class LoginDto extends BaseDto{
  @ApiProperty({
    description: '账号',
    type:String,
  })
  @IsNotEmpty({ message: '用户不能为空' })
  username:string;

  @ApiProperty({
    description: '密码',
    type:String,
  })
  @IsNotEmpty({ message: '密码不能为空' })
  password:string;

  @ApiProperty({
    description: '用户类型',
    type:Number,
  })
  @IsNotEmpty({ message: '用户类型不能为空' })
  userType:number;

}
