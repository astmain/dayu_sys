import {Controller, Post, Body, UsePipes, Module} from '@nestjs/common';
import * as dto from "./user2_dto"
import {SwaggerTag} from "@Config/SwaggerTag";

@SwaggerTag("user-v")
@Controller('user2')
export class user2 {

    @Post("create")
    create(@Body() user: dto.create) {
        // 处理创建用户逻辑
        console.log(`111---body:`, user)
        return user
    }

    @Post("del")
    del(@Body() user: dto.del) {
        // 处理创建用户逻辑
        console.log(`111---body:`, user)
        return user
    }
}


@Module({
    controllers: [user2],
    providers: [],
})
export class user2_module {
}


