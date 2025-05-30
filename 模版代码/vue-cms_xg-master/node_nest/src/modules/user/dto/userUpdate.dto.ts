/*- coding = utf-8 -*-
@Time : 2023/2/6 10:34
@Author : 沉默小管
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {IsEmpty, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UserUpdateDto {
  @ApiProperty({
    description: '用户id',
    type:Number,
  })
  @IsNotEmpty({ message: 'id不允许为空' })
  id: number;

  @ApiProperty({
    description: '原始密码',
    type:String,
  })
  @IsNotEmpty({message:"密码不能为空"})
  originalPwd:string

  @ApiProperty({
    description: '账号',
    type:String,
  })
  @IsNotEmpty({message:"用户名不能为空"})
  @IsString({message:"username必须为String类型"})
  username:string

  @ApiProperty({
    description: '密码',
    type:String,
  })
  @IsString({message:"password必须为String类型"})
  password:string

  @ApiProperty({
    description: '用户名称',
    type:String,
  })
  @IsString({message:"nickName必须为String类型"})
  @Length(2,20,{
    message:"名称长度在2到20之间"
  })
  nickName:string

  @ApiProperty({
    description: '用户头像id',
    type:Number,
  })
  headImgId:number

  @ApiProperty({
    description: 'email',
    type:String,
  })
  email:string

  @ApiProperty({
    description: '手机号',
    type:String,
  })
  phone:string

  @ApiProperty({
    description: '性别',
    type:Number,
  })
  sex:number

  @ApiProperty({
    description: '角色id',
    type:Number,
  })
  @IsInt({message:"roleId必须为int类型"})
  roleId:number

  @ApiProperty({
    description: '排序',
    type:Number,
  })
  sort:number
}
