import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'; //怎么设置addGlobalParameters
import {knife4jSetup} from 'nest-knife4j';
// 自定义
import {conf} from './conf';


export async function swagger(app) {
    const config = new DocumentBuilder()
        .setTitle(conf.title)
        .setDescription(conf.description)
        .setVersion(conf.version)
        .addServer(conf.url, 'Local environment')
        .addGlobalParameters({
            name: 'token',
            in: 'header',
            description: 'token',
            required: true,
            schema: {type: "string", default: "token",}
        })
        .build();


    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/swagger', app, document);
    knife4jSetup(app, [
        {
            name: "doc_111",
            url: `/api/swagger-json`,
            swaggerVersion: conf.version,
            location: `/api/swagger-json`,
        },
        {
            name: "doc_222",
            url: `/api/swagger-json`,
            swaggerVersion: conf.version,
            location: `/api/swagger-json`,
        },
    ]);


    return `
    接口文档    http://127.0.0.1:${conf.port}/doc.html
  `
}


