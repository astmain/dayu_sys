import {Controller, Module, Get, Post, Body, Req} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {ApiPost} from "@Config/ApiPost";
import * as dto from "./orm1_dto"

@ApiTags('数据库1-管理')
@Controller('orm1')
class orm1 {
    @ApiPost("create", "新增-数据库1")
    create(@Body() body: dto.orm1_create, @Req() req: any) {
        console.log('_create---body:', body)
        return {code: 200, message: "success"}
    }


    @ApiPost("del", "删除-数据库1")
    del(@Body() body: dto.orm1_del, @Req() req: any) {
        console.log('_delete---body:', body)
        return {code: 200, message: "success"}
    }

    @ApiPost("update", "更新-数据库1")
    update(@Body() body: dto.orm1_update, @Req() req: any) {
        console.log('_update---body:', body)
        return {code: 200, message: "success"}
    }

    @ApiPost("find_list", "查询-数据库1-列表")
    find_list(@Body() body: dto.orm1_find, @Req() req: any) {
        console.log('_find_list---body:', body)
        return {code: 200, message: "success"}
    }
}

@Module({
    controllers: [orm1],
    providers: [],
})
export class orm1_module {
}


