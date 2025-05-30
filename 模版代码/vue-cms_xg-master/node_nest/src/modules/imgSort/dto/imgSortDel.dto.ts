
import {IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ImgSortDelDto {
  @ApiProperty({
    description: '图片分类id',
    type:String,
  })
  @IsNotEmpty({ message: 'id不允许为空' })
  id: string;

}
