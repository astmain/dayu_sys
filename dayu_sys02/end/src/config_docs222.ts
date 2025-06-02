import {ValidationPipe} from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {knife4jSetup} from 'nest-knife4j';

export function config_docs222(app: any, port: number) {
    const name = 'config_docs2';
    const version = '0.0.1';
    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
        .setTitle(name)
        .setDescription(`${name}-${version} API description`)
        .setVersion(version)
        // .addServer(`http://localhost:${port}/`, 'Local environment')
        .addTag('商城管理222', '商城管理222')
        .addApiKey({
            type: 'apiKey',
            name: 'Authorization', // 请求头名称
            in: 'header'
        })

        .addApiKey({
            type: 'apiKey',
            name: 'token', // 请求头名称
            in: 'header'
        })


        .build();



    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/swagger', app, document);
    knife4jSetup(app, [
        {
            name: name,
            url: `/api/swagger-json`,
            swaggerVersion: version,
            location: `/api/swagger-json`,
        },
    ]);
    let main = {app, port, name, version};
    return main;
}