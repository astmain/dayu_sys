import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class DictAddDto {

  @ApiProperty({
    description: '字典名称',
    type:String,
  })
  @IsNotEmpty({ message: '字典名称不允许为空' })
  dictName: string;

  @ApiProperty({
    description: '字典类型',
    type:String,
  })
  dictType: string;

  @ApiProperty({
    description: '字典状态',
    type:Number,
  })
  status: number;

  @ApiProperty({
    description: '备注',
    type:String,
  })
  remark: string;
}
