import {Controller, Post, Body, UseInterceptors} from "@nestjs/common";
import { NotifyService } from './notify.service';
import {NotifyAddDto, NotifyDelDto, NotifyListDto, NotifyUpdateDto} from './dto';
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';

@ApiTags("消息通知")
@ApiBearerAuth()
@ApiHeader({
  name: 'X-CSRF-TOKEN',
  description: '请输入token令牌',
})
@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService
              ) {}
    @Post("/notifyList")
    @ApiOperation({description:"消息通知列表"})
    @UseInterceptors(new LoggingInterceptor({data:"获取消息通知列表",logType:"operationLog",operationType:operationTypeEnum.search}))
    notifyList(@Body() notifyListDto: NotifyListDto ) {
        return this.notifyService.notifyList(notifyListDto);
    }

    @Post("/notifySend")
    @ApiOperation({description:"消息通知发送"})
    @UseInterceptors(new LoggingInterceptor({data:"消息通知发送",logType:"operationLog",operationType:operationTypeEnum.add}))
    notifySend(@Body() notifyAddDto: NotifyAddDto) {
        return this.notifyService.notifySend(notifyAddDto);
    }

    @Post('/notifyUpdate')
    @ApiOperation({description:"消息通知更新"})
    @UseInterceptors(new LoggingInterceptor({data:"消息通知更新",logType:"operationLog",operationType:operationTypeEnum.edit}))
    notifyUpdate(@Body() notifyUpdateDto: NotifyUpdateDto) {
        return this.notifyService.notifyUpdate(notifyUpdateDto);
    }

    @Post('/notifyDel')
    @ApiOperation({description:"消息通知删除"})
    @UseInterceptors(new LoggingInterceptor({data:"消息通知删除",logType:"operationLog",operationType:operationTypeEnum.delete}))
    notifyDel(@Body() notifyDel: NotifyDelDto) {
        return this.notifyService.delete(notifyDel.id);
    }


    @Post("/changeNotifyStatus")
    @ApiOperation({description:"修改消息通知状态"})
    @UseInterceptors(new LoggingInterceptor({data:"修改消息通知状态",logType:"operationLog",operationType:operationTypeEnum.edit}))
    changeNotifyStatus(@Body("id") id: number,@Body("status") status:string|number) {
        return this.notifyService.changeNotifyStatus(id,status);
    }

    @Post("/noReadNotice")
    @ApiOperation({description:"获取未读通知公告"})
    @UseInterceptors(new LoggingInterceptor({data:"获取未读通知公告",logType:"operationLog",operationType:operationTypeEnum.search}))
    noReadNotice(@Body("uid") uid: number) {
        return this.notifyService.noReadNotice(uid);
    }

    @Post("/changeNoticeStatus")
    @ApiOperation({description:"修改消息通知状态"})
    @UseInterceptors(new LoggingInterceptor({data:"修改消息通知状态",logType:"operationLog",operationType:operationTypeEnum.edit}))
    changeNoticeStatus(@Body("notifyId") notifyId: number) {
        return this.notifyService.changeNoticeStatus(notifyId);
    }
}
