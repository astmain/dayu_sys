import {
  Controller,
  Post,
  Body,
  UseInterceptors
} from "@nestjs/common";
import { DictService } from './dict.service';
import {
  DictListDto,
  DictUpdateDto,
  DictAddDto,
  DictDelDto,
  DictDataDto,
  DictDataAddDto,
  DictDataUpdateDto, DictDataDelDto, DictDetailDto, DictDataTypeDto,
} from './dto/index';
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';

@ApiTags("字典")
@ApiBearerAuth()
@ApiHeader({
  name: 'X-CSRF-TOKEN',
  description: '请输入token令牌',
})
@Controller('dict')
export class DictController {
  constructor(private readonly dicService: DictService) {}


  @Post("/dictList")
  @ApiOperation({description:"字典列表"})
   @UseInterceptors(new LoggingInterceptor({data:"字典列表",logType:"operationLog",operationType:operationTypeEnum.search}))
  dictList(@Body() dictListDto: DictListDto ) {
    return this.dicService.dictList(dictListDto);
  }

  @Post("/dictDetail")
  @ApiOperation({description:"字典详情"})
   @UseInterceptors(new LoggingInterceptor({data:"字典详情",logType:"operationLog",operationType:operationTypeEnum.search}))
  dictDetail(@Body() dictDetailDto: DictDetailDto ) {
    return this.dicService.dictDetail(dictDetailDto.id);
  }

  @Post("/dictAdd")
  @ApiOperation({description:"字典添加"})
   @UseInterceptors(new LoggingInterceptor({data:"字典添加",logType:"operationLog",operationType:operationTypeEnum.add}))
  dictAdd(@Body() dictAddDto: DictAddDto) {
    return this.dicService.dictAdd(dictAddDto);
  }

  @Post('/dictUpdate')
  @ApiOperation({description:"字典更新"})
   @UseInterceptors(new LoggingInterceptor({data:"字典更新",logType:"operationLog",operationType:operationTypeEnum.edit}))
  dictUpdate(@Body() dictUpdateDto: DictUpdateDto) {
    return this.dicService.dictUpdate(dictUpdateDto);
  }

  @Post('/dictDel')
  @ApiOperation({description:"字典删除"})
   @UseInterceptors(new LoggingInterceptor({data:"字典删除",logType:"operationLog",operationType:operationTypeEnum.delete}))
  dictDel(@Body() dictDelDto: DictDelDto) {
    return this.dicService.delete(dictDelDto.id);
  }

  @Post("/dictData")
  @ApiOperation({description:"字典数据"})
   @UseInterceptors(new LoggingInterceptor({data:"字典数据",logType:"operationLog",operationType:operationTypeEnum.search}))
  dictData(@Body() dictDataDto: DictDataDto ) {
    return this.dicService.dictDataList(dictDataDto);
  }

  @Post("/dictData/type")
  @ApiOperation({description:"通过字典类型获取字典数据"})
   @UseInterceptors(new LoggingInterceptor({data:"通过字典类型获取字典数据",logType:"operationLog",operationType:operationTypeEnum.search}))
  dictDataType(@Body() dictDataTypeDto: DictDataTypeDto ) {
    return this.dicService.dictDataType(dictDataTypeDto);
  }

  @Post("/dictDataAdd")
  @ApiOperation({description:"字典数据添加"})
   @UseInterceptors(new LoggingInterceptor({data:"字典数据添加",logType:"operationLog",operationType:operationTypeEnum.add}))
  dictDataAdd(@Body() dictDataAddDto: DictDataAddDto) {
    return this.dicService.dictDataAdd(dictDataAddDto);
  }

  @Post('/dictDataUpdate')
  @ApiOperation({description:"字典数据更新"})
   @UseInterceptors(new LoggingInterceptor({data:"字典数据更新",logType:"operationLog",operationType:operationTypeEnum.edit}))
  dictDataUpdate(@Body() dictDataUpdateDto: DictDataUpdateDto) {
    return this.dicService.dictDataUpdate(dictDataUpdateDto);
  }

  @Post('/dictDataDel')
  @ApiOperation({description:"字典数据删除"})
   @UseInterceptors(new LoggingInterceptor({data:"字典数据删除",logType:"operationLog",operationType:operationTypeEnum.delete}))
  dictDataDel(@Body() dictDataDelDto: DictDataDelDto) {
    return this.dicService.dictDataDelete(dictDataDelDto.id);
  }
}
