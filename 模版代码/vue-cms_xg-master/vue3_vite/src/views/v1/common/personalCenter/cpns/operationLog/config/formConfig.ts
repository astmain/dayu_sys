//*- coding = utf-8 -*-
//@Time : 2023-02-24 22:59
//@Author : CSDN 沉默小管
//@File : formConfig.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {useStore} from "@/store/piniaAutoImport";
let userStore = useStore("useUser")
let formInit = {
    uid:userStore.userInfo && userStore.userInfo.id
}
export {
    formInit
}