import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class DictDataTypeDto {

  @ApiProperty({
    description: '字典类型',
    type:String,
  })
  @IsNotEmpty({ message: '字典名称不允许为空' })
  dictType: string;

}
