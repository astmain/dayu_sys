import {
    IsString,
    IsNumber,
    IsOptional,
    IsNotEmpty,
    IsInt,
    Min,
    IsMobilePhone,
    IsIn,
} from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
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
    };
}

class Db_Base_class {
    @ApiProperty({ description: 'id', example: 1 })
    @IsInt({ message: 'id:必须是正整数' })
    @Min(0, { message: 'id:必须是大于等于0' })
    id: number;

    @Column({ type: 'string!number' })
    @ApiProperty({ description: '姓名[必须是字符,不能未空]', example: '小许' })
    @IsString({ message: '姓名:必须是字符' })
    @IsNotEmpty({ message: '姓名:不能未空' })
    name: string;

    @Column({ type: 'string!number' })
    @ApiProperty({ description: '姓名[必须是字符,不能未空]', example: '小许' })
    @IsString({ message: '姓名:必须是字符' })
    @IsNotEmpty({ message: '姓名:不能未空' })
    password: string;
}

// 得到Db_Base_class的所有字段,id,name,封转一个函数

function getClassFields<T extends new (...args: any[]) => any>(
    target: T,
): string[] {
    return Object.keys(new target());
}

// 使用示例
const fields = getClassFields(Db_Base_class);
console.log(fields); // 输出: ['id', 'name']

// 获取被@Column装饰器装饰的属性
function getColumnDecoratedFields<T extends new (...args: any[]) => any>(target: T,): { propertyName: string; type: string }[] {
    const instance = new target();
    const properties = Object.keys(instance);
    const decoratedFields: { propertyName: string; type: string }[] = [];

    for (const property of properties) {
        const type = Reflect.getMetadata('column:type', target.prototype, property);
        if (type) {
            decoratedFields.push({
                propertyName: property,
                type: type
            });
        }
    }

    return decoratedFields;
}

// 使用示例
const columnFields = getColumnDecoratedFields(Db_Base_class);
console.log('被@Column装饰的属性:', columnFields);




//打印Db_Base_class 被@Column装饰的属性