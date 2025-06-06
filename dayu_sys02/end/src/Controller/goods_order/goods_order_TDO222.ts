import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

// 新增
class create {
    @ApiProperty({description: '商品名称', type: String, default: '', example: '商品名称111example',})
    @Length(0, 100, {message: '商品名称-必须在$constraint1到$constraint2个字符之间',})
    @IsNotEmpty({message: '商品名称-不能为空'})
    @IsString()
    name: string = "";

    @ApiProperty({description: '商品图片url', default: '', type: String, example: 'www.dayu?img_url=png.png'})
    @Length(0, 9999, {message: '商品图片url-必须在$constraint1到$constraint2个字符之间',})
    @IsString()
    img_url: string = "";

    @ApiProperty({description: '价格', default: 0, type: Number, example: "0"})
    @Min(0, {message: '价格-必须大于等于0',})
    price: number = 0;

    // @ApiProperty({description: '订单数量', default: 0, type: Number, example: "0"})
    // @Min(0, {message: '订单数量-必须大于等于0',})
    // @IsNumber()
    // num: number = 0;


    // @ApiProperty({description: '订单状态', default: 0, type: Number, example: '0待支付,1取消订单,3支付完成,4待发货,5待收货,6完成'})
    // @Min(0, {message: '0待支付,1取消订单,3支付完成,4待发货,5待收货,6完成',})
    // @IsNumber()
    // status: number = 0;
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

export {
    create,
    del,
    update,
    find
}

