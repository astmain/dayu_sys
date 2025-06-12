import { ApiProperty } from "@nestjs/swagger";


import { IsInt, IsString, IsNotEmpty, Min } from 'class-validator';


export class tb_gen {

    @ApiProperty({ description: '数据库表的唯一id1111111', example: 111 })
    @IsInt({ message: "id:必须是正整数" })
    @Min(0, { message: 'id:必须是大于等于0' })
    id: number;


    @ApiProperty({ description: '姓名[必须是字符,不能未空]', example: '小许', })
    @IsString({ message: '姓名:必须是字符' })
    @IsNotEmpty({ message: '姓名:不能未空' })
    name: string;
}

// zod-prisma  怎么使用 ,我想根据类tb_gen 表生成一个schema.prisma 文件








