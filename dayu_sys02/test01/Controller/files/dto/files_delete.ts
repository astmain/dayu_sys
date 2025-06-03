import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min} from "class-validator";

export class files_delete {
    // @ApiProperty({description: 'id', type: Number, example: 0,})
    // @IsNumber()
    // id: number = 0;
    //
    //
    // // @ApiProperty({ description: '邮箱', type: String, example: "啊啊", })
    // // @IsString()
    // // email: string;
    //
    // @ApiPropertyOptional({
    //     description: '用户简介（可选）',
    //     example: '喜欢NestJS',
    // })
    // @IsOptional()
    // @IsString()
    // email: string;

    @ApiProperty({ example: 'zhangsan' })
    name: string;

    @ApiProperty({ example: '123456' })
    password: string;


}
