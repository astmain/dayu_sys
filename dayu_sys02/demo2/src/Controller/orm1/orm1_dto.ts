
import { IsString, IsNumber, IsOptional, IsNotEmpty, IsInt, Min, IsMobilePhone, IsIn } from 'class-validator';
import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class tb_orm1 {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: '数据库表的唯一id1111111', example: 111 })
    @IsInt({ message: "id:必须是正整数" })
    @Min(0, { message: 'id:必须是大于等于0' })
    id: number;

    @Column()
    @ApiProperty({ description: '姓名[必须是字符,不能未空]', example: '小许', })
    @IsString({ message: '姓名:必须是字符' })
    @IsNotEmpty({ message: '姓名:不能未空' })
    name: string;


    @Column()
    @ApiProperty({ description: '年龄', example: 18 })
    @IsInt({ message: "年龄:必须是正整数" })
    @Min(0, { message: '年龄:必须是大于等于0' })
    age: number;

    @Column()
    @ApiProperty({ description: '密码', example: '123456', })
    @IsString({ message: '密码:必须是字符' })
    @IsNotEmpty({ message: '密码:不能未空' })
    password: string;

    @Column()
    @ApiProperty({ description: '手机', example: '15160315110' })
    @IsString({ message: '手机:必须是字符' })
    @IsNotEmpty({ message: '手机:不能未空' })
    @IsMobilePhone('zh-CN', {}, { message: '手机-格式不正确' })
    tel: string;

    @Column()
    @ApiProperty({ description: '邮箱', example: '1311192345.com', })
    @IsString({ message: '邮箱:必须是字符' })
    @IsNotEmpty({ message: '邮箱:不能未空' })
    email: string;

    @Column()
    @ApiProperty({ description: '分类', example: '个人' })
    @IsString()
    @IsNotEmpty()
    @IsIn(['个人', '企业'], { message: "分类-['个人', '企业']" })
    kind: string;
}


// export class orm1_create extends OmitType(tb_orm1, ['id']) { }
export class orm1_create extends PickType(tb_orm1, ['id', "name"]) { }
export class orm1_del extends PickType(tb_orm1, ['id']) { }
export class orm1_update extends tb_orm1 { }
export class orm1_find extends PickType(tb_orm1, ['name']) { }

