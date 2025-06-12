import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; //怎么设置addGlobalParameters
import { knife4jSetup } from 'nest-knife4j';
// 自定义


//  配置:swagger文档nest-knife4j
export async function swagger_Knife4j(app) {
    const config = new DocumentBuilder()
        .setTitle("文档标题")
        .setDescription("文档描述:测试使用")
        .setVersion("0.0.1")
        .addServer("1111", 'Local environment')
        .addGlobalParameters({
            name: 'token',
            in: 'header',
            description: 'token',
            required: true,
            schema: { type: "string", default: "token11111111", }
        })
        .build();


    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/swagger', app, document);
    knife4jSetup(app, [
        {
            name: "doc_111",
            url: `/api/swagger-json`,
            swaggerVersion: "111",
            location: `/api/swagger-json`,
        },

    ]);


}


