import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, Inject} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ParseArrayPipe} from '@nestjs/common/pipes/parse-array.pipe';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import tool from "../tool";


@ApiTags('商城订单')
@ApiBearerAuth('Authorization')
@Controller("mall_order")
export class mall_order {
    constructor(@Inject("db_prisma") private db: any,) {
    }


    @tool.Dec_public()
    @tool.Get_form("mall_order1", "订单1", [])
    async mall_order1(@Query() form) {




        return tool.R.ok({msg: "成功", result: {}})
    }


}



