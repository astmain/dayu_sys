/*- coding = utf-8 -*-
@Time : 2022/9/21 14:49
@Author : 沉默小管
@File : piniaAutoImport.tsx
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
//自动加载pinia
import { useSetting,useApp,useUser,useTagsView,usePermission,useDict } from '@/store/index'

const storeExports = {
    useSetting,
    useApp,
    useUser,
    useTagsView,
    usePermission,
    useDict,
}
type ReturnType<T> = {
    [K in keyof T]?: T[K] //利用keyof对类型所有的字段加可选属性
}
function useStore<T extends keyof typeof storeExports>(storeName:T):any{
    let store = storeExports[storeName]()
    // let storeRefs = storeToRefs(store);//转为响应式数据
    return store
}
export {useStore}
//数据响应式
//返回值进行类型判断
// export function useStoreToRefs<T extends keyof typeof storeExports>(storeName:T):ReturnType<any>{
//     let store = storeExports[storeName]()
//     let storeRefs = storeToRefs(store);//转为响应式数据
//     return {store,...storeRefs}
// }
// let {store:settingStore,title} = useStoreToRefs("useSetting")
// const handleClickTest = (text:string)=>{
// settingStore.setTitle("成功了123")
// settingStore.changeSetting({
//   key: 'title',
//   value: "成功了123"
// })
// console.log(title.value,"titletitletitle");
// }





