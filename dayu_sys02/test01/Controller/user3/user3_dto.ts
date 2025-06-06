import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsString, IsOptional, IsNotEmpty, IsNumber, IsInt, Min} from 'class-validator';
import {PartialType, PickType} from '@nestjs/swagger';

export class user3_dto {
    @ApiProperty({description: '姓名[必须是字符,不能未空]', example: '小许',})
    @IsString({message: '姓名:必须是字符'})
    @IsNotEmpty({message: '姓名:不能未空'})
    id: string;

    @ApiProperty({description: '姓名[必须是字符,不能未空]', example: '小许',})
    @IsString({message: '姓名:必须是字符'})
    @IsNotEmpty({message: '姓名:不能未空'})
    name: string;

    @ApiProperty({description: '年龄', example: 18,})
    @IsInt({message: "年龄:必须是正整数"})
    @Min(0, {message: '年龄:必须是大于等于0'})
    age: string;

    @ApiProperty({description: 'The email of the user', example: 'john.doe@example.com',})
    @IsString({message: '邮箱:必须是字符'})
    @IsNotEmpty({message: '邮箱:不能未空'})
    email: string;

    @ApiProperty({description: '密码', example: 's3cret!',})
    @IsString()
    @IsNotEmpty()
    password: string;
}

// export class user_crreate extends PartialType(user) {
// }


export class create extends user3_dto {
}


export class find extends PickType(user3_dto, ['name', 'age']) {
}


export class del extends PickType(user3_dto, ['id', "name"]) {
}

//
