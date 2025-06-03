import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // 根据 Prisma 错误代码进行分类处理
    switch (exception.code) {
      case 'P2000': // 数据库连接错误
        status = HttpStatus.BAD_REQUEST;
        message = 'Database connection error';
        break;
      case 'P2002': // 唯一约束冲突
        status = HttpStatus.CONFLICT;
        message = 'Unique constraint violation';
        break;
      case 'P2025': // 找不到记录
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found';
        break;
      // 可以根据需要添加更多错误代码处理
    }

    console.log('111---:', 111)

    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.message,
    });
  }
}


export async function filter_error_prisma(app: any) {
    app.useGlobalFilters(new PrismaExceptionFilter())
}