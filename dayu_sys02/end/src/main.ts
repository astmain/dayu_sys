import {NestFactory} from '@nestjs/core'
import {NestExpressApplication} from '@nestjs/platform-express'
import {join} from 'path'

// 自定义
import {AppModule} from './app.module'
import {config_docs} from "./config_docs"


async function bootstrap() {
    let app_http = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true})
    let path_static_store = join(process.cwd(), "..", 'static_store')
    app_http.useStaticAssets(path_static_store, {prefix: "/static_store"})   //      http://127.0.0.1:10001/static/png.png
    let main = config_docs(app_http, 10001)
    await main.app.listen(main.port);
}

void bootstrap();
console.log(`
      启动成功
      http://127.0.0.1:10001/
      http://127.0.0.1:10001/index
      http://localhost:10001/api/swagger
      http://127.0.0.1:10001/doc.html
    `);
