import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import {Request, Response} from 'express';

@Catch()
class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response:any = ctx.getResponse<Response>();
        const request: any = ctx.getRequest<Request>();
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;


        // console.log('message---:', exception.message)
        // console.log('stack---:', exception.stack)

        const response_result = {
            code: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            // message: exception instanceof HttpException ? exception.message : 'Internal server error',
            message: exception.message,
            stack: exception.stack,
        }
        response.status(status).json(response_result);
    }
}


export async function filter_error_sys(app: any) {
    app.useGlobalFilters(new AllExceptionsFilter())
}