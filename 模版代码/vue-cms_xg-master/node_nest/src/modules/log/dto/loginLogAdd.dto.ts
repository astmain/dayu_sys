import { IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from '@/modules/common/dto/base.dto';

export class LoginLogAddDto extends BaseDto{
  @ApiProperty({
    description: '登陆id',
    type:String,
  })
  @IsNotEmpty({ message: 'ip不允许为空' })
  ip: string;

  @ApiProperty({
    description: '用户id',
    type:Number,
  })
  uid: string|number;

  @ApiProperty({
    description: '账号',
    type:String,
  })
  @IsEmpty()
  username: string = "";

  @ApiProperty({
    description: '密码',
    type:String,
  })
  @IsEmpty()
  password: string = "";

  @ApiProperty({
    description: '状态',
    type:Number,
  })
  status: number;

}
