
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class DictDelDto {
  @ApiProperty({
    description: '字典id',
    type:Number,
  })
  @IsNotEmpty({ message: 'id不允许为空' })
  id: number;
}
