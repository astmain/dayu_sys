import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
export class expressage_delete {
    @ApiProperty({ description: 'id', type: Number, example: 0, })
    @IsNumber()
    id: number = 0;
}
