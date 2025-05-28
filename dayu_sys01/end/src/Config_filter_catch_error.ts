import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common'

import {Request, Response} from 'express'
// import dayjs from "dayjs";



@Catch(HttpException)
export class Config_filter_catch_error implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()

        const status = exception.getStatus()

        response.status(status).json({
            result: {},
            // time: new Date().getTime(),
            time: new Date().toISOString(),
            // time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            success: false,
            url: request.url,
            code: status,
            msg: this.getErrorName(status, exception) + "---错误原因:" + this.getErrorMessage(exception),
            err: this.getErrorName(status, exception) + "----" + this.getErrorMessage(exception),
        })
    }

    private getErrorMessage(exception: unknown): string | string[] {
        if (exception instanceof HttpException) {
            const response = exception.getResponse();

            if (typeof response === 'string') {
                return response;
            } else if (response && typeof response === 'object' && 'message' in response) {
                return response.message as string | string[];
            }
        }

        // 处理未定义的错误
        return exception instanceof Error
            ? exception.message
            : 'Internal server error';
    }

    // 获取错误名称
    private getErrorName(status: number, exception: unknown): string {
        if (exception instanceof HttpException) {
            return exception.name;
        }

        // 根据状态码返回默认错误名称
        return HttpStatus[status];
    }
}