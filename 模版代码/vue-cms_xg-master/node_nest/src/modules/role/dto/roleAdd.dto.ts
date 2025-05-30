import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleAddDto {
    //角色名称
  @ApiProperty({
    description: '角色名称',
    type:String,
  })
    @IsNotEmpty({message:"角色名称不能为空"})
    @IsString({ message: '角色名称必须为字符串' })
    roleName:string;
    //权限字符
  @ApiProperty({
    description: '权限字符',
    type:String,
  })
    @IsString({ message: '权限字符必须为字符串' })
    perms:string;

  @ApiProperty({
    description: '状态',
    type:Number,
  })
    status:number;

  @ApiProperty({
    description: '菜单id',
    type:String,
  })
    menuIds:string;

  @ApiProperty({
    description: '备注',
    type:String,
  })
    remark:string;

  @ApiProperty({
    description: '排序',
    type:Number,
  })
    sort:number;
}
