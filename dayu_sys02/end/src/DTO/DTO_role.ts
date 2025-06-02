import {IsArray, IsNotEmpty, IsString} from "class-validator";

export class DTO_role {

    role_id: number;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsString()
    @IsNotEmpty()
    remark: string;

    @IsArray()
    menus_chooseed: [];
}


