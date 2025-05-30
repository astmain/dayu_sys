import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class ArtSortAddDto {

  @ApiProperty({
    description: '文章分类名',
    type:String,
  })
  @IsNotEmpty({ message: '类型名称不允许为空' })
  artSortName: string;

  @ApiProperty({
    description: '文章分类排序',
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
