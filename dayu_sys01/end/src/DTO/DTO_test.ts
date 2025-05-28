import {IsNotEmpty, IsString,IsNumber} from 'class-validator'
import {ApiProperty} from "@nestjs/swagger";

export class DTO_test {
    @ApiProperty({required: true, description: '电话', default: "111", type: String})
    @IsNotEmpty()//验证是否为空
    @IsString() //是否为字符串
    tel: string;

    @ApiProperty({required: true, description: '密码', default: "123456", type: Number})
    @IsNotEmpty()//验证是否为空
    @IsNumber() //是否为字符串
    password: number;
}