import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class ImgAddDto {
  // @IsNotEmpty({ message: '图片名称不允许为空' })
  @ApiProperty({
    description: '图片名称',
    type:String,
  })
  imgName: string;

  @ApiProperty({
    description: '图片排序',
    type:String,
  })
  @Transform(({ value }) => {
    if(!value){
      return 1;
    }
    return value;
  })
  sort: number;


  @ApiProperty({
    description: '图片分类id',
    type:Number,
  })
  imgSortId: number;

  @ApiProperty({
    description: '图片url路径',
    type:String,
  })
  imgUrl: string;

}
