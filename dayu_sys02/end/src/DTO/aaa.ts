import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


class user_update {
    @ApiProperty({description: 'id', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    id: number = 0;

    @ApiProperty({description: '用户名', default: '', type: String})
    @IsOptional()
    @IsString()
    name: string = "";
}

class depart_update {
    @ApiProperty({description: 'id', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    id: number = 0;

    @ApiProperty({description: '部门名称', default: '', type: String})
    @IsOptional()
    @IsString()
    name: string = "";
}
export {
    user_update,
    depart_update
}







