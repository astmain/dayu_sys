import {ValidationPipe} from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {knife4jSetup} from 'nest-knife4j';

export function config_docs(app: any, port: number) {
    const name = 'config_docs1';
    const version = '0.0.1';
    app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
        .setTitle(name)
        .setDescription(`${name}-${version} API description`)
        .setVersion(version)
        .addServer(`http://localhost:${port}/`, 'Local environment')

        .addApiKey({
            type: 'apiKey',
            name: 'Authorization', // 请求头名称
            in: 'header'
        })

        .addApiKey({
            type: 'apiKey',
            name: 'token', // 请求头名称
            in: 'header'
        }
        ,  'token')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                in: 'header',
            },
            'access-token', // 这是每个操作安全名称
        )


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