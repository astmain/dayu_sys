import {IsArray, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsString, ArrayMinSize} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {DTO_user} from "./DTO_user";
import {PartialType} from '@nestjs/swagger';


// export class DTO_user_create extends PartialType(DTO_user) {
export class DTO_user_create {
    @ApiProperty({description: '职位uuid', default: [""], type: Array<string>})
    @IsOptional()
    @IsNumber()
    position_uuid_list:  Array<string> = [""];


    @ApiProperty({description: '用户名', default: "张三", type: String})
    @IsNotEmpty()
    @IsString()
    username: string = "张三";


    @ApiProperty({description: 'tel', default: "111", type: String})
    @IsNotEmpty()
    @IsString()
    tel: string = "111";


}


