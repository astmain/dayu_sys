import * as fs from 'fs'
import * as path from 'path'
import dayjs from 'dayjs'


let name = "files"//文件夹名称
let tag = "文件"//文档名称


let Controller = `import { Controller, Get,Post,Body,Req } from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import * as dto from "./dto/dto"
@ApiTags('${tag}-管理')
@Controller('${name}')
export class ${name} {
    @ApiOperation({summary: '新增-${tag}'})
    @Post("${name}_create")
    ${name}_create(@Body() body: dto.${name}_create, @Req() req: any) {
        console.log('_create---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '删除-${tag}'})
    @Post("${name}_delete")
    ${name}_delete(@Body() body: dto.${name}_delete, @Req() req: any) {
        console.log('_delete---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '更新-${tag}'})
    @Post("${name}_update")
    ${name}_update(@Body() body: dto.${name}_update, @Req() req: any) {
        console.log('_update---body:', body)
        return { code: 200, message: "success" }
    }

    @ApiOperation({summary: '查询-${tag}-list'})
    @Post("${name}_find_list")
    ${name}_find_list(@Body() body: dto.${name}_find, @Req() req: any) {
        console.log('_find_list---body:', body)
        return { code: 200, message: "success" }
    }
}
`

let module = `import { Module } from '@nestjs/common';
// 自定义
import { ${name} } from './${name}';

@Module({
  controllers: [${name}],
  providers: [],

})
export class ${name}_module { }

`


let dto_create = `import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
export class ${name}_create {
    @ApiProperty({ description: '默认名称', type: String, example: "默认名称" })
    @IsString()
    @IsNotEmpty()
    name: string = "111";
}
`


let dto_delete = `import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
export class ${name}_delete {
    @ApiProperty({ description: 'id', type: Number, example: 0, })
    @IsNumber()
    id: number = 0;
}
`


let dto_update = `import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
export class ${name}_update {
    @ApiProperty({ description: '默认名称', type: String, example: "默认名称" })
    @IsString()
    @IsNotEmpty()
    name: string = "111";
}
`

let dto_find = `import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";
export class ${name}_find {
    @ApiProperty({ description: '默认名称', type: String, example: "默认名称" })
    @IsString()
    @IsNotEmpty()
    name: string = "111";
}
`

let dto = `
import { ${name}_create } from "./${name}_create"
import { ${name}_delete } from "./${name}_delete"
import { ${name}_update } from "./${name}_update"
import { ${name}_find } from "./${name}_find"
export { ${name}_create, ${name}_delete, ${name}_update, ${name}_find, }
`


async function make_dir() {
    try {
        const dirName = `new_${name}__` + dayjs().format('YYYY-MM-DD-HH-mm-ss');
        const dir_path = path.join(process.cwd(), dirName, name);
        fs.mkdirSync(dir_path, {recursive: true});
        fs.mkdirSync(path.join(process.cwd(), dirName, "demo"), {recursive: true});
        console.log('dir_path---:', dir_path)
        const dto_path = path.join(dir_path, 'dto');
        fs.mkdirSync(dto_path, {recursive: true});
        console.log('dto_path---:', dto_path)
        console.log(`111-文件夹-已成功创建！`);
        return {dir_path, dto_path};
    } catch (err) {
        console.error('创建文件夹时出错：', err);
    }
}


async function make_Controller(dir_path) {
    try {
        const fileName = path.join(dir_path, name + ".ts");
        await fs.writeFileSync(fileName, Controller, 'utf8');
        console.log(`222-文件夹-Controller-已成功创建！`)
    } catch (err) {
        console.error('创建文件夹时出错：', err);
    }
}


async function make_module(dir_path) {
    try {
        const fileName = path.join(dir_path, name + "_module.ts");
        await fs.writeFileSync(fileName, module, 'utf8');
        console.log(`222-文件夹-module-已成功创建！`)
    } catch (err) {
        console.error('创建文件夹时出错：', err);
    }
}


async function make_dto(dto_path) {
    try {
        await fs.writeFileSync(path.join(dto_path, `${name}_create.ts`), dto_create, 'utf8');
        await fs.writeFileSync(path.join(dto_path, `${name}_delete.ts`), dto_delete, 'utf8');
        await fs.writeFileSync(path.join(dto_path, `${name}_update.ts`), dto_update, 'utf8');
        await fs.writeFileSync(path.join(dto_path, `${name}_find.ts`), dto_find, 'utf8');
        await fs.writeFileSync(path.join(dto_path, `dto.ts`), dto, 'utf8');
        console.log(`222-文件夹-dto-已成功创建！`)
    } catch (err) {
        console.error('创建文件夹时出错：', err);
    }
}


async function main_make() {
    let {dir_path, dto_path} = await make_dir()
    await make_Controller(dir_path)
    await make_module(dir_path)
    await make_dto(dto_path)
}


main_make()







