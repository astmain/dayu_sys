import {IsArray, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class DTO_user_add {
    @ApiProperty({description: 'id', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    id: number = 0;

    @ApiProperty({description: '电话', default: '123456789123', type: String})
    @IsNotEmpty()
    @IsString()
    tel: string = "123456789123";


    @ApiProperty({description: '密码', default: '123456', type: String})
    @IsOptional()
    @IsString()
    password: string = '123456';

    @ApiProperty({description: '姓名', default: 'test1', type: String})
    @IsOptional()
    @IsString()
    username: string;

    @ApiProperty({description: '昵称', default: '', type: String})
    @IsOptional()
    @IsString()
    nickname: string = "";


    @ApiProperty({description: '邮箱', default: '', type: String})
    @IsOptional()
    @IsString()
    email: string = ""

    @ApiProperty({description: '头像', default: '', type: String})
    @IsOptional()
    @IsString()
    avatar: string = "";

    @ApiProperty({description: '更新时间', default: '', type: String})
    @IsOptional()
    @IsString()
    update_time: string = "";


    @ApiProperty({description: '创建时间', default: '', type: String})
    @IsOptional()
    @IsString()
    create_time: string = "";

    @ApiProperty({description: '备注', default: '', type: String})
    @IsOptional()
    @IsString()
    remark: string = "";


    @ApiProperty({description: '排序', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    order: number = 0;


    @ApiProperty({description: '在线', default: true, type: Boolean})
    @IsOptional()
    @IsBoolean()
    online: boolean = true;

    @ApiProperty({description: '逻辑删除', default: true, type: Boolean})
    @IsOptional()
    @IsBoolean()
    is_del: boolean = false;


// 非数据表字段===========================

    // @ApiProperty({description: '逻辑删除', default: true, type: Boolean})
    // @IsOptional()
    // @IsBoolean()
    // is_del: boolean = false;


}


