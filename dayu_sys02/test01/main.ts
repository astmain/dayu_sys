import {NestFactory} from '@nestjs/core';

// 自定义
import {main_module} from './main_module';
import {conf} from './Config/conf';
import {swagger} from './Config/swagger';
import {Config} from './Config/Config';


async function main() {
    const main = await NestFactory.create(main_module);
    await Config.swagger(main)
    await Config.cors(main)
    await main.listen(Config.conf.port);
    console.log("文档接口", Config.conf.url)


}

main();

