import {
  Controller,
  Post,
  Body,
  UseInterceptors
} from "@nestjs/common";
import {ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiTags} from '@nestjs/swagger';
import { TaskSchedulingService } from './taskScheduling.service';
import {TaskSchedulingDto, TaskSchedulingUpdateDto, TaskSchedulingAddDto, TaskSchedulingDelDto} from './dto/index';
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';

@ApiTags("任务调度")
@Controller("taskScheduling")
export class TaskSchedulingController {

  constructor(private readonly taskSchedulingService:TaskSchedulingService) {

  }

  //apiBody怎么用？
  @ApiBody({type:TaskSchedulingDto})
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-CSRF-TOKEN',
    description: '请输入token令牌',
  })
  @Post("/userList")
  @ApiOperation({description:"用户列表"})
  @UseInterceptors(new LoggingInterceptor({data:"获取用户列表",logType:"operationLog",operationType:operationTypeEnum.search}))
  userList(@Body() taskSchedulingDto:TaskSchedulingDto){
    // return this.taskSchedulingService.userList(userListDto);
  }

}
