//*- coding = utf-8 -*-
//@Time : 2023-02-24 22:57
//@Author : 沉默小管
//@File : tableConfig.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {reactive} from "vue";

let pageConfig = reactive({
    small: true,
    isPageShow: true,
    currentPage: 1,
    pageSize: 10,
    total: 0,
})

export {
    pageConfig
}