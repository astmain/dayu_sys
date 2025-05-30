import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ArtService } from './art.service';
import { ArtAddDto, ArtDelDto, ArtListDto, ArtUpdateDto } from './dto/index';
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiTags} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoggingInterceptor } from '@/common/interceptor/logging.interceptor';
import { operationTypeEnum } from '@/common/enum';

@ApiTags("文章")
@ApiBearerAuth()
@ApiHeader({
  name: 'X-CSRF-TOKEN',
  description: '请输入token令牌',
})
@Controller('art')
export class ArtController {
  constructor(private readonly artService: ArtService) {}

  @Post("/artList")
  @ApiOperation({description:"文章列表"})
  @UseInterceptors(new LoggingInterceptor({data:"文章列表",logType:"operationLog",operationType:operationTypeEnum.search}))
  artList(@Body() artListDto: ArtListDto ) {
    return this.artService.artList(artListDto);
  }

  @Post("/artAdd")
  @ApiOperation({description:"文章添加"})
  @UseInterceptors(new LoggingInterceptor({data:"文章添加",logType:"operationLog",operationType:operationTypeEnum.add}))
  artAdd(@Body() artAddDto: ArtAddDto) {
    return this.artService.artAdd(artAddDto);
  }

  @Post('/artUpdate')
  @ApiOperation({description:"文章更新"})
  @UseInterceptors(new LoggingInterceptor({data:"文章更新",logType:"operationLog",operationType:operationTypeEnum.edit}))
  artUpdate(@Body() ArtUpdateDto: ArtUpdateDto) {
    return this.artService.artUpdate(ArtUpdateDto);
  }

  @Post('/artDel')
  @ApiOperation({description:"文章删除"})
  @UseInterceptors(new LoggingInterceptor({data:"文章删除",logType:"operationLog",operationType:operationTypeEnum.delete}))
  artDel(@Body() artDelDto: ArtDelDto) {
    return this.artService.delete(artDelDto.id);
  }

  @Post('/artChangeStatus')
  @ApiOperation({description:"文章展示"})
  @UseInterceptors(new LoggingInterceptor({data:"文章展示",logType:"operationLog",operationType:operationTypeEnum.edit}))
  artChangeStatus(@Body("id") id: number,@Body("status") status:string|number) {
    return this.artService.artChangeStatus(id,status);
  }
  @Post('/artContentImgUpload')
  @ApiOperation({description:"文章内容图片上传"})
  @UseInterceptors(FileInterceptor("file"))
  @UseInterceptors(new LoggingInterceptor({data:"文章内容图片上传",logType:"operationLog",operationType:operationTypeEnum.other}))
  artContentImgUpload(@UploadedFile() file) {
    return this.artService.handleArtContentImgUpload(file);
  }

}
