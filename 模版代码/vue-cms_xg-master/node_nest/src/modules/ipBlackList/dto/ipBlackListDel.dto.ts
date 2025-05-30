
import {IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class IpBlackListDelDto {
  @ApiProperty({
    description: '文章分类id',
    type:String,
  })
  @IsNotEmpty({ message: 'id不允许为空' })
  id: string;

}
