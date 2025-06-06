import {SWAGGER_TAG_KEY} from './SwaggerTag';
import {INestApplication} from '@nestjs/common';
import {SwaggerModule, DocumentBuilder, OpenAPIObject} from '@nestjs/swagger';
import {knife4jSetup} from 'nest-knife4j';
import {pinyin} from "pinyin-pro"

export function config_docs(app: any, AppModule, port: number) {
    const modulesMap = app.select(AppModule)?.container.getModules();
    const docs: any[] = [];

    const tagObj: { name: string; url: string; include: Map<string, any> }[] = [];

    for (const [key, moduleRef] of modulesMap) {
        if (!moduleRef.metatype || key === 'AppModule') continue;

        const controllers = [...moduleRef.controllers.values()].map(wrapper => wrapper.metatype).filter(Boolean);

        if (controllers.length === 0) continue;

        const tag = Reflect.getMetadata(SWAGGER_TAG_KEY, controllers[0]) ?? 'default';

        const existingTag = tagObj.find(item => item.name === tag);
        if (existingTag) {
            existingTag.include.set(moduleRef.metatype.name, moduleRef.metatype);
        } else {
            let url_json = pinyin(`${tag.url}-json`, {toneType: "none", nonZh: 'consecutive', separator: '_',});
            console.log(`111---url_json:`, url_json)

            console.log(`111---222:`, pinyin(`我的`, {toneType: "none", nonZh: 'consecutive', separator: '_',}))

            tagObj.push({
                // name: url_json,
                // url: url_json,
                name: tag,
                url: `${tag}`,

                include: new Map([[moduleRef.metatype.name, moduleRef.metatype]]),
            });
        }
    }
    tagObj.map(item => {
        const config = new DocumentBuilder().setTitle(`${item.name} API`).setDescription(`${item.name} 模块接口文档`).setVersion('1.0.0').addTag(item.name).addServer(`http://localhost:${port}`, '本地环境').build();

        const document = SwaggerModule.createDocument(app, config, {
            include: Array.from(item.include.values()),
        });
        SwaggerModule.setup(item.url, app, document);
        // 提供纯 JSON 接口
        app.use(`${item.url}-json`, (_: any, res: { json: (arg0: OpenAPIObject) => void }) => {
            res.json(document);
        });

        let url_json = pinyin(`${item.url}-json`, {toneType: "none", nonZh: 'consecutive', separator: '_',});

        console.log(`222---url_json:`, url_json)
        docs.push({
            // name: url_json,
            // url: url_json,
            name: item.name,
            url: `${item.url}-json`,

            swaggerVersion: '1.0.0',
            location: item.url,
        });
    });

    knife4jSetup(app, docs);
}
