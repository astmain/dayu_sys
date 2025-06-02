import {NestFactory} from '@nestjs/core'

import {NestExpressApplication} from '@nestjs/platform-express'
import {join} from 'path'

// 自定义
import {AppModule} from './app.module'
import {config_docs} from "./config_docs"
import {Config_logger_global_middleware} from "./Config_logger_global_middleware"
import {Config_filter_response} from "./Config_filter_response"
import {Config_filter_catch_error} from "./Config_filter_catch_error"
import {config_globalThis} from "./config_globalThis";

// declare global {
//     var myGlobalConfig: {
//         appName: string;
//         debugMode: boolean;
//     };
// }
config_globalThis()
globalThis.bbb = "bbb"


async function bootstrap() {
    // 定义类型


// 设置
//     globalThis.myGlobalConfig = {
//         appName: 'MyNestApp',
//         debugMode: true,
//     };

// 使用
//     console.log(globalThis.myGlobalConfig.appName);



    console.log(globalThis.aaa);


    let app_http = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true})
    // console.log(`111---222:`, join(process.cwd(), "..", 'static_store'))

    let path_static_store = join(process.cwd(), "..", 'static_store')
    // app_http.useStaticAssets(join(process.cwd(), 'static'), {prefix: "/static"})   //      http://127.0.0.1:10001/static/png.png
    app_http.useStaticAssets(path_static_store, {prefix: "/static_store"})   //      http://127.0.0.1:10001/static/png.png
    let main = config_docs(app_http, 10001)
    // main.app.use(Config_logger_global_middleware)
    // main.app.useGlobalInterceptors(new Config_filter_response())
    // main.app.useGlobalFilters(new Config_filter_catch_error())
    await main.app.listen(main.port);


    // 使用证书
    // const httpApp = await NestFactory.create(AppModule, {cors: true});
    // const httpsApp = await NestFactory.create(AppModule, {cors: true, httpsOptions});
    // await httpApp.listen(3000); // http service
    // await httpsApp.listen(4000); // https service


}

void bootstrap();
console.log(`
      启动成功
      http://127.0.0.1:10001/
      http://127.0.0.1:10001/index
      http://localhost:10001/api/swagger
      http://127.0.0.1:10001/doc.html
    `);
// http://127.0.0.1:3000/docs


/*
http://127.0.0.1:10001/static/1748326663240-36424067.png

{
    "code": 200,
    "kind": "ok",
    "msg": "成功/file_upload_one",
    "result": {
        "file": {
            "fieldname": "file",
            "originalname": "png.png",
            "encoding": "7bit",
            "mimetype": "image/png",
            "destination": "./src/static",
            "filename": "1748326663240-36424067.png",
            "path": "src\\static\\1748326663240-36424067.png",
            "size": 14129
        }
    }
}







* */
