/*- coding = utf-8 -*-
@Time : 2023/4/4 17:14
@Author : 沉默小管
@File : index.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {createI18n} from "vue-i18n";
import {App} from "vue";
import {messages} from "@/plugins/i18n/lang";
import {store} from "@/store/index";
import useSettingStore from "@/store/modules/setting";

//本地语种
const handleGetLocaleLanguage = ()=>{
    let settingStore = useSettingStore(store)
    return settingStore.language??"zh"
}

const i18n = createI18n({
    // 使用 Composition API 模式，则需要将其设置为false
    legacy: false,
    // 全局注入 $t 函数
    globalInjection: true,
    locale:handleGetLocaleLanguage(),
    messages,
});

export default (app: App) => {
    app.use(i18n)
}
