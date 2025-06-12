import * as fs from 'fs'
import * as path from 'path'
import dayjs from 'dayjs'


let name = "user"//文件夹名称
let tag = "用户管理"//文档名称


let Controller = `import { Controller, Module,Get,Post,Body,Req } from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {ApiPost} from "@Config/ApiPost";
import * as dto from "./${name}_dto"
@ApiTags('${tag}-管理')
@Controller('${name}')
export class ${name} {
    @ApiPost("create","新增-${tag}")
    create(@Body() _body: dto.create_${name}, @Req() _req: any) {
        // console.log('_create---_body:', _body)
        return { code: 200, message: "success" }
    }


    @ApiPost("del","删除-${tag}")
    del(@Body() _body: dto.del_${name}, @Req() _req: any) {
        // console.log('_create---_body:', _body)
        return { code: 200, message: "success" }
    }

    @ApiPost("update","更新-${tag}")
    update(@Body() body: dto.update_${name}, @Req() _req: any) {
        // console.log('_create---_body:', _body)
        return { code: 200, message: "success" }
    }

    @ApiPost("findListAll","查询-${tag}-列表")
    findListAll(@Body() _body: dto.find_${name}, @Req() _req: any) {
        // console.log('_create---_body:', _body)
        return { code: 200, message: "success" }
    }
}

@Module({
    controllers: [${name}],
    providers: [],
})
export class ${name}_module {
}


`


let dto = `
import {IsString, IsNumber, IsOptional, IsNotEmpty, IsInt, Min, IsMobilePhone, IsIn} from 'class-validator';
import {ApiProperty, OmitType, PickType} from "@nestjs/swagger";
class Base {
    @ApiProperty({description: 'id', example: 18})
    @IsInt({message: "id:必须是正整数"})
    @Min(0, {message: 'id:必须是大于等于0'})
    id: number;

    @ApiProperty({description: '姓名[必须是字符,不能未空]', example: '小许',})
    @IsString({message: '姓名:必须是字符'})
    @IsNotEmpty({message: '姓名:不能未空'})
    name: string;

    @ApiProperty({description: '年龄', example: 18})
    @IsInt({message: "年龄:必须是正整数"})
    @Min(0, {message: '年龄:必须是大于等于0'})
    age: number;

    @ApiProperty({description: '密码', example: '123456',})
    @IsString({message: '密码:必须是字符'})
    @IsNotEmpty({message: '密码:不能未空'})
    password: string;

    @ApiProperty({description: '手机', example: '15160315110'})
    @IsString({message: '手机:必须是字符'})
    @IsNotEmpty({message: '手机:不能未空'})
    @IsMobilePhone('zh-CN', {}, {message: '手机-格式不正确'})
    tel: string;

    @ApiProperty({description: '邮箱', example: '1311192345.com',})
    @IsString({message: '邮箱:必须是字符'})
    @IsNotEmpty({message: '邮箱:不能未空'})
    email: string;

    @ApiProperty({description: '备注[必须是字符,不能未空]', example: '备注',})
    @IsString({message: '备注:必须是字符'})
    remark: string;

    @ApiProperty({description: '分类', example: '个人'})
    @IsString()
    @IsNotEmpty()
    @IsIn(['个人', '企业'], {message: "分类-['个人', '企业']"})
    kind: string;
}


export class create_${name} extends OmitType(Base, ['id']) {}
export class del_${name} extends PickType(Base, ['id']) {}
export class update_${name} extends Base {}
export class find_${name} extends PickType(Base, ['name']) {}

`


async function make_dir() {
    try {
        const dirName = `new_${name}__` + dayjs().format('YYYY-MM-DD-HH-mm-ss');
        const dir_path = path.join(process.cwd(), dirName, name);
        fs.mkdirSync(dir_path, { recursive: true });
        fs.mkdirSync(path.join(process.cwd(), dirName, "demo"), { recursive: true });
        console.log('dir_path---:', dir_path)

        console.log(`111-文件夹-已成功创建！`);
        return { dir_path };
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


async function make_dto(dto_path) {
    try {
        await fs.writeFileSync(path.join(dto_path, `${name}_dto.ts`), dto, 'utf8');
        console.log(`222-文件夹-dto-已成功创建！`)
    } catch (err) {
        console.error('创建文件夹时出错：', err);
    }
}


async function main_make() {
    let { dir_path } = await make_dir()
    await make_Controller(dir_path)
    await make_dto(dir_path)
}


main_make()







