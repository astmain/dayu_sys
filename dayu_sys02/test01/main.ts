import {NestFactory} from '@nestjs/core';
// 自定义
import {Controller_module} from '@Controller/Controller_module';
import {Config} from '@Config/Config';
import {config_docs} from "@Config/config_docs";


async function main() {
    const app = await NestFactory.create(Controller_module);


    // 配置插件
    await Config.cors(app)
    // await Config.swagger_Knife4j(app)
    config_docs(app, Controller_module, Config.conf.project.port)
    await Config.files_static(app)
    // await Config.filter_error_sys(app)
    await Config.filter_error_dto(app)
    // await Config.filter_error_prisma(app)
    await app.listen(Config.conf.project.port);
    // 配置打印
    console.log(Config.conf.project.description)
    console.log(Config.conf.files.description)
}

main();
