
import {IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class DictDataDelDto {
  @ApiProperty({
    description: '字典id',
    type:String,
  })
  @IsNotEmpty({ message: 'id不允许为空' })
  id: string;

}
