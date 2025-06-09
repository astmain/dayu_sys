import {Controller, Module, Get, Post, Body, Req} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {ApiPost} from "@Config/ApiPost";
import * as dto from "./orm2_dto"
import {UsersService} from "@Controller/orm2/users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "@Controller/orm2/user.entity";

@ApiTags('数据库1-管理')
@Controller('orm2')
class orm2 {
    @ApiPost("create", "新增-数据库1")
    create(@Body() body: dto.orm2_create, @Req() req: any) {
        console.log('_create---body:', body)
        return {code: 200, message: "success"}
    }


    @ApiPost("del", "删除-数据库1")
    del(@Body() body: dto.orm2_del, @Req() req: any) {
        console.log('_delete---body:', body)
        return {code: 200, message: "success"}
    }

    @ApiPost("update", "更新-数据库1")
    update(@Body() body: dto.orm2_update, @Req() req: any) {
        console.log('_update---body:', body)
        return {code: 200, message: "success"}
    }

    @ApiPost("find_list", "查询-数据库1-列表")
    find_list(@Body() body: dto.orm2_find, @Req() req: any) {
        console.log('_find_list---body:', body)
        return {code: 200, message: "success"}
    }
}

@Module({
    // imports: [TypeOrmModule.forFeature([User])],
    controllers: [orm2],
    // providers: [UsersService],
})
export class orm2_module {
}


