//*- coding = utf-8 -*-
//@Time : 2022-11-15 19:57
//@Author : 沉默小管
//@File : menuList.dto.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import { ApiProperty } from "@nestjs/swagger";

export class NotifyListDto {
  //通知人名称
  @ApiProperty({
    description: '公告标题',
    type:String,
  })
  title:string="";

  //发送通知人uid
  @ApiProperty({
    description: '消息通知接收者名称',
    type:String,
  })
  notifyName:string="";

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