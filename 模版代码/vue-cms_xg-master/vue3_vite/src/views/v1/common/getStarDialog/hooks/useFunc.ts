/*- coding = utf-8 -*-
@Time : 2023/3/30 9:20
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";

export const useFunc = () =>{
    let dialogTitle = ref("")
    let key = ref(0)
    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    let appStore = useStore("useApp")
    //跳转gitee
    const handleGetStar= ()=>{
        appStore.handleChangeGetStarStatus()
        window.open("https://gitee.com/derekgo/vue-cms_xg");
        handleCancel();
    }
    const handleCancel = ()=>{
        dialogShow.value =false
        key.value = Math.random();
    }
    //初始化弹出框
    const handleOpenDialog = ()=> {
        dialogTitle.value = "你有一条重要消息！"
        key.value = Math.random()
        dialogShow.value = true
    }
    return {
        handleOpenDialog,handleCancel,handleGetStar,dialogShow,loading,dialogTitle,key
    }
}
