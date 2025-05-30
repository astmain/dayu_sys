import {Controller, Post, Body, UseInterceptors} from '@nestjs/common';
import { ImgSortService } from './imgSort.service';
import { ImgSortAddDto, ImgSortDelDto, ImgSortListDto, ImgSortUpdateDto } from './dto';
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';

@ApiTags("图片分类")
@ApiBearerAuth()
@ApiHeader({
  name: 'X-CSRF-TOKEN',
  description: '请输入token令牌',
})
@Controller('imgSort')
export class ImgSortController {
  constructor(private readonly imgSortService: ImgSortService) {}

  @Post("/imgSortList")
  @ApiOperation({description:"图片分类列表"})
  @UseInterceptors(new LoggingInterceptor({data:"图片分类列表",logType:"operationLog",operationType:operationTypeEnum.search}))
  imgSortList(@Body() imgSortListDto: ImgSortListDto ) {
    return this.imgSortService.imgSortList(imgSortListDto);
  }

  @Post("/imgSortAdd")
  @ApiOperation({description:"图片分类添加"})
  @UseInterceptors(new LoggingInterceptor({data:"图片分类添加",logType:"operationLog",operationType:operationTypeEnum.add}))
  imgSortAdd(@Body() imgSortAddDto: ImgSortAddDto) {
    return this.imgSortService.imgSortAdd(imgSortAddDto);
  }

  @Post('/imgSortUpdate')
  @ApiOperation({description:"图片分类更新"})
  @UseInterceptors(new LoggingInterceptor({data:"图片分类更新",logType:"operationLog",operationType:operationTypeEnum.edit}))
  imgSortUpdate(@Body() imgSortUpdateDto: ImgSortUpdateDto) {
    return this.imgSortService.imgSortUpdate(imgSortUpdateDto);
  }

  @Post('/imgSortDel')
  @ApiOperation({description:"图片分类删除"})
  @UseInterceptors(new LoggingInterceptor({data:"图片分类删除",logType:"operationLog",operationType:operationTypeEnum.delete}))
  imgSortDel(@Body() imgSortDelDto: ImgSortDelDto) {
    return this.imgSortService.delete(imgSortDelDto.id);
  }
}
