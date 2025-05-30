
import {IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ArtDelDto {
  @ApiProperty({
    description: '文章id',
    type:String,
    required:true,
  })
  @IsNotEmpty({ message: 'id不允许为空' })
  id: string;

}
