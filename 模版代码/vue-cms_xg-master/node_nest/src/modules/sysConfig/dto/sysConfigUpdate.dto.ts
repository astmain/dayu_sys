
import {IsNotEmpty} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class SysConfigUpdateDto {
    @ApiProperty({
        description: 'key',
        type:String,
    })
    @IsNotEmpty({ message: 'key不允许为空' })
    key: string;

    @ApiProperty({
        description: 'value',
        type:String,
    })
    @IsNotEmpty({ message: 'value不允许为空' })
    value:string;

}
