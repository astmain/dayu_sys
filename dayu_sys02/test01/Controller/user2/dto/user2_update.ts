
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class user2_update {
    @ApiProperty({ description: '默认名称', type: String, example: "默认名称" })
    @IsString()
    @IsNotEmpty()
    name: string = "111";
}
