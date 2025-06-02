import {Controller, Get, Post, Request, Body, Headers, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, UnauthorizedException, UsePipes, ValidationPipe, Inject} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义

import {PrismaClient} from "@prisma/client";
import tool from "../tool";
import {Service_test} from "../Service/Service_test"
import {Service_app} from "../Service/Service_app";
import {DTO_test_pipe} from "../DTO/DTO_test_pipe";
import {DTO_test} from "../DTO/DTO_test";


let prisma = new PrismaClient()
console.log(`000---aaa:`, globalThis["aaa"])

@ApiTags('测试')
@ApiBearerAuth('Authorization')
@Controller("test")
export class test {
    constructor(
        private readonly __Service_test: Service_test,
        private readonly __Service_app: Service_app,
        @Inject("Service_data") private __Service_data: Object,
        @Inject("Service_factory") private __Service_factory: any,
        @Inject("global_module") private __global_module: any,
        @Inject("db_prisma") private db: any,
        @Inject("db_all") private db_all: any,
        // @Inject("Service_db") private db: any,
    ) {
    }


    @tool.Dec_public()
    @Get("Request")
    async Request(@Request() request) {
        // console.log(`111---222:`, request.query)
        // console.log(`111---222:`, this.__Service_test.getHello())
        // console.log(`111---222:`, this.__Service_data)
        // console.log(`111---222:`, this.__Service_data["aaa"])
        this.__Service_data["aaa"] = 123
        // console.log(`111---222:`, this.__Service_data)
        // console.log(`111---222:`, this.__Service_factory.obj2.getHello())
        // console.log(`111---222:`, this.__Service_app.getHello())
        // console.log(`111---222:`, this.__global_module.baseUrl)

        let user_list = await prisma.tb_user.findMany()


        let user_list2 = await this.db.tb_user.findMany()
        // console.log(`111---user_list2:`, user_list2)


        // let user_list3 =  await  this. db.tb_user.findMany()

        let user_list111 = await this.db_all.db1.tb_user.findMany()
        let user_list1222 = await this.db_all.db2.tb_user.findMany()


        console.log(`111---user_list111:`, user_list111)
        console.log(`111---user_list1222:`, user_list1222)

        console.log(`111---aaa:`, globalThis["aaa"])
        console.log(`111---aaa:`, global["aaa"])
        console.log(`111---bbb:`, global["bbb"])
        console.log(`111---ccc:`, globalThis.ccc)
        console.log(`111---ccc:`, global.ccc)

        return {code: 200, msg: "111", result: {time: Date.now() + 1}}
    }

    @tool.Dec_public()
    @Get("Query")
    async Query(@Query() query, @Headers() header) {
        console.log(`111---query:`, query)
        console.log(`111---header:`, header)
        return {code: 200, msg: "111", result: {time: Date.now() + 1}}
    }

    @tool.Dec_public()
    @Post("Post_Request")
    async Post_Request(@Request() request) {
        console.log(`111---222:`, request.body)
        return {code: 200}
    }


    @tool.Dec_public()
    @Post("test_login")
    async test_login(@Body(DTO_test_pipe) body: DTO_test) {
        console.log(`111---body:`, body)
        return tool.R.ok({msg: "成功/test_login", result: {}})
    }


}
