/*- coding = utf-8 -*-
@Time : 2023/4/2 10:56
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import baseInfo from "@/utils/config";
import {useStore} from "@/store/piniaAutoImport";
import {debounce} from "@/utils/lodash";

export const useFunc = ()=>{
    const appStore:any = useStore("useApp")
    //动态获取窗口宽度，动态隐藏和显示左侧导航栏
    const handleGetWidth = ()=>{

        appStore.toggleDevice(document.documentElement.clientWidth<baseInfo.PhoneWidth?"mobile":"desktop")
        window.addEventListener("resize",debounce(function(){
                appStore.toggleDevice(document.documentElement.clientWidth<baseInfo.PhoneWidth?"mobile":"desktop")
                if(document.documentElement.clientWidth<baseInfo.PhoneWidth){
                    appStore.closeSideBar("")
                }
            },500))
    }
    return {
        handleGetWidth
    }
}
