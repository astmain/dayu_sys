import { IsString, IsNumber, IsOptional, IsNotEmpty, IsInt, Min, IsMobilePhone, IsIn } from 'class-validator';
import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
import 'reflect-metadata';
// 定义装饰器接口
interface ColumnOptions {
    type: string;
}


// 创建Column装饰器
function Column(options: ColumnOptions) {
    return function (target: any, propertyKey: string) {
        // 存储装饰器元数据
        Reflect.defineMetadata('column:type', options.type, target, propertyKey);
        console.log(111, target, propertyKey)
    };
}
class Db_Base_class {
    @ApiProperty({ description: 'id', example: 1 })
    @IsInt({ message: "id:必须是正整数" })
    @Min(0, { message: 'id:必须是大于等于0' })
    id: number;

    @ApiProperty({ description: '姓名[必须是字符,不能未空]', example: '小许', })
    @IsString({ message: '姓名:必须是字符' })
    @IsNotEmpty({ message: '姓名:不能未空' })
    name: string;


}


// 得到Db_Base_class的所有字段,id,name,封转一个函数


function getClassFields<T extends new (...args: any[]) => any>(target: T): string[] {
    return Object.keys(new target());
}

// 使用示例
const fields = getClassFields(Db_Base_class);
console.log(fields); // 输出: ['id', 'name']

export { Db_Base_class, getClassFields };


//定义一个装饰器名字叫做Column({type:"string!number"})  装饰在Db_Base_class的name字段上
