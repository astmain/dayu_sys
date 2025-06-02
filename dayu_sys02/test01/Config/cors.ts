export async function cors(app) {
    app.enableCors({
        origin: true,
        methods: 'GET,PUT,POST',
        allowedHeaders: 'Content-Type,Authorization',
        exposedHeaders: 'Content-Range,X-Content-Range',
        credentials: true,
        maxAge: 3600,
    })

}