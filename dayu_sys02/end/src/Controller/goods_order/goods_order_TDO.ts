import {IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Length, Min, ValidateNested} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";

// 新增
class create {
    @ApiProperty({description: '价格', default: 0, type: Number, example: 0.1})
    @Min(0, {message: '价格-必须大于等于0',})
    price: number = 0;

    @ApiProperty({description: '订单商品详细信息', default: [], type: Array, example: []})
    @ValidateNested({each: true})
    @Type(() => Object) // 转换为对象类型
    @IsObject({each: true}) // 验证每个元素为对象
    details: object[] = [];


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

