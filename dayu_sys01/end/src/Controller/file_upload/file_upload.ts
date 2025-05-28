import {Body, Controller, Get, Inject, Post, Req, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {join} from 'path';
import axios from 'axios';
// import {zip} from 'compressing'
import {FileInterceptor} from '@nestjs/platform-express' //单文件上传
import type {Response} from 'express'
import {diskStorage} from 'multer';
import * as dayjs from 'dayjs';
// 自定义
import tool from "../../tool"
import * as file_upload_TDO from "./file_upload_TDO"

console.log(`111---aaa:`, globalThis["aaa"])
console.log(`111---bbb:`, globalThis["bbb"])

let Dec_public = globalThis.Dec_public


@ApiTags('文件资源')
@ApiBearerAuth('Authorization')
@Controller("file_upload")
export class file_upload {
    constructor(
        @Inject("db_prisma") private db: any,
        @Inject("tool") private tool: any,
        @Inject("tools") private tools: any,
    ) {
    }


    @ApiOperation({summary: '查询当前用户历史上传记录'})
    @Post("/file_upload_find_list")
    async file_upload_find_list() {
        let list = await this.db.tb_static.findMany()
        list= list.map(o => ({...o, createdAt: dayjs(o.createdAt).format('YYYY-MM-DD HH:mm:ss'),}));
        return this.tools.R.ok({msg: "成功/file_upload_find_list", result: {list}})
    }


    @ApiOperation({summary: '单文件上传'})
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            // 指定文件存储路径
            // destination: './static',
            destination: join(process.cwd(), "..", 'static_store'),
            // 指定文件名
            filename: (req, file, callback) => {
                const filename = Date.now() + "__" + file.originalname
                callback(null, filename);
            },
        }),
        // 文件过滤器
        fileFilter: (req, file, callback) => {
            callback(null, true);
        },
    }))//单文件上传
    @Post("/file_upload_one")
    async upload_one(@UploadedFile() file, @Req() req) {
        let file_info = {
            name: file.filename,
            path: file.path,
            size: file.size,
            type: file.mimetype,
            url: `http://127.0.0.1:10001/static/${file.filename}`,
            user_id: req.user.id,

        }
        await this.db.tb_static.create({data: file_info,})
        return this.tools.R.ok({msg: "成功/file_upload_one", result: {file_info}})
    }


    @ApiOperation({summary: '单文件上传3d文件'})
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            // 指定文件存储路径
            // destination: './static',
            destination: join(process.cwd(), "..", 'static_store'),
            // 指定文件名
            filename: (req, file, callback) => {
                const filename = Date.now() + "__" + file.originalname
                callback(null, filename);
            },
        }),
        // 文件过滤器
        fileFilter: (req, file, callback) => {
            callback(null, true);
        },
    }))//单文件上传
    @Post("/file_upload_one_3d")
    async file_upload_one_3d(@UploadedFile() file, @Req() req) {
        let file_info = {
            name: file.filename,
            path: file.path,
            size: file.size,
            type: file.mimetype,
            url: `http://127.0.0.1:10001/static_store/${file.filename}`,
            user_id: req.user.id,
        }

        // console.log(`111---file_info:`, file_info)
        let config = {
            method: "post", url: "http://127.0.0.1:9001/api_parse_nestjs",
            params: {
                gpu_or_cpu: "cpu", path_file: file_info.path, path_url: "http://127.0.0.1:10001/static_store/",
            }
        }

        let {data: res} = await axios(config)
        // console.log(`111---res:`, res)

        if (res.code == 200) {
            file_info.url = res.data.img_url
        } else {
            return this.tools.R.err({msg: "失败/file_upload_one", result: {file_info}})
        }
        await this.db.tb_static.create({data: file_info,})
        return this.tools.R.ok({msg: "成功/file_upload_one", result: {file_info}})
    }

    @ApiOperation({summary: '删除文件'})
    @Post("/file_delete")
    async file_delete(@Body() body: file_upload_TDO.del) {
        console.log(`111---body:`, body)
        let del_one = await this.db.tb_static.delete({where: {id: body.id}})
        return this.tools.R.ok({msg: "成功/file_delete", result: {del_one}})
    }

    @ApiOperation({summary: '多文件上传-等待开发'})
    @Post("/upload_many")
    async upload_many(@UploadedFile() file) {
        console.log(`111---file:`, file)
        return this.tools.R.ok({msg: "成功", result: {}})
    }


    @ApiOperation({summary: '文件下载'})
    @Get("/download")
    async download(@Res() res: Response) {
        let url = join(__dirname, "../static/png.png")
        res.download(url)
        return this.tools.R.ok({msg: "成功", result: {}})
    }


    @ApiOperation({summary: '文件下载流-等待开发'})
    @Post("/download_stream")
    async download_stream() {

        return this.tools.R.ok({msg: "成功", result: {}})
    }


}
