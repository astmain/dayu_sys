import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class test1_delete {
    @ApiProperty({ description: 'id', type: Number, example: 0, })
    @IsNumber()
    id: number = 0;
}
