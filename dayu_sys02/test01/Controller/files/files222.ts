import {Controller, Get, Post, Body, Req, UseInterceptors, UploadedFile} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiConsumes} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import * as dto from "./dto/dto"
import {FileInterceptor} from "@nestjs/platform-express"
import {Express} from 'express';  // ✅ 这里必须引入
import * as fs from 'fs';
import * as path from 'path';
import {Config} from "../../Config/Config";
import {conf} from "../../Config/conf";
import {writeFile} from 'fs/promises';

@ApiTags('文件-管理')
@Controller('files')
export class files {
    @ApiOperation({summary: '新增-文件-文件上传返回url'})
    @Post("files_create")
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {description: '文件', type: 'string', format: 'binary'},
            },
        },
    })
    files_create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
        console.log('_create---body:', body)
        console.log(`_create---file:`, file)
        console.log(`111---Config:`, conf.project.path_absolute)

        const uploadDir = path.join(conf.project.path_absolute, '..', "files")
        console.log(`111---uploadDir:`, uploadDir)


        // 创建目录（如果不存在）
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, {recursive: true});
        }

        const fileExt = path.extname(file.originalname);
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${fileExt}`;
        const savePath = path.join(uploadDir, fileName);

        // 写入文件
        // fs.writeFileSync(savePath, file.buffer);
        writeFile(savePath, file.buffer);


        return {code: 200, message: "success"}
    }

    @ApiOperation({summary: '删除-文件'})
    @Post("files_delete")
    @ApiConsumes('application/x-www-form-urlencoded') // ✅ 使用表单格式
    @ApiBody({type: dto.files_delete})

    // @ApiBody({
    //     schema: {
    //         type: 'object',
    //         required: ['email', 'password'], // ✅ 明确标记 name 为必填
    //         properties: {
    //             email: {type: 'string', example: 'test@example.com',},
    //             password: {type: 'string', example: 'mypassword',},
    //         }
    //     }
    // })
    files_delete(@Body() body: dto.files_delete, @Req() req: any) {
        console.log('_delete---body:', body)
        return {code: 200, message: "success"}
    }

    @ApiOperation({summary: '更新-文件'})
    @Post("files_update")
    files_update(@Body() body: dto.files_update, @Req() req: any) {
        console.log('_update---body:', body)
        return {code: 200, message: "success"}
    }

    @ApiOperation({summary: '查询-文件-list'})
    @Post("files_find_list")
    files_find_list(@Body() body: dto.files_find, @Req() req: any) {
        console.log('_find_list---body:', body)
        return {code: 200, message: "success"}
    }
}
