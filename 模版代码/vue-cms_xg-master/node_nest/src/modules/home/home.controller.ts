import {
  Controller,
  Post,
  Body,
  UseInterceptors
} from "@nestjs/common";
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiTags} from '@nestjs/swagger';
import { HomeService } from './home.service';
import { AccessTimeSlotDto, ObtainUserSourcesDto, WatchUserAccessPageDto } from './dto/index';
import { RedisInstance } from '@/common/redis';
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';
import { NoAuth } from '@/common/decorator/noAuth.decorator';

@ApiTags("后台首页")
@Controller("home")
export class HomeController {

  constructor(private readonly homeService:HomeService) {}

  @Post("/accessStatistics")
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-CSRF-TOKEN',
    description: '请输入token令牌',
  })
  @ApiOperation({description:"后台访问人数总数"})
  @UseInterceptors(new LoggingInterceptor({data:"后台访问人数总数",logType:"operationLog",operationType:operationTypeEnum.other}))
  accessStatistics() {
    return this.homeService.accessStatistics();
  }
  @Post("/accessTimeSlot")
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-CSRF-TOKEN',
    description: '请输入token令牌',
  })
  @ApiOperation({description:"访问人数时间段"})
  @UseInterceptors(new LoggingInterceptor({data:"访问人数时间段",logType:"operationLog",operationType:operationTypeEnum.other}))
  accessTimeSlot(@Body() accessTimeSlotDto: AccessTimeSlotDto) {
    let dataRangeArr = JSON.parse(accessTimeSlotDto.dateRangeArr)
    return this.homeService.accessTimeSlot(dataRangeArr);
  }
  @Post("/artStatistics")
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-CSRF-TOKEN',
    description: '请输入token令牌',
  })
  @ApiOperation({description:"文章总数"})
  @UseInterceptors(new LoggingInterceptor({data:"文章总数",logType:"operationLog",operationType:operationTypeEnum.other}))
  artStatistics() {
    return this.homeService.artStatistics();
  }

  @NoAuth()
  @Post("/obtainUserSources")
  @ApiOperation({description:"获取用户来源"})
  @UseInterceptors(new LoggingInterceptor({data:"获取用户来源",logType:"operationLog",operationType:operationTypeEnum.add}))
  obtainUserSources(@Body() obtainUserSourcesDto:ObtainUserSourcesDto){
    return this.homeService.obtainUserSources(obtainUserSourcesDto);
  }
  @Post("/userSourcesTop")
  @ApiOperation({description:"用户来源排名"})
  @UseInterceptors(new LoggingInterceptor({data:"用户来源排名",logType:"operationLog",operationType:operationTypeEnum.search}))
  userSourcesTop(){
    return this.homeService.userSourcesTop();
  }

  @NoAuth()
  @Post("/watchUserAccessPage")
  @ApiOperation({description:"监听用户访问页面"})
  @UseInterceptors(new LoggingInterceptor({data:"监听用户访问页面",logType:"operationLog",operationType:operationTypeEnum.add}))
  watchUserAccessPage(@Body() watchUserAccessPageDto:WatchUserAccessPageDto){
    return this.homeService.watchUserAccessPage(watchUserAccessPageDto);
  }
  @Post("/activePageTop")
  @ApiOperation({description:"活跃页面排名"})
  @UseInterceptors(new LoggingInterceptor({data:"活跃页面排名",logType:"operationLog",operationType:operationTypeEnum.search}))
  activePageTop(){
    return this.homeService.activePageTop();
  }
}
