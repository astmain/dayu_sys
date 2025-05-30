/*- coding = utf-8 -*-
@Time : 2022/9/14 14:11
@Author : CSDN 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import type {App} from "vue"
import animateCss from "./animateCss"
import axios, {AxiosStatic} from "axios";
import model from "./model";
import tab from "./tab";
import i18n from "./i18n";
import download from "./download";
import dict from "./dict";
import SvgIcon from "@/components/svgIcon/index";
import {JsonViewer} from "vue3-json-viewer"
import "vue3-json-viewer/dist/index.css";
import auth from "./auth";
import imageLazy from "./imageLazy/index";
import virtualList from "./virtualList/index";
import elementPlus from "./elementPlus"

import VueTreeSelect from 'vue3-treeselect'
import 'vue3-treeselect/dist/vue3-treeselect.css'



// 全局自定义属性
declare module 'vue' {
    interface ComponentCustomProperties {
        $axios: AxiosStatic;
    }
}

const modules = [animateCss,i18n,imageLazy,virtualList,elementPlus]

export default (app:App)=>{
    app.config.globalProperties.$axios = axios
    app.config.globalProperties.$model = model
    app.config.globalProperties.$tab = tab
    app.config.globalProperties.$download = download
    app.config.globalProperties.$auth = auth
    app.config.globalProperties.$dict = dict

    app.component("SvgIcon",SvgIcon)
    app.component("JsonViewer",JsonViewer)
    app.component("TreeSelect",VueTreeSelect)
    modules.map((val)=>{
        return val(app)
    })
}
