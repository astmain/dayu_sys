import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'; //怎么设置addGlobalParameters
import {knife4jSetup} from 'nest-knife4j';
// 自定义
import {conf} from './conf';


export async function swagger(app) {
    const config = new DocumentBuilder()
        .setTitle(conf.project.title)
        .setDescription(conf.project.description)
        .setVersion(conf.project.version)
        .addServer(conf.project.url, 'Local environment')
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
            swaggerVersion: conf.project.version,
            location: `/api/swagger-json`,
        },
        {
            name: "doc_222",
            url: `/api/swagger-json`,
            swaggerVersion: conf.project.version,
            location: `/api/swagger-json`,
        },
    ]);


}


