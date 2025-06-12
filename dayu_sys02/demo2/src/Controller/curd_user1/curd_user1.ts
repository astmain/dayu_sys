import { Controller, Module, Get, Post, Body, Req } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
// 自定义
import * as dto from "./curd_user1_dto"
import { ApiPost } from "@Config/ApiPost";
@ApiTags('增删改查测试curd_user1')
@Controller('curd_user1')
export class curd_user1 {
    constructor(@Inject("DB_prisma") private db: PrismaClient,) { }
    @ApiPost("create", "新增-用户")
    async create(@Body() data: dto.create_curd_user1, @Req() _req: any) {
        let user_one = await this.db.tb_curd_user1.create({ data: data })
        return { code: 200, message: "成功:新增-用户", form: data, user_one, }
    }


    @ApiPost("del", "删除-用户")
    async del(@Body() data: dto.del_curd_user1, @Req() _req: any) {
        const one = await this.db.tb_curd_user1.delete({ where: data })
        return { code: 200, message: "成功:删除-用户", form: data, one }
    }

    @ApiPost("update", "更新-用户")
    async update(@Body() data: dto.update_curd_user1, @Req() _req: any) {
        const one = await this.db.tb_curd_user1.update({ where: { id: data.id }, data: data })
        return { code: 200, message: "成功:更新-用户", form: data, one }
    }

    @ApiPost("findListAll", "查询-用户-列表")
    async findListAll(@Body() data: dto.find_curd_user1, @Req() _req: any) {
        let user_list = await this.db.tb_curd_user1.findMany()
        return { code: 200, message: "成功:查询-用户-列表", form: data, user_list, }
    }

    @ApiPost("save", "保存-新增-更新-用户-id严格模式")
    async save(@Body() data: dto.save_curd_user1, @Req() _req: any) {
        // 判断手机号码是否被注册过
        const exit_count = await this.db.tb_curd_user1.findFirst({ where: { tel: data.tel } });
        console.log(`exit_count---:`, JSON.stringify(exit_count, null, 2))
        if (exit_count) return { code: 400, message: `失败:手机号码已经被注册过了`, form: data, user_one: {} }
        // 更新数据
        if (data.id) {
            //根据id更新数据时判断是否存在此id的数据,如果不存在可能是伪造的id
            const exit_count = await this.db.tb_curd_user1.findFirst({ where: { id: data.id } });
            if (!exit_count) return { code: 400, message: `失败:id不存在,可能是伪造的id`, form: data, user_one: {} }
            // 更新数据
            let user_one = await this.db.tb_curd_user1.update({ where: { id: data.id }, data })
            return { code: 200, message: `成功:更新-用户`, form: data, user_one, }
        }
        // 创建数据
        else {
            delete data.id;
            let user_one = await this.db.tb_curd_user1.create({ data: data })
            return { code: 200, message: `成功:新增-用户`, form: data, user_one, }
        }
    }
}

@Module({
    controllers: [curd_user1],
    providers: [],
})
export class curd_user1_module {
}


