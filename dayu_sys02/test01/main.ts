import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from "@nestjs/common";
// 自定义
import {main_module} from './main_module';
import {Config} from './Config/Config';


async function main() {
    const app = await NestFactory.create(main_module);
    // 配置插件
    await Config.cors(app)
    await Config.files(app)
    await Config.swagger(app)
    await Config.vali_dto(app)
    await app.listen(Config.conf.project.port);
    // 配置打印
    console.log(Config.conf.project.description)
    console.log(Config.conf.files.description)
}

main();

