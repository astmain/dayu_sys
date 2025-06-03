import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min} from "class-validator";

export class test2_create {
    @ApiProperty({description: '默认名称', type: String, example: "默认名称", required: true})
    @IsString({message: 'name-必须是字符串'})
    @IsNotEmpty({message: 'name-不能未空'})
    name: string;
}
