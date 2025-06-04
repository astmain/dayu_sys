import {Controller, Get, Post, Body, Req} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import * as dto from "./dto/dto"
import {PrismaService} from "../../Orm/PrismaService";

@ApiTags('测试2-管理')
@Controller('test2')
export class test2 {
    constructor(private readonly prisma: PrismaService) {
    }

    @ApiOperation({summary: '新增-测试2'})
    @Post("test2_create")
    async test2_create(@Body() body: dto.test2_create, @Req() req: any) {
        console.log('_create---body:', body)

        this.prisma.tb_files.findMany({where: {id: 1}})

        // try {
        let one = await this.prisma.tb_files.create({
            data: {
                ext: "png",
                size: req?.user?.id,
                // size: 111,
                file_name: "111.png",
                file_path: "111.png",
                file_url: "111.png",
            }
        })
        // } catch (error) {
        //     console.log(`111---error:`, error)
        // }


        let list = await this.prisma.tb_files.findMany()
        return {code: 200, message: "success", body, result: {list}}
    }

    @ApiOperation({summary: '删除-测试2'})
    @Post("test2_delete")
    test2_delete(@Body() body: dto.test2_delete, @Req() req: any) {
        console.log('_delete---body:', body)
        return {code: 200, message: "success"}
    }

    @ApiOperation({summary: '更新-测试2'})
    @Post("test2_update")
    test2_update(@Body() body: dto.test2_update, @Req() req: any) {
        console.log('_update---body:', body)
        return {code: 200, message: "success"}
    }

    @ApiOperation({summary: '查询-测试2-list'})
    @Post("test2_find_list")
    test2_find_list(@Body() body: dto.test2_find, @Req() req: any) {
        console.log('_find_list---body:', body)
        return {code: 200, message: "success"}
    }
}
