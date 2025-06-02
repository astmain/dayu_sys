import { Controller, Get } from '@nestjs/common';

@Controller('user2')
export class user2_controller {
    @Get()
    getHello() {
        return { code: 200, message: "success" }
    }
    @Get("aaa")
    getHello2() {
        return { code: 200, message: "success" }
    }
}
