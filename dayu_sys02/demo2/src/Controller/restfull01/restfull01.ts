import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { Test1Service } from './restfull01_service';
import { ApiParam, ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';


import * as dto from "./tb_restfull01"
import { ApiPost } from "@Config/ApiPost";

@ApiTags('restfull01-管理')
@Controller('restfull01')
export class restfull01 {
    constructor(private readonly test1Service: Test1Service) {
    }

    @ApiPost("create", "新增-数据库1")
    // async create(@Body() data: Partial<dto.create_tb_restfull01>): Promise<dto.tb_restfull01> {
    async create(@Body() data: dto.create_tb_restfull01): Promise<dto.tb_restfull01> {
        return await this.test1Service.create(data);
    }


    // 删除 swagger应该怎么写
    @ApiOperation({ summary: '删除' })
    // @ApiParam({ name: 'id', description: 'id', type: Number, example: 22 })
    @ApiResponse({ status: 200, description: '删除成功' })
    @ApiBody({ type: dto.del_tb_restfull01 })
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
        console.log('id:', id)
        let one = await this.test1Service.remove(id);
        return { code: 200, message: "删除成功", data: one }
    }


    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: dto.tb_restfull01,
    ): Promise<dto.tb_restfull01> {
        return await this.test1Service.update(id, data);
    }

    @Get()
    async findAll(): Promise<dto.tb_restfull01[]> {
        return await this.test1Service.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<dto.tb_restfull01> {
        return await this.test1Service.findOne(id);
    }


}