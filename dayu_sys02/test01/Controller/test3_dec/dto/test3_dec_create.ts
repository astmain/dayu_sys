import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
export class test3_dec_create {
    @ApiProperty({ description: '默认名称', type: String, example: "默认名称" })
    @IsString()
    @IsNotEmpty()
    name: string = "111";
}
