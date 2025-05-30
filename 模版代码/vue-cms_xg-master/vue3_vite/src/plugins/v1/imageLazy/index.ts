/*- coding = utf-8 -*-
@Time : 2023/4/4 17:14
@Author : 沉默小管
@File : index.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {App} from "vue";
import imageLazy from "vue-image-lazy-xg";
import "vue-image-lazy-xg/lib/style.css";

export default (app: App) => {
    app.use(imageLazy)
}
