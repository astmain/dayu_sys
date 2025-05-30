import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { StatusMonitorService } from './statusMonitor.service';
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';
import { SysCacheDelDto, SysCacheChildDto, SysCacheContentDto } from "@/modules/statusMonitor/dto";
import { NoAuth } from '@/common/decorator/noAuth.decorator';

@NoAuth()
@ApiTags("系统状态监控")
@ApiBearerAuth()
@ApiHeader({
  name: 'X-CSRF-TOKEN',
  description: '请输入token令牌',
})
@Controller('statusMonitor')
export class StatusMonitorController {
  constructor(private readonly statusMonitorService: StatusMonitorService
              ) {}
    @Post("/sysMonitor")
    @ApiOperation({description:"系统cpu和内存监控"})
    @UseInterceptors(new LoggingInterceptor({data:"系统监控",logType:"operationLog",operationType:operationTypeEnum.search}))
    sysMonitor() {
        return this.statusMonitorService.sysMonitor()
    }
    @Post("/sysCacheList")
    @ApiOperation({description:"缓存列表"})
    @UseInterceptors(new LoggingInterceptor({data:"缓存列表",logType:"operationLog",operationType:operationTypeEnum.search}))
    sysCacheList() {
        return this.statusMonitorService.sysCacheList()
    }
    @Post("/sysCacheChild")
    @ApiOperation({description:"查看缓存下级"})
    @UseInterceptors(new LoggingInterceptor({data:"查看缓存下级",logType:"operationLog",operationType:operationTypeEnum.search}))
    sysCacheChild(@Body() sysCacheChildDto: SysCacheChildDto) {
        return this.statusMonitorService.sysCacheChild(sysCacheChildDto)
    }
    @Post("/sysCacheContent")
    @ApiOperation({description:"缓存内容"})
    @UseInterceptors(new LoggingInterceptor({data:"缓存内容",logType:"operationLog",operationType:operationTypeEnum.search}))
    sysCacheContent(@Body() sysCacheContentDto: SysCacheContentDto) {
        return this.statusMonitorService.sysCacheContent(sysCacheContentDto)
    }
    @Post("/sysCacheDel")
    @ApiOperation({description:"删除缓存数据"})
    @UseInterceptors(new LoggingInterceptor({data:"删除缓存数据",logType:"operationLog",operationType:operationTypeEnum.delete}))
    sysCacheDel(@Body() sysCacheDelDto: SysCacheDelDto) {
        return this.statusMonitorService.sysCacheDel(sysCacheDelDto)
    }

}
