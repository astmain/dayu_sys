import {Controller, Get, Post, Body, Req, Module, Inject} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import * as dto from "./dto/dto"
import {MyDecorator} from "./MyDecorator"
import {ApiPost} from "./ApiPost"

import {PrismaClient} from '@prisma/client';
import {SwaggerTag} from "@Config/SwaggerTag";

@SwaggerTag("test-v")
@ApiTags('测试3_装饰器-管理')
@Controller('test3_dec')
export class test3_dec {
    constructor(@Inject("DB_prisma") private DB: PrismaClient) {
    }

    // @MyDecorator
    // @AAA_log
    @ApiOperation({summary: '新增-测试3_装饰器'})
    @Post("test3_dec_create")
    // @MyDecorator
    test3_dec_create(@Body() body: dto.test3_dec_create, @Req() req: any) {
        console.log('_create---body:', body)
        return {code: 200, message: "success"}
    }

    // @ApiOperation({summary: '删除-测试3_装饰器'})
    // @Post("test3_dec_delete")

    @ApiPost("test3_dec_delete", '删除-测试3_装饰器', '测试封装ApiPost')
    // test3_dec_delete(@Body() body: dto.test3_dec_delete, @Req() req: any) {
    // @MyDecorator
    test3_dec_delete(@Body() body: dto.test3_dec_delete) {
        console.log('_delete---body:', body)
        return {code: 200, message: "success"}
    }

    @ApiOperation({summary: '更新-测试3_装饰器'})
    @Post("test3_dec_update")

    test3_dec_update(@Body() body: dto.test3_dec_update, @Req() req: any) {
        console.log('_update---body:', body)
        return {code: 200, message: "success"}
    }

    @ApiOperation({summary: '查询-测试3_装饰器-list'})
    @Post("test3_dec_find_list")
    async test3_dec_find_list(@Body() body: dto.test3_dec_find, @Req() req: any) {
        console.log('_find_list---body:', body)
        let one = await this.DB.tb_files.create({
            data: {
                ext: "png",
                // size: req?.user?.id,
                size: 111,
                file_name: "111.png",
                file_path: "111.png",
                file_url: "111.png",
            }
        })
        let list = await this.DB.tb_files.findMany()
        return {code: 200, count: list.length, message: "success", list,}
    }
}

@Module({
    controllers: [test3_dec],
    providers: [],

})
export class test3_dec_module {
}
