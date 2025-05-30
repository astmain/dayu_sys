/*- coding = utf-8 -*-
@Time : 2022/10/13 15:51
@Author : CSDN 沉默小管
@File : svgIcons.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {Plugin} from "vite";
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";
import path from "path";

//读取本地svg图标插件
export default (plugins: Plugin[], isBuild: boolean) => {
    plugins.push(
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), 'src/assets/v1/icons/svg')],
            // 指定symbolId格式
            symbolId: 'icon-[name]',
        })
    );
}