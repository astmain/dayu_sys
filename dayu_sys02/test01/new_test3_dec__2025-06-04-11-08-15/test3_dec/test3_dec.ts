import { Controller, Get,Post,Body,Req } from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import * as dto from "./dto/dto"
@ApiTags('测试3_装饰圈-管理')
@Controller('test3_dec')
export class test3_dec {
    @ApiOperation({summary: '新增-测试3_装饰圈'})
    @Post("test3_dec_create")
    test3_dec_create(@Body() body: dto.test3_dec_create, @Req() req: any) {
        console.log('_create---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '删除-测试3_装饰圈'})
    @Post("test3_dec_delete")
    test3_dec_delete(@Body() body: dto.test3_dec_delete, @Req() req: any) {
        console.log('_delete---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '更新-测试3_装饰圈'})
    @Post("test3_dec_update")
    test3_dec_update(@Body() body: dto.test3_dec_update, @Req() req: any) {
        console.log('_update---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '查询-测试3_装饰圈-list'})
    @Post("test3_dec_find_list")
    test3_dec_find_list(@Body() body: dto.test3_dec_find, @Req() req: any) {
        console.log('_find_list---body:', body)
        return { code: 200, message: "success" }
    }
}
