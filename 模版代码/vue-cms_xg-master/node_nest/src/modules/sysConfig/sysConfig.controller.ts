import {Controller, Post, Body, UseInterceptors} from "@nestjs/common";
import { SysConfigService } from './sysConfig.service';
import { SendEmailDto, SendSmsDto, SysConfigListDto, SysConfigUpdateDto } from './dto';
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';

@ApiTags("系统配置")
@ApiBearerAuth()
@ApiHeader({
  name: 'X-CSRF-TOKEN',
  description: '请输入token令牌',
})
@Controller('sysConfig')
export class SysConfigController {
  constructor(private readonly sysConfigService: SysConfigService
  ) {}
  @Post("/sysConfig")
  @ApiOperation({description:"系统配置"})
  @UseInterceptors(new LoggingInterceptor({data:"获取系统配置",logType:"operationLog",operationType:operationTypeEnum.search}))
  sysConfig(@Body() sysConfigDto: SysConfigListDto ) {
    return this.sysConfigService.sysConfig(sysConfigDto.key,sysConfigDto.uid);
  }

  @Post('/sysConfigUpdate')
  @ApiOperation({description:"更新系统配置"})
  @UseInterceptors(new LoggingInterceptor({data:"更新系统配置",logType:"operationLog",operationType:operationTypeEnum.edit}))
  sysConfigUpdate(@Body() sysConfigUpdateDto: SysConfigUpdateDto) {
    return this.sysConfigService.sysConfigUpdate(sysConfigUpdateDto);
  }

  @Post('/sendEmail')
  @ApiOperation({description:"发送邮箱"})
  @UseInterceptors(new LoggingInterceptor({data:"发送邮箱",logType:"operationLog",operationType:operationTypeEnum.other}))
  sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.sysConfigService.sendEmail(sendEmailDto);
  }

  @Post('/sendSms')
  @ApiOperation({description:"发送短信"})
  @UseInterceptors(new LoggingInterceptor({data:"发送短信",logType:"operationLog",operationType:operationTypeEnum.other}))
  sendSms(@Body() sendSmsDto: SendSmsDto) {
    return this.sysConfigService.sendSms(sendSmsDto);
  }

}
