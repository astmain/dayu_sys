// user3.ts
import {Body, Controller, Module, Post} from '@nestjs/common';


import * as dto from './user4_dto'; // 导入命名空间


@Controller("user4")
class user4 {
    @Post("add")
    add(@Body() body: dto.user4_create) {
        // 处理创建用户逻辑
        console.log(`111---body:`, body)
        return body
    }

    @Post("del")
    del(@Body() body: dto.user4_del) {
        // 处理创建用户逻辑
        console.log(`111---body:`, body)
        return body
    }
}


let aaa = {"name": "111", "age": 111}
let bbb = {"name": 111, "age": "111"}


@Module({
    controllers: [user4],
    providers: [],
})
export class user4_module {
}
