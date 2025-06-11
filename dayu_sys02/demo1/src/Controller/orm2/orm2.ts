import { Controller, Module, Get, Post, Body, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
// 自定义
import { ApiPost } from "@Config/ApiPost";
import * as dto from "./orm2_dto"
@ApiTags('数据库2-管理')
@Controller('orm2')
export class orm2 {
    @ApiPost("create", "新增-数据库2")
    create(@Body() _body: dto.create_orm2, @Req() _req: any) {
        // console.log('_create---_body:', _body)
        return { code: 200, message: "success" }
    }


    @ApiPost("del", "删除-数据库2")
    del(@Body() _body: dto.del_orm2, @Req() _req: any) {
        // console.log('_create---_body:', _body)
        return { code: 200, message: "success" }
    }

    @ApiPost("update", "更新-数据库2")
    update(@Body() body: dto.update_orm2, @Req() _req: any) {
        // console.log('_create---_body:', _body)
        return { code: 200, message: "success" }
    }

    @ApiPost("findListAll", "查询-数据库2-列表")
    findListAll(@Body() _body: dto.find_orm2, @Req() _req: any) {
        // console.log('_create---_body:', _body)
        return { code: 200, message: "success" }
    }
}

@Module({
    controllers: [orm2],
    providers: [],
})
export class orm2_module {
}


