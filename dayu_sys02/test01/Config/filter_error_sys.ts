import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import {Request, Response} from 'express';

@Catch()
class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response: any = ctx.getResponse<Response>();
        const request: any = ctx.getRequest<Request>();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        // 基本参数
        let message = ""
        let url = request.url
        let stack = exception.stack
        let timestamp = new Date().toISOString()
        let code = 400
        // 错误原因
        if (exception?.name?.includes("PrismaClientValidationError")) {
            message = "异常:数据库>prisma参数错误"
        } else if (exception?.name?.includes("PrismaClientKnownRequestError")) {
            message = "异常:数据库>PrismaClientKnownRequestError"
        } else if (exception?.name?.includes("Prisma")) {
            message = "异常:数据库>Prisma"
        } else {
            message = "异常:错误>" + exception.message
        }


        // 想要结果
        const response_result = {code, timestamp, url, message, stack,}
        // console.log(`filter_error_sys---response_result:`, response_result)
        response.status(status).json(response_result);
    }
}


export async function filter_error_sys(app: any) {
    app.useGlobalFilters(new AllExceptionsFilter())
}