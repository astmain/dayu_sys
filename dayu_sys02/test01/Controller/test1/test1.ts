import {Controller, Post, Body, Req, Module} from "@nestjs/common";
import {ApiTags, ApiOperation, ApiConsumes, ApiBody} from "@nestjs/swagger";
// 自定义
import * as dto from "./dto/dto";
import {SwaggerTag} from "@Config/SwaggerTag";
import {ApiPost} from "@Config/ApiPost";

@SwaggerTag("test-v")
@ApiTags("测试1-管理")
@Controller("test1")
export class test1 {


    @ ApiPost("test1_create", "新增-测试1")
    test1_create(@Body() body: dto.test1_create, @Req() req: any) {
        console.log("_create---body:", body);
        return {code: 200, message: "success"};
    }


    @ApiOperation({summary: "新增-测试1"})
    @Post("test1_update")
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            required: ['name', "age"],
            properties: {
                name: {description: '姓名', type: 'string',},
                // age: {description: '年龄', type: 'number', example: 25},
            },
        },
    })
    @ApiBody({type: dto.test1_update})  // 👈 这就是你说的 @ApiBody
    test1_update(@Body() body: dto.test1_create, @Req() req: any) {
        console.log("_create---body:", body);
        return {code: 200, message: "success"};
    }



}

@Module({
    controllers: [test1],
    providers: [],
})
export class test1_module {}
