import {
  Controller,
  Post,
  Body,
  UseInterceptors
} from "@nestjs/common";
import { ArtSortService } from './artSort.service';
import { ArtSortUpdateDto, ArtSortAddDto, ArtSortListDto, ArtSortDel } from '../artSort/dto';
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiTags} from '@nestjs/swagger';
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';

@ApiTags("文章分类")
@ApiBearerAuth()
@ApiHeader({
  name: 'X-CSRF-TOKEN',
  description: '请输入token令牌',
})
@Controller('artSort')
export class ArtSortController {
  constructor(private readonly artSortService: ArtSortService) {}

  @Post("/artSortList")
  @ApiOperation({description:"文章分类列表"})
  @UseInterceptors(new LoggingInterceptor({data:"文章分类列表",logType:"operationLog",operationType:operationTypeEnum.search}))
  artSortList(@Body() artSortListDto: ArtSortListDto ) {
    return this.artSortService.artSortList(artSortListDto);
  }

  @Post("/artSortAdd")
  @ApiOperation({description:"文章分类添加"})
  @UseInterceptors(new LoggingInterceptor({data:"文章分类添加",logType:"operationLog",operationType:operationTypeEnum.add}))
  artSortAdd(@Body() artSortAddDto: ArtSortAddDto) {
    return this.artSortService.artSortAdd(artSortAddDto);
  }

  @Post('/artSortUpdate')
  @ApiOperation({description:"文章分类编辑"})
  @UseInterceptors(new LoggingInterceptor({data:"文章分类编辑",logType:"operationLog",operationType:operationTypeEnum.edit}))
  artSortUpdate(@Body() artSortUpdateDto: ArtSortUpdateDto) {
    return this.artSortService.artSortUpdate(artSortUpdateDto);
  }

  @Post('/artSortDel')
  @ApiOperation({description:"文章分类删除"})
  @UseInterceptors(new LoggingInterceptor({data:"文章分类删除",logType:"operationLog",operationType:operationTypeEnum.delete}))
  artSortDel(@Body() artSortDel:ArtSortDel) {
    return this.artSortService.delete(artSortDel.id);
  }

}
