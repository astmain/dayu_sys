import {join} from 'path'
// 自定义
import {conf} from './conf';


export async function files(app) {
    const files_path = join(process.cwd(), conf.files.path)
    app.useStaticAssets(files_path, {prefix: conf.files.prefix})


    // let path_static_store = join(process.cwd(), '../files')
    // app.useStaticAssets(files_path, {prefix: "/files"})

}