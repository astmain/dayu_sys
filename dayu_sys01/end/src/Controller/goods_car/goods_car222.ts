import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, Inject} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ParseArrayPipe} from '@nestjs/common/pipes/parse-array.pipe';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import tool from "../../tool"
import * as goods_car_TDO from './goods_car_TDO';


@ApiTags('购物车')
@ApiBearerAuth('Authorization')
@Controller("goods_car")
export class goods_car {
    constructor(@Inject("db_prisma") private db: any,) {
    }

    @Post('create')
    @ApiOperation({ summary: '新增发票' })
    create(@Body() body: goods_car_TDO.create) {
        console.log(`111---body:`, body);
        return { code: 200, count: 1, message: '成功:新增发票' };
    }

    @Post('del')
    @ApiOperation({ summary: '删除发片' })
    del(@Body() body: goods_car_TDO.del) {
        console.log(`111---body:`, body);
        return { code: 200, count: 1, message: '成功:删除发片' };
    }

    @Post('update')
    @ApiOperation({ summary: '更新发票' })
    update(@Body() body: goods_car_TDO.update) {
        // create(@Body() body: any) {
        console.log(`111---body:`, body);
        return { code: 200, count: 1, message: '成功:更新发票' };
    }

    @Post('list')
    @ApiOperation({ summary: '查询发票list' })
    list(@Body() body: goods_car_TDO.find) {
        console.log(`111---body:`, body);
        return { code: 200, count: 1, message: '成功:查询发票list' };
    }

    @Get('one')
    @ApiOperation({ summary: '查询发票one' })
    one(@Body() body: goods_car_TDO.find) {
        console.log(`111---body:`, body);
        return { code: 200, count: 1, message: '成功:查询发票one' };
    }

}



