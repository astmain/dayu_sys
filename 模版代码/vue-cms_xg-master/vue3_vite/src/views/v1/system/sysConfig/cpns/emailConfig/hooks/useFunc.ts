/*- coding = utf-8 -*-
@Time : 2023/4/11 10:17
@Author : CSDN 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/


import {defineAsyncComponent, onMounted, ref, shallowRef} from "vue"
import {TabsPaneContext} from "element-plus";
import {useStore} from "@/store/piniaAutoImport";
const AliEmail = defineAsyncComponent(() => import("../cpns/aliEmail/index.vue"))
const QQEmail = defineAsyncComponent(() => import("../cpns/qqEmail/index.vue"))

export const useFunc = ()=>{
    const activeName = ref<any>('QQEmail')
    const curComponent = shallowRef<any>(QQEmail)
    const appStore:any = useStore("useApp")
    let componentArr = {
        "QQEmail": QQEmail,
        "AliEmail": AliEmail,
    }
    const handleClick = (tab: TabsPaneContext, event: Event) => {
        activeName.value = tab?.paneName
        curComponent.value = componentArr[tab?.paneName]
    }
    return {
        appStore,activeName,curComponent,handleClick
    }
}
