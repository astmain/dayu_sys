import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class ArtUpdateDto {
  @ApiProperty({
    description: '文章id',
    type:Number,
  })
  @IsNotEmpty({ message: 'id不允许为空' })
  id: number;

  @ApiProperty({
    description: '文章名称',
    type:String,
  })
  @IsString({ message: 'artName必须为String类型'})
  @IsNotEmpty({ message: '文章名称不允许为空' })
  artName: string;

  @ApiProperty({
    description: '文章内容',
    type:String,
  })
  @IsString({message:"artContent必须为String类型"})
  @IsNotEmpty({ message: '文章内容不允许为空' })
  artContent: string;

  @ApiProperty({
    description: '文章内容id',
    type:String,
  })
  artContentId: string;

  @ApiProperty({
    description: '文章栏目id',
    type:Number,
  })
  artColumnId: number;

  @ApiProperty({
    description: '文章分类id',
    type:Number,
  })
  artSortId: number;

  @ApiProperty({
    description: '文章关键key',
    type:String,
  })
  @Transform(({ value }) => {
    if(!value){
      return "";
    }
    return value;
  })
  @IsString({message:"artKey必须为String类型"})
  artKey: string;

  @ApiProperty({
    description: '文章描述',
    type:Number,
  })
  artDesc: number;

  @ApiProperty({
    description: '文章原始路径',
    type:String,
  })
  @Transform(({ value }) => {
    if(!value){
      return "";
    }
    return value;
  })
  @IsString({message:"originalUrl必须为String类型"})
  originalUrl: string;

  //图片id
  @ApiProperty({
    description: '文章图片id',
    type:Number,
  })
  picId: number;

  @ApiProperty({
    description: '文章排序',
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
