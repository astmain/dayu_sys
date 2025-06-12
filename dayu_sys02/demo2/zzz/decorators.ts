// decorators.ts
import 'reflect-metadata';

export interface FieldOptions {
    type: string;
    id?: boolean;
    generated?: boolean;
    default?: string;
}

const models: any[] = [];

export function Model() {
    return function (constructor: Function) {
        models.push(constructor);
    };
}

export function Field(options: FieldOptions) {
    return function (target: any, propertyKey: string) {
        const fields = Reflect.getMetadata('prisma:fields', target.constructor) || [];
        fields.push({ name: propertyKey, options });
        Reflect.defineMetadata('prisma:fields', fields, target.constructor);
    };
}

export function getModels() {
    return models;
}

export function getModelFields(model: any) {
    return Reflect.getMetadata('prisma:fields', model) || [];
}
