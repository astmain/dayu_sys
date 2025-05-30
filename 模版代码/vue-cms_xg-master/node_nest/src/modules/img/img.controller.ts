import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { ImgService } from './img.service';
import {ImgListDto, ImgAddDto, ImgUpdateDto, ImgDelDto} from './dto/index';
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';

@ApiTags("图片")
@ApiBearerAuth()
@ApiHeader({
  name: 'X-CSRF-TOKEN',
  description: '请输入token令牌',
})
@Controller('img')
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @Post("/imgList")
  @ApiOperation({description:"图片列表"})
  @UseInterceptors(new LoggingInterceptor({data:"图片列表",logType:"operationLog",operationType:operationTypeEnum.search}))
  imgList(@Body() imgListDto: ImgListDto ) {
    return this.imgService.imgList(imgListDto);
  }

  @Post("/imgAdd")
  @ApiOperation({description:"图片添加"})
  @UseInterceptors(FileInterceptor("file"))
  @UseInterceptors(new LoggingInterceptor({data:"图片添加",logType:"operationLog",operationType:operationTypeEnum.add}))
  imgAdd(@Body() imgAddDto: ImgAddDto,@UploadedFile() file) {
    return this.imgService.imgAdd(imgAddDto,file);
  }

  @Post('/imgUpdate')
  @ApiOperation({description:"图片更新"})
  @UseInterceptors(FileInterceptor("file"))
  @UseInterceptors(new LoggingInterceptor({data:"图片更新",logType:"operationLog",operationType:operationTypeEnum.edit}))
  imgUpdate(@Body() imgUpdateDto: ImgUpdateDto,@UploadedFile() file) {
    return this.imgService.imgUpdate(imgUpdateDto,file);
  }

  @Post('/imgDel')
  @ApiOperation({description:"图片删除"})
  @UseInterceptors(new LoggingInterceptor({data:"图片删除",logType:"operationLog",operationType:operationTypeEnum.delete}))
  imgDel(@Body() imgDelDto: ImgDelDto) {
    return this.imgService.delete(imgDelDto.id);
  }
}
