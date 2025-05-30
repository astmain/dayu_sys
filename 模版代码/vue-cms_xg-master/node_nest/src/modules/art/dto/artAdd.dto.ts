import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class ArtAddDto {
  @ApiProperty({
    description: '文章名称',
    type:String,
    required: true,
  })
  @IsNotEmpty({ message: '文章名称不允许为空' })
  @IsString({ message: 'artName必须为String类型'})
  artName: string;

  @ApiProperty({
    description: '文章内容',
    type:String,
    required: true,
  })
  @IsString({message:"artContent必须为String类型"})
  @IsNotEmpty({ message: '文章内容不允许为空' })
  artContent: string;

  @ApiProperty({
    description: '文章内容id',
    type:String,
    required: false,
  })
  artContentId: string;

  @ApiProperty({
    description: '文章栏目id',
    type:Number,
    required: true,
  })
  artColumnId: number;

  @ApiProperty({
    description: '文章分类id',
    type:Number,
    required: true,
  })
  artSortId: number;

  @ApiProperty({
    description: '文章关键key',
    type:String,
    required: false,
  })
  @IsString({message:"artKey必须为String类型"})
  artKey: string;

  @ApiProperty({
    description: '文章描述',
    type:String,
    required: true,
  })
  artDesc: string;

  @ApiProperty({
    description: '文章原始路径',
    type:String,
    required: false,
  })
  @IsString({message:"originalUrl必须为String类型"})
  originalUrl: string;

  //图片id
  @ApiProperty({
    description: '文章图片id',
    type:Number,
    required: true,
  })
  picId: number;

  @ApiProperty({
    description: '文章排序',
    type:Number,
    required: false,
  })
  @Transform(({ value }) => {
        if(!value){
            return 0;
        }
        return value;
    })
    sort: number

}
