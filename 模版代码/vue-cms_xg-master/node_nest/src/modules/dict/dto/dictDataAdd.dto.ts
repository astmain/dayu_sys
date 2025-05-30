import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class DictDataAddDto {

  @ApiProperty({
    description: '字典id',
    type:String,
  })
  @IsNotEmpty({ message: '字典id' })
  dictId: string|number;

  @ApiProperty({
    description: '字典标签',
    type:String,
  })
  @IsNotEmpty({ message: '字典名称不允许为空' })
  dictLabel: string;

  @ApiProperty({
    description: '数据键值',
    type:String,
  })
  dictValue: string;

  @ApiProperty({
    description: '字典数据状态',
    type:Number,
  })
  status: number;

  @ApiProperty({
    description: '备注',
    type:String,
  })
  remark: string;
}
