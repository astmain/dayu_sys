import { Controller, Get, Post, Body, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiConsumes } from '@nestjs/swagger';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from "@nestjs/platform-express"
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';
// 自定义
import * as dto from "./dto/dto"
import { Config } from "../../Config/Config";
import { conf } from "../../Config/conf";
import { writeFile } from 'fs/promises';
import * as dayjs from 'dayjs'

@ApiTags('文件-管理')
@Controller('files')
export class files {
    @ApiOperation({ summary: '新增-文件-文件上传返回url' })
    @Post("files_create")
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @ApiBody({
        schema: {
            type: 'object',
            required: ['file'],
            properties: {
                file: { description: '文件', type: 'string', format: 'binary' },
            },
        },
    })
    files_create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
        console.log('files_create---body:', body)
        console.log(`files_create---file:`, file)
        // 父级文件夹目录
        const path_absolute = conf.files.path_absolute

        // (如果不存在)创建父级文件夹目录
        if (!fs.existsSync(path_absolute)) fs.mkdirSync(path_absolute, { recursive: true });
        const ext = path.extname(file.originalname)  // 文件后缀
        const size = file.size                       // 文件大小  
        const file_name = file.originalname          //  文件名
        const file_path = path.join(path_absolute, dayjs().format('YYYY-MM-DD-HH-mm-ss') + file_name)//文件路径
        const file_url = conf.files.url + path.basename(file_path)      //文件url
        const file_obj = { ext, size, file_name, file_path, file_url }
        console.log('files_create---file_obj:', file_obj)
        // 写入文件
        fs.writeFileSync(file_obj.file_path, file.buffer);
        // writeFile(savePath, file.buffer);
        return { code: 200, message: "success", file_obj }
    }

    @ApiOperation({ summary: '删除-文件' })
    @Post("files_delete")
    // @ApiConsumes('application/x-www-form-urlencoded')
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: dto.files_delete })
    files_delete(@Body() body: dto.files_delete, @Req() req: any) {
        console.log('_delete---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({ summary: '更新-文件' })
    @Post("files_update")
    files_update(@Body() body: dto.files_update, @Req() req: any) {
        console.log('_update---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({ summary: '查询-文件-list' })
    @Post("files_find_list")
    files_find_list(@Body() body: dto.files_find, @Req() req: any) {
        console.log('_find_list---body:', body)
        return { code: 200, message: "success" }
    }
}
