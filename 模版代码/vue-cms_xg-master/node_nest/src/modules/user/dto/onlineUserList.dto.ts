//*- coding = utf-8 -*-
//@Time : 2022-11-15 0:18
//@Author : 沉默小管
//@File : user.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import { ApiProperty } from "@nestjs/swagger";

export class OnlineUserListDto{
  //用户名称
  @ApiProperty({
    description: '用户名称',
    type:String,
  })
  nickName:string="";

  //一页显示条数
  @ApiProperty({
    description: '一页的数量',
    type:Number,
  })
  pageSize:number=999;

  //当前页码
  @ApiProperty({
    description: '当前页数',
    type:Number,
  })
  currentPage:number=1;
}