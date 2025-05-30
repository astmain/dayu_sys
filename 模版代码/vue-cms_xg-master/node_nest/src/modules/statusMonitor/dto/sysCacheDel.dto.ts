import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class SysCacheDelDto {
  @ApiProperty({
    description: '阶段',
    type:String,
  })
  @IsNotEmpty({ message: '阶段不允许为空' })
  step: string;

  @ApiProperty({
    description: '缓存名称',
    type:String,
  })
  @IsNotEmpty({ message: '缓存名称不允许为空' })
  cacheName: string;

  @ApiProperty({
    description: '缓存键名',
    type:String,
  })
  @IsNotEmpty({ message: '缓存键名不允许为空' })
  cacheKeysName: string;
}
