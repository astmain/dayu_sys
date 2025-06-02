import {IsArray, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {DTO_user} from "./DTO_user";
import {PartialType} from '@nestjs/swagger';


export class DTO_user_update extends PartialType(DTO_user) {

    @ApiProperty({required: true, description: 'id', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    id: number = 0;

    @ApiProperty({required: false, description: '电话', default: '123456789123', type: String})
    @IsOptional()
    @IsString()
    tel: string = "123456789123";


    @ApiProperty({required: false, description: '姓名', default: 'test1', type: String})
    @IsOptional()
    @IsString()
    username: string;


    @ApiProperty({required: false, description: '部门关系', default: [3], type: Array<number>})
    @IsNotEmpty()
    @IsOptional()
    @IsArray()
    depart_ids: Array<number> = [3];

}


