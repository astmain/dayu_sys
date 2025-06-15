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
    Reflect.defineMetadata('Column:type', options?.db, target, propertyKey);
  };
}

function Id(options: ColumnOptions) {
  return function (target: any, propertyKey: string) {
    // 存储装饰器元数据
    Reflect.defineMetadata('Id:type', options.db, target, propertyKey);
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
  password: string;
}

// 获取被@Column装饰器装饰的属性
function getColumnDecoratedFields<T extends new (...args: any[]) => any>(
  target: T,
): { propertyName: string; type: string | undefined; description?: string; example?: any }[] {
  const instance = new target();
  const properties = Object.keys(instance);
  const decoratedFields: any = [];

  for (const property of properties) {
    // 检查是否有Column装饰器的元数据

    // 获取所有元数据键
    const metadataKeys = Reflect.getMetadataKeys(target.prototype, property);
    console.log(`Property ${property} metadata keys:`, metadataKeys);

    // 查找包含 'swagger' 的元数据键
    const swaggerKey = metadataKeys.find(key =>
      typeof key === 'string' && key.includes('swagger')
    );
    console.log(111, swaggerKey)

    if (swaggerKey) {
      const apiProperty = Reflect.getMetadata(swaggerKey, target.prototype, property);
      // console.log(`Property ${property} swagger metadata:`, apiProperty);
      // if (apiProperty) {
      //     decoratedFields.push({
      //         propertyName: property,
      //         description: apiProperty.description,
      //         example: apiProperty.example
      //     });
      // }

      console.log(222, apiProperty)

    }








    const hasColumn = Reflect.hasMetadata('Column:db', target.prototype, property);
    if (hasColumn) {
      // Column
      const type = Reflect.getMetadata('Column:db', target.prototype, property);


      decoratedFields.push({
        propertyName: property,
        type: type,

      });
    }
  }

  return decoratedFields;
}

// 打印Db_Base_class 被@Column装饰的属性
const columnFields = getColumnDecoratedFields(Db_Base_class);
// console.log('被@Column装饰的属性:', columnFields);
