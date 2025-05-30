/*- coding = utf-8 -*-
@Time : 2023/2/6 10:34
@Author : 沉默小管
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {IsNotEmpty, IsOptional} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RoleDelDto {
    @ApiProperty({
        description: '角色id',
        type:String,
    })
    @IsNotEmpty({ message: 'id不允许为空' })
    id: string;
}
