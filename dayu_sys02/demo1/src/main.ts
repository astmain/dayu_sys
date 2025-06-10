import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger_Knife4j } from './Config/swagger_Knife4j';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  await swagger_Knife4j(app)




  await app.listen(process.env.PORT ?? 3000);
  console.log(`
    启动成功
    swagger_Knife4j文档: http://127.0.0.1:${process.env.PORT ?? 3000}/doc.html
    
    `);
}
bootstrap();
