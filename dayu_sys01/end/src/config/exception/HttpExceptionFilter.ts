import {ExceptionFilter, Catch, ArgumentsHost, HttpException} from '@nestjs/common';
import {Request, Response} from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        // console.log(`HttpExceptionFilter---exception:`, exception)
        console.log(`HttpExceptionFilter---exception:`, exception)
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        response.status(status).json({
            status: status,
            msg: exception,
            err: exception,
            url: decodeURI(request.url),//url解码,中文乱码处理
            timestamp: new Date().toISOString(),
        });
    }
}
