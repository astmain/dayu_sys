import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class ArtColumnAddDto {
  @ApiProperty({
    description: '文章栏目',
    type:String,
  })
  @IsNotEmpty({ message: '文章栏目不允许为空' })
  columnName: string;

  @ApiProperty({
    description: '文章栏目排序',
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
