import * as fs from 'fs';
import * as path from 'path';
// export const conf = {

//     // 项目参数
//     project: {
//         port: 3000,
//         title: "大宇-后端接口文档-nest-knife4j",
//         version: "0.0.1",
//         url: "http://127.0.0.1:3000/doc.html",
//         description: "接口文档示例 http://127.0.0.1:3000/doc.html",
//         path_absolute: process.cwd(),
//     },


//     // 静态资参数
//     files: {
//         path: "../files",
//         prefix: "/files",
//         url: "http://127.0.0.1:3000/files/",
//         path_absolute: path.join(process.cwd(), '..', "files"),
//         description: "静态资源示例 http://127.0.0.1:3000/files/png.png",
//     }

// }


export const conf = make()

// 配置参数
function make() {
    let project = {
        port: 3000,
        title: "大宇-后端接口文档-nest-knife4j",
        version: "0.0.1",
        url: "http://127.0.0.1:3000/doc.html",
        description: "接口文档示例 http://127.0.0.1:3000/doc.html",
        path_absolute: process.cwd(),
    }


    // 静态资参数
    let files = {
        path: "../files",
        prefix: "/files",
        url: `http://127.0.0.1:${project.port}/files/`,
        path_absolute: path.join(process.cwd(), '..', "files"),
        description: "静态资源示例 http://127.0.0.1:3000/files/png.png",
    }


    return { project, files }
}
