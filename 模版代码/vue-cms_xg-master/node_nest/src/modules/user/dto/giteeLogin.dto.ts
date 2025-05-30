//*- coding = utf-8 -*-
//@Time : 2022-11-10 12:01
//@Author : 沉默小管
//@File : login.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { userTypeEnum } from "@/common/enum";
import { BaseDto } from '@/modules/common/dto/base.dto';

export class GiteeLoginDto extends BaseDto{
  @ApiProperty({
    description: 'gitee账号的code',
    type:String,
  })
  @IsNotEmpty({ message: 'code不能为空' })
  code:string;

  @ApiProperty({
    description: '用户id',
    type:String,
  })
  uid:string|number;

  @ApiProperty({
    description: '用户登录令牌',
    type:String,
  })
  token:string|number;
}
