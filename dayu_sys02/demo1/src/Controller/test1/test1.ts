import {Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe} from '@nestjs/common';
import {Test1Service} from './test1.service';
import {tb_test1} from './test1.entity';
import {ApiParam, ApiOperation, ApiResponse, ApiTags, ApiBody} from '@nestjs/swagger';


import * as dto from "./test1.entity"
import {ApiPost} from "@Config/ApiPost";

@ApiTags('test1-管理')
@Controller('test1')
export class test1 {
    constructor(private readonly test1Service: Test1Service) {
    }

    @ApiPost("create", "新增-数据库1")
    // async create(@Body() data: Partial<tb_test1>): Promise<tb_test1> {
    async create(@Body() data: dto.tb_test1_create): Promise<tb_test1> {
        return await this.test1Service.create(data);
    }


    // 删除 swagger应该怎么写
    @ApiOperation({summary: '删除'})
    // @ApiParam({ name: 'id', description: 'id', type: Number, example: 22 })
    @ApiResponse({status: 200, description: '删除成功'})
    @ApiBody({type: dto.tb_test1_del})
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
        console.log('id:', id)
        let one = await this.test1Service.remove(id);
        return {code: 200, message: "删除成功", data: one}
    }


    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: tb_test1,
    ): Promise<tb_test1> {
        return await this.test1Service.update(id, data);
    }

    @Get()
    async findAll(): Promise<tb_test1[]> {
        return await this.test1Service.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<tb_test1> {
        return await this.test1Service.findOne(id);
    }


}