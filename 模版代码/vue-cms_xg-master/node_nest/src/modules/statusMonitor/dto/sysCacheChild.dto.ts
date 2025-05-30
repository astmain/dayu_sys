import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class SysCacheChildDto {
  @ApiProperty({
    description: '命名空间名',
    type:Number,
  })
  @IsNotEmpty({ message: '命名空间名不允许为空' })
  parentKeys: string;

}
