import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, Inject, Req} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ParseArrayPipe} from '@nestjs/common/pipes/parse-array.pipe';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import tool from "../../tool"
import * as goods_order_TDO from './goods_order_TDO';


@ApiTags('订单管理')
@ApiBearerAuth('Authorization')
@Controller("goods_order")
export class goods_order {
    constructor(@Inject("db_prisma") private db: any, @Inject("tools") private tools: any,) {
    }

    @Post('goods_order_create')
    @ApiOperation({summary: '新增-订单'})
    async create(@Body() body: goods_order_TDO.create, @Req() req) {
        console.log(`goods_order_create---body:`, body);
        body["user_id"] = req.user.id
        body['price'] = this.tools.price_1_make({num: body.num, price_base: 100})
        await this.db.tb_goods_car.create({data: body})
        return {code: 200, count: 1, msg: '成功:新增-订单'};
    }

    @Post('goods_order_del')
    @ApiOperation({summary: '删除-订单'})
    async del(@Body() body: goods_order_TDO.del) {
        console.log(`goods_order_del---body:`, body);
        await this.db.tb_goods_car.delete({where: {id: body.id}})
        return {code: 200, count: 1, msg: '成功:删除-订单'};
    }

    @Post('goods_order_update')
    @ApiOperation({summary: '更新-订单'})
    async update(@Body() body: goods_order_TDO.update, @Req() req) {
        console.log(`goods_order_update---body:`, body);
        body["user_id"] = req.user.id
        body['price'] = this.tools.price_1_make({num: body.num, price_base: 100})
        await this.db.tb_goods_car.update({where: {id: body.id}, data: body})
        return {code: 200, count: 1, msg: '成功:更新-订单'};
    }

    @Post('goods_order_find_list')
    @ApiOperation({summary: '查询-订单-list'})
    async find_list(@Body() body: goods_order_TDO.find, @Req() req) {
        console.log(`goods_order_find_list---body:`, body);
        let list = await this.db.tb_goods_car.findMany({where: {user_id: req.user.id}})
        return {code: 200, list, msg: '成功:查询-订单-list'};
    }

    @Get('goods_order_find_one')
    @ApiOperation({summary: '查询-订单-one'})
    async find_one(@Body() body: goods_order_TDO.find) {
        console.log(`goods_order_find_list---body:`, body);
        return {code: 200, count: 1, msg: '成功:查询-订单-one'};
    }

}



