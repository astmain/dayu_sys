/*- coding = utf-8 -*-
@Time : 2023/4/11 10:17
@Author : CSDN 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/


import {defineAsyncComponent, shallowRef,ref} from "vue";
import type { TabsPaneContext } from 'element-plus'
import {useStore} from "@/store/piniaAutoImport";
const AliTextMsg = defineAsyncComponent(() => import("../cpns/aliTextMsg/index.vue"))
const TxMsgConfig = defineAsyncComponent(() => import("../cpns/txTextMsg/index.vue"))

export const useFunc = ()=>{
    const activeName = ref<any>('TxMsgConfig')
    const curComponent = shallowRef<any>(TxMsgConfig)
    const appStore:any = useStore("useApp")
    let componentArr = {
        "AliTextMsg": AliTextMsg,
        "TxMsgConfig": TxMsgConfig,
    }
    const handleClick = (tab: TabsPaneContext, event: Event) => {
        activeName.value = tab?.paneName
        curComponent.value = componentArr[tab?.paneName]
    }
    return {
        appStore,activeName,curComponent,handleClick
    }
}
