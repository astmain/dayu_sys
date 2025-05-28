import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


class create {
    @ApiProperty({description: '商品名称', default: '', type: String})
    @Length(0, 100, {message: '商品名称-必须在$constraint1到$constraint2个字符之间',})
    @IsString()
    name: string = "";

    @ApiProperty({description: '商品图片url', default: '', type: String})
    @Length(0, 9999, {message: '商品图片url-必须在$constraint1到$constraint2个字符之间',})
    @IsString()
    img_url: string = "";

    // @ApiProperty({description: '价格', default: 0, type: Number})
    // @Min(0, {message: '价格-必须大于等于0',})
    // price: number = 0;

    @ApiProperty({description: '购物车数量', default: 0, type: Number})
    @Min(0, {message: '购物车数量-必须大于等于0',})
    @IsNumber()
    num: number = 0;
}

class update extends create {
    @ApiProperty({description: '购物车商品id', default: 0, type: Number})
    @IsNumber()
    id: number = 0;
}

class del {
    @ApiProperty({description: '购物车商品id', default: 0, type: Number})
    @IsNumber()
    id: number = 0;
}

class find {
    // @ApiProperty({description: 'id', default: 0, type: Number})
    // @IsOptional()
    // @IsNumber()
    // id: number = 0;

}

export {
    create,
    del,
    update,
    find
}







