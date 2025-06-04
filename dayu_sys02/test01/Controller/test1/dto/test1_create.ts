import {IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class test1_create {
    @ApiProperty({description: '姓名', type: String, example: "小许"})
    @IsString()
    @IsNotEmpty()
    name: string;

    // @ApiProperty({description: '年龄', type: Number, example: 0})
    // @IsNumber()
    // @IsNotEmpty()
    // age: number;
}
