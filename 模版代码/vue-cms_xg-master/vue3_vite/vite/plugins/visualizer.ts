/*- coding = utf-8 -*-
@Time : 2022/10/11 14:14
@Author : CSDN 沉默小管
@File : visualizer.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {visualizer} from "rollup-plugin-visualizer";
import {Plugin} from "vite";

//依赖分析插件
export default (plugins: Plugin[], isBuild: boolean) => {
    if (process.env.NODE_ENV === "production") {
        // 打包依赖展示
        plugins.push(
            visualizer({
                emitFile: true,//是否被触摸
                filename: "stats.html",//生成分析网页文件名
                open: true,//在默认用户代理中打开生成的文件
                gzipSize: true,//从源代码中收集 gzip 大小并将其显示在图表中
                brotliSize: true,//从源代码中收集 brotli 大小并将其显示在图表中
            })
        );
    }
}
