import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


class create {
    @ApiProperty({description: 'id', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    id: number = 0;

    @ApiProperty({description: '用户名', default: '', type: String})
    @IsOptional()
    @IsString()
    @Length(2, 20, {message: '用户名长度必须在$constraint1到$constraint2个字符之间',})
    name: string = "";
}

class update {
    @ApiProperty({description: 'id', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    id: number = 0;

    @ApiProperty({description: '用户名', default: '', type: String})
    @IsOptional()
    @IsString()
    @Length(2, 20, {message: '用户名长度必须在$constraint1到$constraint2个字符之间',})
    name: string = "";
}

class del {
    @ApiProperty({description: 'id', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    id: number = 0;

}

class find {
    @ApiProperty({description: 'id', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    id: number = 0;

}

export {
    create,
    del,
    update,
    find
}







