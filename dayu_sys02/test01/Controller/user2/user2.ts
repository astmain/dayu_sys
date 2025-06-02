import { Controller, Get,Post,Body,Req } from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import * as dto from "./dto/dto"
@ApiTags('用户2-管理')
@Controller('user2')
export class user2 {
    @ApiOperation({summary: '新增-用户2'})
    @Post("user2_create")
    user2_create(@Body() body: dto.user2_create, @Req() req: any) {
        console.log('_create---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '删除-用户2'})
    @Post("user2_delete")
    user2_delete(@Body() body: dto.user2_delete, @Req() req: any) {
        console.log('_delete---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '更新-用户2'})
    @Post("user2_update")
    user2_update(@Body() body: dto.user2_update, @Req() req: any) {
        console.log('_update---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '查询-用户2-list'})
    @Post("user2_find_list")
    user2_find_list(@Body() body: dto.user2_find, @Req() req: any) {
        console.log('_find_list---body:', body)
        return { code: 200, message: "success" }
    }
}
