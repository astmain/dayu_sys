import {IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class ImgSortAddDto {
  @ApiProperty({
    description: '图片分类名称',
    type:String,
  })
  @IsNotEmpty({ message: '图片分类为空' })
  sortName: string;

  @ApiProperty({
    description: '图片分类排序',
    type:Number,
  })
  @IsOptional()
  @Transform(({ value }) => {
        if(!value){
            return 0;
        }
        return value;
    })
    sort: number
}
