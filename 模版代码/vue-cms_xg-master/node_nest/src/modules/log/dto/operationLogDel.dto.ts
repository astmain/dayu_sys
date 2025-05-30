import {IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class OperationLogDel {
  @ApiProperty({
    description: '操作id',
    type:String,
  })
  @IsNotEmpty({ message: 'id不允许为空' })
    id: string;
}
