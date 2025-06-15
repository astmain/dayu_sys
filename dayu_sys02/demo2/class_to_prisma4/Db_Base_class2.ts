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
  type?: 'unique' | 'id';
}

// 创建Column装饰器
function Column(options?: ColumnOptions) {
  return function (target: any, propertyKey: string) {
    // 存储装饰器元数据
    Reflect.defineMetadata('Column:type', options?.type, target, propertyKey);
  };
}

function Id(options: ColumnOptions) {
  return function (target: any, propertyKey: string) {
    // 存储装饰器元数据
    Reflect.defineMetadata('Id:type', options.type, target, propertyKey);
  };
}

class Db_Base_class {
  @Id({ type: 'id' })
  @ApiProperty({ description: 'id', example: 1 })
  @IsInt({ message: 'id:必须是正整数' })
  @Min(0, { message: 'id:必须是大于等于0' })
  id: number;

  @Column({ type: 'unique' })
  @ApiProperty({ description: '姓名[必须是字符,不能未空]', example: '小许' })
  @IsString({ message: '姓名:必须是字符' })
  @IsNotEmpty({ message: '姓名:不能未空' })
  name: string;

  @Column()
  @ApiProperty({ description: '姓名[必须是字符,不能未空]', example: '小许' })
  @IsString({ message: '姓名:必须是字符' })
  @IsNotEmpty({ message: '姓名:不能未空' })
  password: string;
}

// 获取被@Column装饰器装饰的属性
function getColumnDecoratedFields<T extends new (...args: any[]) => any>(
  target: T,
): { propertyName: string; type: string | undefined }[] {
  const instance = new target();
  const properties = Object.keys(instance);
  const decoratedFields: any = [];

  for (const property of properties) {
    // 检查是否有Column装饰器的元数据
    const hasColumn = Reflect.hasMetadata('Column:type', target.prototype, property);
    if (hasColumn) {
      const type = Reflect.getMetadata('Column:type', target.prototype, property);


      //扩展这个函数.同时把被ApiProperty装饰的属性的description,example也push到decoratedFields中




      decoratedFields.push({ propertyName: property, type: type });
    }
  }

  return decoratedFields;
}

// 打印Db_Base_class 被@Column装饰的属性
const columnFields = getColumnDecoratedFields(Db_Base_class);
console.log('被@Column装饰的属性:', columnFields);
