import {NestFactory} from '@nestjs/core';

// 自定义
import {main_module} from './main_module';
import {Config} from './Config/Config';

async function main() {
    const main = await NestFactory.create(main_module);
    // 配置插件
    await Config.swagger(main)
    await Config.cors(main)
    await Config.files(main)
    await main.listen(Config.conf.project.port);
    // 配置打印
    console.log(Config.conf.project.description)
    console.log(Config.conf.files.description)


}

main();

