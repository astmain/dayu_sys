import { Controller, Module,Get,Post,Body,Req } from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {ApiPost} from "@Config/ApiPost";
import * as dto from "./user_dto"
@ApiTags('用户管理-管理')
@Controller('user')
export class user {
    @ApiPost("create","新增-用户管理")
    create(@Body() _body: dto.create_user, @Req() _req: any) {
        // console.log('_create---_body:', _body)
        return { code: 200, message: "success" }
    }


    @ApiPost("del","删除-用户管理")
    del(@Body() _body: dto.del_user, @Req() _req: any) {
        // console.log('_create---_body:', _body)
        return { code: 200, message: "success" }
    }

    @ApiPost("update","更新-用户管理")
    update(@Body() body: dto.update_user, @Req() _req: any) {
        // console.log('_create---_body:', _body)
        return { code: 200, message: "success" }
    }

    @ApiPost("findListAll","查询-用户管理-列表")
    findListAll(@Body() _body: dto.find_user, @Req() _req: any) {
        // console.log('_create---_body:', _body)
        return { code: 200, message: "success" }
    }
}

@Module({
    controllers: [user],
    providers: [],
})
export class user_module {
}


