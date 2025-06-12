import { NestFactory } from '@nestjs/core';

// 自定义
import { main_module } from './main_module';
import { Config } from '@Config/Config';

async function bootstrap() {
  const app = await NestFactory.create(main_module);
  // 配置插件
  await Config.swagger_Knife4j(app)
  await Config.filter_cors(app)
  await Config.filter_error_sys(app)
  await Config.filter_error_dto(app)

  await app.listen(process.env.PORT ?? 3000);
  console.log(`
    启动成功
    swagger_Knife4j文档: http://127.0.0.1:${process.env.PORT ?? 3000}/doc.html
    
    `);


}
bootstrap();
