import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class SysCacheContentDto {
  @ApiProperty({
    description: '键名',
    type:String,
  })
  @IsNotEmpty({ message: '键名不允许为空' })
  keysName: string;

  @ApiProperty({
    description: '命名空间',
    type:String,
  })
  @IsNotEmpty({ message: '命名空间名不允许为空' })
  parentKeys: string;

}
