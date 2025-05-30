import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class MenuAddDto {
  @ApiProperty({
    description: 'pid',
    type:Number,
  })
  @IsNotEmpty({ message: 'pid不允许为空' })
  pid: number;

  @ApiProperty({
    description: '菜单类型',
    type:Number,
  })
  @IsNotEmpty({ message: '类型不允许为空' })
  menuType: number;

  @ApiProperty({
    description: '名称',
    type:String,
  })
  @IsString({message:"menuName必须为string类型"})
  @IsNotEmpty({ message: '名称不允许为空' })
  menuName: string;

  @ApiProperty({
    description: '菜单标签',
    type:String,
  })
  @IsString({message:"icon必须为string类型"})
  icon: string;

  @ApiProperty({
    description: '权限字符',
    type:String,
  })
  perms: string;

  @ApiProperty({
    description: '组件路径',
    type:String,
  })
  @IsString({message:"component必须为string类型"})
  component: string;

  @ApiProperty({
    description: '路由地址',
    type:String,
  })
  path: string;

  @ApiProperty({
    description: '是否可见',
    type:Number,
  })
  visible: number;

  @ApiProperty({
    description: '是否缓存',
    type:Number,
  })
  isCache: number;

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
