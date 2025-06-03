import { conf } from "../Config/conf"


export async function useStaticAssets(app) {
    app.useStaticAssets(conf.files.path_absolute, { prefix: conf.files.prefix })

    // http://127.0.0.1:3000/files/png.png
    // http://127.0.0.1:3000/files/1748958936474-1wda4w60e1e.png
    // 1748958936474-1wda4w60e1e.png
    return
}