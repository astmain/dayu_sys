import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilters } from './common/filters/httpException.filters';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import {corsConfig, handleBuildSwagger, sysBase} from '@/utils/config';
import { JwtAuthGuard } from './modules/auth/jwtAuth.guard';
import * as compression from 'compression';
import {MiddlewareCustom} from "@/common/middleware";

// nest-status-monitor
// node中如何使用Nest.js实现简易版请求监控
async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  //compression插件挂载
  //相应数据发送到客户端之前对其进行压缩，有助于减少数据大小并缩短响应时间
  app.use(compression())

  //创建swagger
  handleBuildSwagger(app)

  app.enableCors(corsConfig)//设置跨域

  app.use(new MiddlewareCustom().use)//全局中间件使用

  //鉴权 守卫
  app.useGlobalGuards(new JwtAuthGuard(app))

  app.useGlobalInterceptors(new ResponseInterceptor());//全局拦截器

  //全局管道校验
  app.useGlobalPipes(new ValidationPipe({
    transform:true,//自动变换
  }))

  app.useGlobalFilters(new HttpExceptionFilters(app));//全局过滤 异常过滤器

  await app.listen(sysBase.port);
  
}
bootstrap().then(()=>{
  console.log(`http://localhost:${sysBase.port}`);
});
