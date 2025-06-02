import {Controller, Get, Post, Request, Body, Headers, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, UnauthorizedException, UsePipes, ValidationPipe} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义

import {PrismaClient} from "@prisma/client";
import tool from "./tool";
let db = new PrismaClient()

import  {Service_test} from "./Service/Service_test"



// @ApiTags('app')
// @ApiBearerAuth('Authorization')
@Controller("app")
export class appController {
    constructor(private readonly service_test: Service_test) {
    }

    @tool.Dec_public()
    @Get("Request")
    async Request(@Request() request) {
        console.log(`111---222:`, request.query)
        return {code: 200}
    }

    @tool.Dec_public()
    @Get("Query")
    async Query(@Query() query, @Headers() header) {
        console.log(`111---query:`, query)
        console.log(`111---header:`, header)
        return {code: 200}
    }

    @tool.Dec_public()
    @Post("Post_Request")
    async Post_Request(@Request() request) {
        console.log(`111---222:`, request.body)
        return {code: 200}
    }


}
