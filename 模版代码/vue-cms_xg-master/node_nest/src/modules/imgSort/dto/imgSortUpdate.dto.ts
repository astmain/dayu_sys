
import {IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class ImgSortUpdateDto {
  @ApiProperty({
    description: '图片分类id',
    type:String,
  })
  @IsNotEmpty({ message: 'id不允许为空' })
  id: number;

  //图片名称
  @ApiProperty({
    description: '图片分类名称',
    type:String,
  })
  @IsNotEmpty({ message: '图片分类名为空' })
  sortName:string;

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
