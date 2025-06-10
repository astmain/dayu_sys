import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNumber, IsOptional, IsNotEmpty, IsInt, Min, IsMobilePhone, IsIn } from 'class-validator';
import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
@Entity()
export class tb_test1 {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id', example: 18 })
  @IsInt({ message: "id:必须是正整数" })
  @Min(0, { message: 'id:必须是大于等于0' })
  id: number;

  @Column()
  @ApiProperty({ description: '姓名', example: '张三' })
  @IsString({ message: '姓名:必须是字符' })
  @IsNotEmpty({ message: '姓名:不能未空' })
  name: string;

  @Column()
  @ApiProperty({ description: '年龄', example: 18 })
  @IsInt({ message: "年龄:必须是正整数" })
  @Min(0, { message: '年龄:必须是大于等于0' })
  age: number;
} 




export class tb_test1_create extends OmitType(tb_test1, ['id']) {}
export class tb_test1_del extends PickType(tb_test1, ['id']) {}
export class tb_test1_update extends tb_test1 {}
export class tb_test1_find extends PickType(tb_test1, ['name']) {}