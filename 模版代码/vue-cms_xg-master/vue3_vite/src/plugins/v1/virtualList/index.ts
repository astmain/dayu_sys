/*- coding = utf-8 -*-
@Time : 2023/4/4 17:14
@Author : 沉默小管
@File : index.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {App} from "vue";
import virtualList from "vue-virtual-list-xg"
import "vue-virtual-list-xg/lib/style.css"

export default (app: App) => {
    app.use(virtualList)
}
