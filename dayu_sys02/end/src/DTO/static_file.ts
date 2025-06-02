import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString} from "class-validator";

class user_update {
    @ApiProperty({description: '用户id', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    id: number = 0;

    @ApiProperty({description: '用户名', default: '', type: String})
    @IsOptional()
    @IsString()
    name: string = "";
}