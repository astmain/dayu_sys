import {
  Controller,
  Post,
  Body,
  UseInterceptors
} from "@nestjs/common";
import { ArtColumnService } from './artColumn.service';
import { ArtColumnUpdateDto, ArtColumnAddDto, ArtColumnListDto, ArtColumnDel } from '../artColumn/dto';
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiTags} from '@nestjs/swagger';
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';

@ApiTags("文章栏目")
@ApiBearerAuth()
@ApiHeader({
  name: 'X-CSRF-TOKEN',
  description: '请输入token令牌',
})
@Controller('artColumn')
export class ArtColumnController {
  constructor(private readonly artColumnService: ArtColumnService) {}

  @Post("/artColumnList")
  @UseInterceptors(new LoggingInterceptor({data:"文章栏目列表",logType:"operationLog",operationType:operationTypeEnum.search}))
  @ApiOperation({description:"文章栏目列表"})
  artColumnList(@Body() artColumnListDto: ArtColumnListDto ) {
    return this.artColumnService.artColumnList(artColumnListDto);
  }

  @Post("/artColumnAdd")
  @UseInterceptors(new LoggingInterceptor({data:"文章栏目添加",logType:"operationLog",operationType:operationTypeEnum.add}))
  @ApiOperation({description:"文章栏目添加"})
  artColumnAdd(@Body() artColumnAddDto: ArtColumnAddDto) {
    return this.artColumnService.artColumnAdd(artColumnAddDto);
  }

  @Post('/artColumnUpdate')
  @UseInterceptors(new LoggingInterceptor({data:"文章栏目编辑",logType:"operationLog",operationType:operationTypeEnum.edit}))
  @ApiOperation({description:"文章栏目编辑"})
  artColumnUpdate(@Body() artColumnUpdateDto: ArtColumnUpdateDto) {
    return this.artColumnService.artColumnUpdate(artColumnUpdateDto);
  }

  @Post('/artColumnDel')
  @UseInterceptors(new LoggingInterceptor({data:"文章栏目删除",logType:"operationLog",operationType:operationTypeEnum.delete}))
  @ApiOperation({description:"文章栏目删除"})
  artColumnDel(@Body() artColumnDel: ArtColumnDel) {
    return this.artColumnService.delete(artColumnDel.id);
  }
}
