import {ApiProperty, PickType} from '@nestjs/swagger';
import {IsInt, IsNotEmpty, IsString, Min} from 'class-validator';


export class user {
    @ApiProperty({description: '姓名', example: '小许',})
    @IsString({message: '姓名:必须是字符'})
    @IsNotEmpty({message: '姓名:不能未空'})
    name: string;

    @ApiProperty({description: '年龄', example: 18,})
    @IsInt({message: "年龄:必须是正整数"})
    @Min(0, {message: '年龄:必须是大于等于0'})
    age: string;
}


export class AAA {
    @ApiProperty({description: '姓名', example: '小许',})
    @IsString({message: '姓名:必须是字符'})
    @IsNotEmpty({message: '姓名:不能未空'})
    name: string;

    @ApiProperty({description: '年龄', example: 18,})
    @IsInt({message: "年龄:必须是正整数"})
    @Min(0, {message: '年龄:必须是大于等于0'})
    age: string;
}

//nestjs 得到user字段name @IsString的参数

import 'reflect-metadata';
import {Controller, Inject, Injectable, Module} from "@nestjs/common";

// 获取类中所有属性的装饰器元数据
export function getAllDecoratorMetadata(targetClass: Function) {
    const metadata = {};
    const prototype = targetClass.prototype;
    const properties = Object.getOwnPropertyNames(prototype)
        .filter(prop => prop !== 'constructor');

    properties.forEach(propertyKey => {
        const decoratorMetadata = Reflect.getMetadataKeys(prototype, propertyKey)
            .map(metadataKey => ({
                key: metadataKey,
                value: Reflect.getMetadata(metadataKey, prototype, propertyKey)
            }));

        metadata[propertyKey] = decoratorMetadata;
    });

    return metadata;
}

// 获取类级别装饰器元数据
export function getClassDecoratorMetadata(targetClass: Function) {
    return Reflect.getMetadataKeys(targetClass)
        .map(metadataKey => ({
            key: metadataKey,
            value: Reflect.getMetadata(metadataKey, targetClass)
        }));
}

// 获取 class-validator 装饰器参数
export function getValidationDecorators(targetClass: Function) {
    const metadataKey = 'class-validator:validation-metadatas';
    return Reflect.getMetadata(metadataKey, targetClass.prototype) || [];
}


console.log('类装饰器元数据:', getClassDecoratorMetadata(AAA));
console.log('所有属性装饰器元数据:', getAllDecoratorMetadata(AAA));
console.log('验证装饰器参数:', getValidationDecorators(AAA));


// ************************************************
// 继承全部字段
export class create extends user {
}

// 继承部分字段
export class find extends PickType(user, ['name', 'age']) {
}

//
