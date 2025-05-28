import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, Inject} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ParseArrayPipe} from '@nestjs/common/pipes/parse-array.pipe';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import tool from "../../tool"


@ApiTags('购物车')
@ApiBearerAuth('Authorization')
@Controller("goods_car")
export class goods_car {
    constructor(@Inject("db_prisma") private db: any,) {
    }


    @tool.Dec_public()
    @tool.Get_form("goods_car_find_list", "购车查询数组", [])
    async goods_car_find_list(@Query() form) {


        return tool.R.ok({msg: "成功", result: {}})
    }

    @tool.Dec_public()
    @tool.Get_form("goods_car_create", "购物车添加", [])
    async goods_car_create(@Query() form) {


        return tool.R.ok({msg: "成功", result: {}})
    }


}



