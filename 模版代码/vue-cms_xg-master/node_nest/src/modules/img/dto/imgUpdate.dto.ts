
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class ImgUpdateDto {
  @ApiProperty({
    description: '图片id',
    type:Number,
  })
  @IsNotEmpty({ message: 'id不允许为空' })
  id: number;

  @ApiProperty({
    description: '图片名称',
    type:String,
  })
  @IsNotEmpty({ message: '菜单栏不允许为空' })
  imgName: string;

  @ApiProperty({
    description: '图片分类id',
    type:Number,
  })
  imgSortId: number;

  @ApiProperty({
    description: '是否上传',
    type:Number,
  })
  isUpload: number;

  @ApiProperty({
    description: '排序',
    type:Number,
  })
  @Transform(({ value }) => {
        if(!value){
            return 0;
        }
        return value;
    })
    sort: number

}
