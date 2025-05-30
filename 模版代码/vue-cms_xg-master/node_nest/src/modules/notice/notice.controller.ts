import {Controller, Post, Body,  UseInterceptors} from "@nestjs/common";
import { NoticeService } from './notice.service';
import {NoticeAddDto, NoticeDelDto, NoticeListDto, NoticeUpdateDto} from './dto';
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';

@ApiTags("通知公告")
@ApiBearerAuth()
@ApiHeader({
  name: 'X-CSRF-TOKEN',
  description: '请输入token令牌',
})
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService
              ) {}
    @Post("/noticeList")
    @ApiOperation({description:"通知公告列表"})
    @UseInterceptors(new LoggingInterceptor({data:"获取通知公告列表",logType:"operationLog",operationType:operationTypeEnum.search}))
    noticeList(@Body() noticeListDto: NoticeListDto ) {
        return this.noticeService.noticeList(noticeListDto);
    }

    @Post("/noticeAdd")
    @ApiOperation({description:"通知公告添加"})
    @UseInterceptors(new LoggingInterceptor({data:"通知公告添加",logType:"operationLog",operationType:operationTypeEnum.add}))
    noticeAdd(@Body() noticeAddDto: NoticeAddDto) {
        return this.noticeService.noticeAdd(noticeAddDto);
    }

    @Post("/sendNotice")
    @ApiOperation({description:"发送通知公告"})
    @UseInterceptors(new LoggingInterceptor({data:"发送通知公告",logType:"operationLog",operationType:operationTypeEnum.add}))
    sendNotice(@Body() noticeAddDto: NoticeAddDto) {
        return this.noticeService.sendNotice(noticeAddDto);
    }

    @Post('/noticeUpdate')
    @ApiOperation({description:"通知公告更新"})
    @UseInterceptors(new LoggingInterceptor({data:"通知公告更新",logType:"operationLog",operationType:operationTypeEnum.edit}))
    noticeUpdate(@Body() noticeUpdateDto: NoticeUpdateDto) {
        return this.noticeService.noticeUpdate(noticeUpdateDto);
    }

    @Post('/noticeDel')
    @ApiOperation({description:"通知公告删除"})
    @UseInterceptors(new LoggingInterceptor({data:"通知公告删除",logType:"operationLog",operationType:operationTypeEnum.delete}))
    noticeDel(@Body() noticeDel: NoticeDelDto) {
        return this.noticeService.delete(noticeDel.id);
    }


    @Post("/changeNoticeStatus")
    @ApiOperation({description:"修改通知公告状态"})
    @UseInterceptors(new LoggingInterceptor({data:"修改通知公告状态",logType:"operationLog",operationType:operationTypeEnum.edit}))
    changeNoticeStatus(@Body("id") id: number,@Body("status") status:string|number) {
        return this.noticeService.changeNoticeStatus(id,status);
    }
}
