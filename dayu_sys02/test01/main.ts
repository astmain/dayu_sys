import { NestFactory } from '@nestjs/core';

// 自定义
import { main_module } from './main_module';;
import { conf } from './Config/conf';
import { swagger } from './Config/swagger';



async function main() {
  const main = await NestFactory.create(main_module);
  const doc = await swagger(main)
  await main.listen(conf.port);
  console.log(doc)


}
main();

