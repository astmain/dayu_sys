// import { ArgumentsHost, Catch, HttpStatus,NestInterceptor,ExecutionContext,CallHandler } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { BaseExceptionFilter } from '@nestjs/core';
// import { Prisma } from '@prisma/client';
// import { Response } from 'express';
// @Catch(Prisma.PrismaClientKnownRequestError)

// export class PrismaClientExceptionFilter implements NestInterceptor {
//     intercept(context: ExecutionContext, next: CallHandler) {



//         return {
//             code:  400,
//             message: 111,
//             meta: {  },
//           };

//     }
   

// }


// export async function filter_error_prisma(app: any) {
//     app.useGlobalFilters(new PrismaClientExceptionFilter())
// }