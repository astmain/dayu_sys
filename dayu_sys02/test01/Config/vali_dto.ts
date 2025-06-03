import {ValidationPipe} from "@nestjs/common";


export async function vali_dto(app) {
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // 删除 DTO 中未定义的属性
        forbidNonWhitelisted: false, // 若传入未定义属性，抛出错误
        transform: false, // 自动类型转换
    }));
}