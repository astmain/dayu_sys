import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import {Request,Response} from "express"
import {LogService} from "@/modules/log/log.service";
import * as requestIp from "request-ip";
import {AuthService} from "@/modules/auth/auth.service";
import {ErrorLogAddDto} from "@/modules/log/dto";
import {handleDealIpv6ToIpv4} from "@/utils/utils";

//异常过滤器
//使用Catch装饰器
@Catch(HttpException)
export class HttpExceptionFilters implements ExceptionFilter {
  private curApp;
  constructor(app:any) {
    this.curApp = app;
  }
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();//获取响应内容
    const request = ctx.getRequest<Request>();//获取请求内容

    let message;
    //dto 数据传输对象校验错误
    if(exception.message=="Bad Request Exception"){
      // @ts-ignore
      message = exception.getResponse().message[0]
    }else{
      //控制器抛出的异常信息
      message = exception.message
    }
    Logger.log('错误提示', message);

    const errorResponse = {
      data:message,
      message,
      code: exception.getStatus(), // 自定义code
      url: request.originalUrl, // 错误的url地址
    };

    await this.handleRecordErrorMsg(message,request,exception)
    console.log(message,"messagemessagemessage");
    console.log(exception.getResponse(),"exceptionexception1111111111111");
    const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status).header('Content-Type', 'application/json; charset=utf-8').json(errorResponse);
  }

  /**
   * 记录报错信息
   */
  async handleRecordErrorMsg(message,request,exception){
    let authService = this.curApp.get(AuthService);
    // 通过token获取uid
    const accessToken = request.get('X-CSRF-TOKEN');
    let user = await authService.verifyToken(accessToken);
    let uid = user.id??0
    let clientIp = requestIp.getClientIp(request)
    clientIp = handleDealIpv6ToIpv4(clientIp)
    const requestMethod = request.method
    let requestParams = ""
    if(requestMethod.toLowerCase()=="post"){
      requestParams = request.body
    }else{
      requestParams = request.query
    }
    let form:ErrorLogAddDto = {
      respondParams:JSON.stringify(exception.getResponse()),
      errorDetail:message,
      requestUrl:request.originalUrl,
      requestIp:clientIp,
      requestMethod,
      requestParams:requestParams?JSON.stringify(requestParams):"",
      uid,
      operationSystem:request.body.operationSystem,
      browser:request.body.browser,
      isPcOrIphone:request.body.isPcOrIphone
    }
    //记录错误信息
    let logService = this.curApp.get(LogService)
    await logService.errorLogAdd(form)
  }
}
