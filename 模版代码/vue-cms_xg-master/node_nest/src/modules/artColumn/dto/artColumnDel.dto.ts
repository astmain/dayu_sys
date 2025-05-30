
import {IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ArtColumnDel {
  @ApiProperty({
    description: '文章栏目id',
    type:String,
  })
  @IsNotEmpty({ message: 'id不允许为空' })
  id: string;

}
