
import { Controller, Get,Post,Body,Req } from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import * as dto from "./dto/dto"
@ApiTags('测试1-管理')
@Controller('test1')
export class test1 {
    @ApiOperation({summary: '新增-测试1'})
    @Post("test1_create")
    test1_create(@Body() body: dto.test1_create, @Req() req: any) {
        console.log('_create---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '删除-测试1'})
    @Post("test1_delete")
    test1_delete(@Body() body: dto.test1_delete, @Req() req: any) {
        console.log('_delete---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '更新-测试1'})
    @Post("test1_update")
    test1_update(@Body() body: dto.test1_update, @Req() req: any) {
        console.log('_update---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '查询-测试1-list'})
    @Post("test1_find_list")
    test1_find_list(@Body() body: dto.test1_find, @Req() req: any) {
        console.log('_find_list---body:', body)
        return { code: 200, message: "success" }
    }
}
