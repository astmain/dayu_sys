
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class DictDataUpdateDto {
  @ApiProperty({
    description: '字典数据id',
    type:Number,
  })
  @IsNotEmpty({ message: 'id不允许为空' })
  id: number;

  @ApiProperty({
    description: '字典id',
    type:Number,
  })
  @IsNotEmpty({ message: '字典id不允许为空' })
  dictId: number;

  @ApiProperty({
    description: '字典名称',
    type:String,
  })
  @IsNotEmpty({ message: '字典名称不允许为空' })
  dictName: string;

  @ApiProperty({
    description: '数据键值',
    type:String,
  })
  dictValue: string;

  @ApiProperty({
    description: '状态',
    type:String,
  })
  status: number;

  @ApiProperty({
    description: '备注',
    type:String,
  })
  remark: string;

}
