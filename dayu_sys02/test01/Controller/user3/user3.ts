import {Body, Controller, Module, Post} from '@nestjs/common';
import * as dto from "./dto"


@Controller("user3")
export class user3 {

    @Post()
    create(@Body() user: dto.create) {
        // 处理创建用户逻辑
        console.log(`111---body:`, user)
        return user
    }
}


let aaa = {"name": "111", "age": 111}
let bbb = {"name": 111, "age": "111"}


@Module({
    controllers: [user3],
    providers: [],
})
export class user3_module {
}
