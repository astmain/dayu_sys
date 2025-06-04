import {Body, Controller, Post} from '@nestjs/common';
import * as dto from "./dto"


@Controller("user3")
export class user3 {

    @Post()
    create(@Body() user: dto.find) {
        // 处理创建用户逻辑
        console.log(`111---body:`, user)
        return user
    }
}


let aaa = {"name": "111", "age": 111}
let bbb = {"name": 111, "age": "111"}