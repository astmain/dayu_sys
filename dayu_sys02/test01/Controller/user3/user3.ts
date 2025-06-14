// user3.ts
import {Body, Controller, Module, Post} from '@nestjs/common';


import * as tdo from './user3_dto'; // 导入命名空间


@Controller("user3")
export class user3 {

    @Post("create")
    create(@Body() body: tdo.user3_create) {
        // 处理创建用户逻辑
        console.log(`111---body:`, body)
        return body
    }

    @Post("del")
    del(@Body() body: tdo.user3_del) {
        // 处理创建用户逻辑
        console.log(`111---body:`, body)
        return body
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
