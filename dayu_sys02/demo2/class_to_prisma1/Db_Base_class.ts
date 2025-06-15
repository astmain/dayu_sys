import { IsString, IsNumber, IsOptional, IsNotEmpty, IsInt, Min, IsMobilePhone, IsIn } from 'class-validator';
import { ApiProperty, OmitType, PickType } from "@nestjs/swagger";
class Db_Base_class {
    @ApiProperty({ description: 'id', example: 1 })
    @IsInt({ message: "id:必须是正整数" })
    @Min(0, { message: 'id:必须是大于等于0' })
    id: number;

    @ApiProperty({ description: '姓名[必须是字符,不能未空]', example: '小许', })
    @IsString({ message: '姓名:必须是字符' })
    @IsNotEmpty({ message: '姓名:不能未空' })
    name: string;

    @ApiProperty({ description: '密码', example: '123456', })
    @IsString({ message: '密码:必须是字符' })
    @IsNotEmpty({ message: '密码:不能未空' })
    password: string;

    @ApiProperty({ description: '手机', example: '15160315110' })
    @IsString({ message: '手机:必须是字符' })
    @IsNotEmpty({ message: '手机:不能未空' })
    @IsMobilePhone('zh-CN', {}, { message: '手机-格式不正确' })
    tel: string;

    @ApiProperty({ description: '备注[必须是字符,不能未空]', example: '备注', })
    @IsString({ message: '备注:必须是字符' })
    remark: string;
}




console.log(`222---:`, Db_Base_class.name)



make_prisma_model(Db_Base_class)

function make_prisma_model(classInstance: typeof Db_Base_class): string {
    const className = classInstance.name;
    console.log(222, className)

    let aaa = Object.getOwnPropertyNames(classInstance.prototype)
    console.log(`222---:`, JSON.stringify(aaa, null, 2))


    const properties = Object.getOwnPropertyNames(classInstance.prototype)
        .filter(prop => prop !== 'constructor');

    let modelString = `model ${className} {\n`;

    // 添加 id 字段
    modelString += `  id        Int      @id @default(autoincrement())\n`;

    // 添加其他字段
    const instance = new classInstance();
    for (const prop of properties) {
        const type = typeof instance[prop];
        let prismaType = '';

        switch (type) {
            case 'string':
                prismaType = 'String';
                break;
            case 'number':
                prismaType = 'Int';
                break;
            case 'boolean':
                prismaType = 'Boolean';
                break;
            default:
                prismaType = 'String';
        }

        // 检查是否有 @IsOptional 装饰器
        const isOptional = Reflect.getMetadata('class-validator:optional', instance, prop);
        const isNotEmpty = Reflect.getMetadata('class-validator:not-empty', instance, prop);

        modelString += `  ${prop}     ${prismaType}${isOptional ? '?' : ''}\n`;
    }

    modelString += '}\n';
    console.log(111, modelString)
    return modelString;
}

// 导出函数
export { make_prisma_model };









