//跨域配置
export async function filter_cors(app) {
    app.enableCors({
        origin: true,
        methods: 'GET,PUT,POST',
        allowedHeaders: 'Content-Type,Authorization',
        exposedHeaders: 'Content-Range,X-Content-Range',
        credentials: true,
        maxAge: 3600,
    })

}