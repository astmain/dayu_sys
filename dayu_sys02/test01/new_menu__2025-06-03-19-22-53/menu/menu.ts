import { Controller, Get,Post,Body,Req } from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import * as dto from "./dto/dto"
@ApiTags('菜单-管理')
@Controller('menu')
export class menu {
    @ApiOperation({summary: '新增-菜单'})
    @Post("menu_create")
    menu_create(@Body() body: dto.menu_create, @Req() req: any) {
        console.log('_create---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '删除-菜单'})
    @Post("menu_delete")
    menu_delete(@Body() body: dto.menu_delete, @Req() req: any) {
        console.log('_delete---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '更新-菜单'})
    @Post("menu_update")
    menu_update(@Body() body: dto.menu_update, @Req() req: any) {
        console.log('_update---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '查询-菜单-list'})
    @Post("menu_find_list")
    menu_find_list(@Body() body: dto.menu_find, @Req() req: any) {
        console.log('_find_list---body:', body)
        return { code: 200, message: "success" }
    }
}
