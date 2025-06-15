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
  db?: 'unique' | 'id';
}

// 创建Column装饰器
function Column(options?: ColumnOptions) {
  return function (target: any, propertyKey: string) {
    // 存储装饰器元数据
    Reflect.defineMetadata('Column:db', options?.db, target, propertyKey);
  };
}

class Db_Base_class {
  @Column({ db: 'id' })
  @ApiProperty({ description: 'id', example: 1 })
  @IsInt({ message: 'id:必须是正整数' })
  @Min(0, { message: 'id:必须是大于等于0' })
  id: number;

  @Column({ db: 'unique' })
  @ApiProperty({ description: '姓名[必须是字符,不能未空]', example: '小许' })
  @IsString({ message: '姓名:必须是字符' })
  @IsNotEmpty({ message: '姓名:不能未空' })
  name: string;

  @Column()
  @ApiProperty({ description: '姓名[必须是字符,不能未空]', example: '小许' })
  @IsString({ message: '姓名:必须是字符' })
  @IsNotEmpty({ message: '姓名:不能未空' })
  password: string = '123456';
}

// 获取被@Column装饰器装饰的属性
function getColumnDecoratedFields<T extends new (...args: any[]) => any>(
  target: T,
): any {
  const instance = new target();
  const properties = Object.keys(instance);
  const decoratedFields: any = [];

  for (const property of properties) {
    const decorator_keys = Reflect.getMetadataKeys(target.prototype, property);
    console.log(`111---decorator_keys:`, decorator_keys);
    make(property, instance);
  }

  function make(property, instance) {
    let Column_db = Reflect.getMetadata(
      'Column:db',
      target.prototype,
      property,
    );

    const ApiProperty = Reflect.getMetadata(
      'swagger/apiModelProperties',
      target.prototype,
      property,
    );
    console.log(`111---ApiProperty:`, ApiProperty);



    let default_value = instance[property]

    let ele = {
      field: property,
      db: Column_db,
      description: ApiProperty.description,
      default_value: default_value,
    };


    //得到password的值,打印一下


    decoratedFields.push(ele);
  }

  return decoratedFields;
}

// 打印Db_Base_class 被@Column装饰的属性
const columnFields = getColumnDecoratedFields(Db_Base_class);
console.log('被@Column装饰的属性:', columnFields);
