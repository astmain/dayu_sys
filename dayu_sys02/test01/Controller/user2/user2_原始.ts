import {Controller, Post, Body, UsePipes, Module} from '@nestjs/common';


import {CountrySchema, create_user2} from "./user2_dto";
import {createZodDto, ZodValidationPipe} from 'nestjs-zod'


// 从 Zod 模式创建 DTO
class CreateUserDto extends createZodDto(CountrySchema) {
}

@Controller('user2')
export class user2 {

    @Post("create")
    // create(@Body(new ZodValidationPipe(CountrySchema)) body: CreateUserDto) {
    create(@Body() body: CreateUserDto) {
        // 处理创建用户逻辑
        console.log(`111---body:`, body)
        return body
    }


}


@Module({
    controllers: [user2],
    providers: [],
})
export class user2_module {
}


