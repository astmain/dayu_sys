//*- coding = utf-8 -*-
//@Time : 2023-10-17 0:17
//@Author : 管茂良
//@File : base.dto.js
//@web  : www.php-china.com
//@Software: WebStorm

import { ApiProperty } from '@nestjs/swagger';

export class BaseDto {
  @ApiProperty({
    description: '浏览器',
    type:String,
  })
  operationSystem:string="";

  @ApiProperty({
    description: '浏览器',
    type:String,
  })
  browser:string="";

  @ApiProperty({
    description: '浏览器',
    type:String,
  })
  isPcOrIphone:string="";

}