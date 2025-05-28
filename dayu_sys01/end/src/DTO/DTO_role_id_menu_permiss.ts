import {IsArray, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsString, ArrayMinSize} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {DTO_user} from "./DTO_user";
import {PartialType} from '@nestjs/swagger';


export class DTO_role_id_menu_permiss extends PartialType(DTO_user) {
    @ApiProperty({description: '部门id', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    depart_id: number = 0;


    @ApiProperty({description: '角色名称', default: "职员", type: String})
    @IsNotEmpty()
    @IsString()
    name: string = "职员";


    @ApiProperty({description: '菜单权限数组', default: 0, type: Array})
    @IsArray()
    // @IsString({ each: true }) // 对数组里的每个元素进行验证
    // @ArrayMinSize(1) // 数组至少要有一个元素
    tree_data: any[];

}


