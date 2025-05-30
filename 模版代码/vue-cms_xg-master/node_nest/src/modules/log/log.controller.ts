import {
  Controller,
  Post,
  Body,
  UseInterceptors
} from "@nestjs/common";
import { LogService } from './log.service';
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiTags} from "@nestjs/swagger";
import {
  LoginLogListDto,
  OperationLogListDto,
  OperationLogDel,
  ErrorLogListDto,
  OperationLogByUidDto, LoginLogByUidDto
} from "./dto";
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';

@ApiTags("日志管理")
@ApiBearerAuth()
@ApiHeader({
  name: 'X-CSRF-TOKEN',
  description: '请输入token令牌',
})
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}
  @Post("/loginLogList")
  @ApiOperation({description:"访问日志"})
  @UseInterceptors(new LoggingInterceptor({data:"访问日志",logType:"operationLog",operationType:operationTypeEnum.search}))
  loginLogList(@Body() loginLogListDto:LoginLogListDto){
    return this.logService.loginLog(loginLogListDto);
  }

  @Post("/loginLogListByUid")
  @ApiOperation({description:"通过用户id获取访问日志"})
  @UseInterceptors(new LoggingInterceptor({data:"通过用户id获取访问日志",logType:"operationLog",operationType:operationTypeEnum.search}))
  loginLogListByUid(@Body() loginLogByUidDto:LoginLogByUidDto){
    return this.logService.loginLogListByUid(loginLogByUidDto);
  }

  @Post("/cleanLoginLog")
  @ApiOperation({description:"清空登录日志"})
  @UseInterceptors(new LoggingInterceptor({data:"清空登录日志",logType:"operationLog",operationType:operationTypeEnum.delete}))
  cleanLoginLog() {
    return this.logService.cleanLoginLog();
  }

  /*** 操作日志 ***/

  @Post("/operationLog")
  @ApiOperation({description:"操作日志"})
  @UseInterceptors(new LoggingInterceptor({data:"操作日志",logType:"operationLog",operationType:operationTypeEnum.search}))
  operationLog(@Body() operationLogDto:OperationLogListDto){
    return this.logService.operationLog(operationLogDto);
  }

  @Post("/operationLogByUid")
  @ApiOperation({description:"通过用户id获取操作日志"})
  @UseInterceptors(new LoggingInterceptor({data:"通过用户id获取操作日志",logType:"operationLog",operationType:operationTypeEnum.search}))
  operationLogByUid(@Body() operationLogByUidDto:OperationLogByUidDto){
    return this.logService.operationLogByUid(operationLogByUidDto);
  }

  @Post("/operationLogDel")
  @ApiOperation({description:"删除日志"})
  @UseInterceptors(new LoggingInterceptor({data:"删除日志",logType:"operationLog",operationType:operationTypeEnum.delete}))
  operationLogDel(@Body() operationLogDel: OperationLogDel) {
    return this.logService.operationLogDel(operationLogDel.id);
  }

  @Post("/cleanOperationLog")
  @ApiOperation({description:"清空操作日志"})
  @UseInterceptors(new LoggingInterceptor({data:"清空操作日志",logType:"operationLog",operationType:operationTypeEnum.delete}))
  cleanOperationLog() {
    return this.logService.cleanOperationLog();
  }

  /*** 错误日志 ***/

  @Post("/errorLog")
  @ApiOperation({description:"错误日志"})
  @UseInterceptors(new LoggingInterceptor({data:"获取错误日志",logType:"operationLog",operationType:operationTypeEnum.search}))
  errorLog(@Body() errorLogListDto: ErrorLogListDto) {
    return this.logService.errorLog(errorLogListDto);
  }

  @Post("/cleanErrorLog")
  @ApiOperation({description:"清空错误日志"})
  @UseInterceptors(new LoggingInterceptor({data:"清空错误日志",logType:"operationLog",operationType:operationTypeEnum.delete}))
  cleanErrorLog() {
    return this.logService.cleanErrorLog();
  }
}
