import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, Inject, Req} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ParseArrayPipe} from '@nestjs/common/pipes/parse-array.pipe';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
import * as _ from 'lodash';
// 自定义
import tool from "../../tool"
import * as goods_car_TDO from './goods_car_TDO';


@ApiTags('购物车')
@ApiBearerAuth('Authorization')
@Controller("goods_car")
export class goods_car {
    constructor(@Inject("db_prisma") private db: any,
                @Inject("tools") private tools: any,
    ) {
    }

    @Post('goods_car_create')
    @ApiOperation({summary: '新增-购物车'})
    async create(@Body() body: goods_car_TDO.create, @Req() req) {
        console.log(`111---body:`, body);
        body["user_id"] = req.user.id
        body['price'] = this.tools.price_1_make({num: body.num, price_base: 100})
        await this.db.tb_goods_car.create({data: body})
        return {code: 200, count: 1, msg: '成功:新增-购物车'};
    }

    @Post('goods_car_del')
    @ApiOperation({summary: '删除-购物车'})
    async del(@Body() body: goods_car_TDO.del) {
        console.log(`goods_car_del---body:`, body);
        await this.db.tb_goods_car.delete({where: {id: body.id}})
        return {code: 200, count: 1, msg: '成功:删除-购物车'};
    }

    @Post('goods_car_update')
    @ApiOperation({summary: '更新-购物车'})
    async update(@Body() body: goods_car_TDO.update, @Req() req) {
        console.log(`goods_car_update---body:`, body);
        body["user_id"] = req.user.id
        body['price'] = this.tools.price_1_make({num: body.num, price_base: 100})
        await this.db.tb_goods_car.update({where: {id: body.id}, data: body})
        return {code: 200, count: 1, msg: '成功:更新-购物车'};
    }

    @Post('goods_car_find_list')
    @ApiOperation({summary: '查询购物车-list'})
    async find_list(@Body() body: goods_car_TDO.find, @Req() req) {
        console.log(`111---body:`, body);
        let goods_car_list = await this.db.tb_goods_car.findMany({where: {user_id: req.user.id}})
        let goods_car_total = _.sumBy(goods_car_list, (o: any) => o.num)
        let one1 = {name: "经济:12个工作日", price: _.sumBy(goods_car_list, (o: any) => o.price * o.num) * 1.0}
        let one2 = {name: "经济:7个工作日", price: _.sumBy(goods_car_list, (o: any) => o.price * o.num) * 1.5}
        let one3 = {name: "经济:3个工作日", price: _.sumBy(goods_car_list, (o: any) => o.price * o.num) * 3}
        let one4 = {name: "经济:2个工作日", price: _.sumBy(goods_car_list, (o: any) => o.price * o.num) * 6}
        let goods_car_price_list = [one1, one2, one3, one4]
        return {code: 200, msg: '成功:查询-购物车-list', goods_car_list, goods_car_price_list, goods_car_total};
    }

    @Get('goods_car_find_one')
    @ApiOperation({summary: '查询-购物车-one'})
    async find_one(@Body() body: goods_car_TDO.find) {
        console.log(`111---body:`, body);
        return {code: 200, count: 1, msg: '成功:查询-购物车-list'};
    }


    // @Get('goods_car_compute')
    // @ApiOperation({summary: '计算-购物车'})
    // async goods_car_compute(@Body() body: goods_car_TDO.goods_car_compute) {
    //     console.log(`111---body:`, body);
    //     let list = await this.db.tb_goods_car.findMany({where: {ind: {in: {id: body.ids}}}})
    //     let price_total = [
    //         {name: "标准:7个工作日", price: "￥" + (_.sumBy(list, (o: any) => o.price * o.num) * 1.5)},
    //         {name: "经济:12个工作日", price: "￥" + (_.sumBy(list, (o: any) => o.price * o.num) * 2)},
    //         {name: "加急:3个工作日", price: "￥" + (_.sumBy(list, (o: any) => o.price * o.num) * 5)},
    //         {name: "专机加急:2个工作日", price: "￥" + (_.sumBy(list, (o: any) => o.price * o.num) * 10)}
    //     ]
    //     let goods_total = _.sumBy(list, (o: any) => o.num)
    //     return {code: 200, msg: '成功:查询-购物车-list', goods_total, price_total,};
    // }

}



