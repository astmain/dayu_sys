import {
  Controller,
  Post,
  Body,
  UseInterceptors
} from "@nestjs/common";
import { IpBlackListService } from './ipBlackList.service';
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiTags} from '@nestjs/swagger';
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';
import { IpBlackListAddDto, IpBlackListDelDto, IpBlackListDto, IpBlackListUpdateDto } from '@/modules/ipBlackList/dto';

@ApiTags("ip黑名单")
@ApiBearerAuth()
@ApiHeader({
  name: 'X-CSRF-TOKEN',
  description: '请输入token令牌',
})
@Controller('ipBlackList')
export class IpBlackListController {
  constructor(private readonly ipBlackListService: IpBlackListService) {}

  @Post("/ipBlackList")
  @ApiOperation({description:"ip黑名单列表"})
  @UseInterceptors(new LoggingInterceptor({data:"ip黑名单列表",logType:"operationLog",operationType:operationTypeEnum.search}))
  ipBlackListList(@Body() ipBlackListListDto: IpBlackListDto ) {
    return this.ipBlackListService.ipBlackList(ipBlackListListDto);
  }

  @Post("/ipBlackListAdd")
  @ApiOperation({description:"ip黑名单添加"})
  @UseInterceptors(new LoggingInterceptor({data:"ip黑名单添加",logType:"operationLog",operationType:operationTypeEnum.add}))
  ipBlackListAdd(@Body() ipBlackListAddDto: IpBlackListAddDto) {
    return this.ipBlackListService.ipBlackListAdd(ipBlackListAddDto);
  }

  @Post('/ipBlackListUpdate')
  @ApiOperation({description:"ip黑名单编辑"})
  @UseInterceptors(new LoggingInterceptor({data:"ip黑名单编辑",logType:"operationLog",operationType:operationTypeEnum.edit}))
  ipBlackListUpdate(@Body() ipBlackListUpdateDto: IpBlackListUpdateDto) {
    return this.ipBlackListService.ipBlackListUpdate(ipBlackListUpdateDto);
  }

  @Post('/ipBlackListDel')
  @ApiOperation({description:"ip黑名单删除"})
  @UseInterceptors(new LoggingInterceptor({data:"ip黑名单删除",logType:"operationLog",operationType:operationTypeEnum.delete}))
  ipBlackListDel(@Body() ipBlackListDel:IpBlackListDelDto) {
    return this.ipBlackListService.delete(ipBlackListDel.id);
  }

}
