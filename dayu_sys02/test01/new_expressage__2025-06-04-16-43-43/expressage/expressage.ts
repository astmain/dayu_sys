import { Controller, Get,Post,Body,Req } from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import * as dto from "./dto/dto"
@ApiTags('快递管理-管理')
@Controller('expressage')
export class expressage {
    @ApiOperation({summary: '新增-快递管理'})
    @Post("expressage_create")
    expressage_create(@Body() body: dto.expressage_create, @Req() req: any) {
        console.log('_create---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '删除-快递管理'})
    @Post("expressage_delete")
    expressage_delete(@Body() body: dto.expressage_delete, @Req() req: any) {
        console.log('_delete---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '更新-快递管理'})
    @Post("expressage_update")
    expressage_update(@Body() body: dto.expressage_update, @Req() req: any) {
        console.log('_update---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '查询-快递管理-list'})
    @Post("expressage_find_list")
    expressage_find_list(@Body() body: dto.expressage_find, @Req() req: any) {
        console.log('_find_list---body:', body)
        return { code: 200, message: "success" }
    }
}
