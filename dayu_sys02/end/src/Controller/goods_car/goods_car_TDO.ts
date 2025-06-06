import {IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

// 新增
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

// 更新
class update extends create {
    @ApiProperty({description: '购物车商品id', default: 0, type: Number})
    @IsNumber()
    id: number = 0;
}

//删除
class del {
    @ApiProperty({description: '购物车商品id', default: 0, type: Number})
    @IsNumber()
    id: number = 0;
}

//查询
class find {
    // @ApiProperty({description: 'id', default: 0, type: Number})
    // @IsOptional()
    // @IsNumber()
    // id: number = 0;
}

//购物车计算
class goods_car_compute {
    @IsArray({message: '商品ids-必须是数组',})
    @IsNumber({}, {each: true, message: '商品ids-的每一项必须是数字类型',})
    @Min(1, {each: true, message: '商品ids-的每一项必须大于等于 1',}) // 每个数字 >= 0
    @IsInt({message: '数量必须是整数'})
    ids: number[];
}


export {
    create,
    del,
    update,
    find,
    // 其他
    goods_car_compute,
}







