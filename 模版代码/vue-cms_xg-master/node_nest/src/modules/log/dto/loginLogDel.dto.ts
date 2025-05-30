import {IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class LoginLogDel {
  @ApiProperty({
    description: '登陆日志id',
    type:String,
  })
  @IsNotEmpty({ message: 'id不允许为空' })
  id: string;
}
