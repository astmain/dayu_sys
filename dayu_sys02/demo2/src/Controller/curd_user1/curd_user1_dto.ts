
import { IsString, IsNumber, IsOptional, IsNotEmpty, IsInt, Min, IsMobilePhone, IsIn } from 'class-validator';
import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
class Base {
    @ApiProperty({ description: 'id', example: 1 })
    @IsInt({ message: "id:必须是正整数" })
    @Min(0, { message: 'id:必须是大于等于0' })
    id: number;

    @ApiProperty({ description: '姓名[必须是字符,不能未空]', example: '小许', })
    @IsString({ message: '姓名:必须是字符' })
    @IsNotEmpty({ message: '姓名:不能未空' })
    name: string;



    @ApiProperty({ description: '密码', example: '123456', })
    @IsString({ message: '密码:必须是字符' })
    @IsNotEmpty({ message: '密码:不能未空' })
    password: string;

    @ApiProperty({ description: '手机', example: '15160315110' })
    @IsString({ message: '手机:必须是字符' })
    @IsNotEmpty({ message: '手机:不能未空' })
    @IsMobilePhone('zh-CN', {}, { message: '手机-格式不正确' })
    tel: string;


    @ApiProperty({ description: '备注[必须是字符,不能未空]', example: '备注', })
    @IsString({ message: '备注:必须是字符' })
    remark: string;
}


export class create_curd_user1 extends OmitType(Base, ['id']) { }
export class del_curd_user1 extends PickType(Base, ['id']) { }
export class update_curd_user1 extends Base { }
export class find_curd_user1 extends PickType(Base, ['name']) { }
export class save_curd_user1 extends Base {
    @ApiProperty({ description: 'id', example: 1, required: false })
    @IsInt({ message: "id:必须是正整数" })
    @Min(0, { message: 'id:必须是大于等于0' })
    @IsOptional()
    // @ts-ignore
    declare id?: number;
}

