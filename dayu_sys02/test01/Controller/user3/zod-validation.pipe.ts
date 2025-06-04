// import {PipeTransform, Injectable, BadRequestException, Type} from '@nestjs/common';
// import {ZodType} from 'zod';
// import {createClassFromZod} from 'zod-to-openapi';
//
// @Injectable()
// export class ZodOpenApiPipe implements PipeTransform {
//     constructor(private schema: ZodType) {
//     }
//
//     transform(value: any) {
//         const result = this.schema.safeParse(value);
//         if (!result.success) {
//             throw new BadRequestException(result.error.issues);
//         }
//         return result.data;
//     }
//
//     // 静态方法：从Zod模式创建带有Swagger装饰器的类
//     static toClass<T extends ZodType>(schema: T): Type<z.infer<T>> {
//         return createClassFromZod(schema);
//     }
// }