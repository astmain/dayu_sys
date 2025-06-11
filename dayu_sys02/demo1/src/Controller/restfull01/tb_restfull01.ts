import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNumber, IsOptional, IsNotEmpty, IsInt, Min, IsMobilePhone, IsIn } from 'class-validator';
import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
@Entity()
export class tb_restfull01 {
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




export class create_tb_restfull01 extends OmitType(tb_restfull01, ['id']) { }
export class del_tb_restfull01 extends PickType(tb_restfull01, ['id']) { }
export class update_tb_restfull01 extends tb_restfull01 { }
export class find_tb_restfull01 extends PickType(tb_restfull01, ['name']) { }