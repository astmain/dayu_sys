import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class DTO_depart {
    @ApiProperty({description: 'id', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    id: number = 0;

    @ApiProperty({description: '部门', default: '', type: String})
    @IsOptional()
    @IsString()
    depart: string = "";


    @ApiProperty({description: '部门id', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    depart_id: number;

    @ApiProperty({description: '部门父级id', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    parent_id: number = 0;
}


