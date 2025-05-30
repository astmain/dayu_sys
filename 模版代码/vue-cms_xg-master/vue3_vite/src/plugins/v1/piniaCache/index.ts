//*- coding = utf-8 -*-
//@Time : 2022-09-17 0:59
//@Author : CSDN 沉默小管
//@File : index.jsx
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {PiniaPluginContext} from "pinia";
import {toRaw} from "vue";

interface OptionsInterface {
    key?:string
}
const setStorage = (key:string,value:any)=>{
    localStorage.setItem(key,JSON.stringify(value))
}

const getStorage = (key:string)=>{
    return localStorage.getItem(key)?JSON.parse(localStorage.getItem(key) as string):"";
}
const __piniaKey__ = "vueCms"
//pinia数据状态持久化
const piniaPlugin = (options:OptionsInterface)=>{
    return (context:PiniaPluginContext)=>{
        const {store} = context
        const data = getStorage(`${options?.key??__piniaKey__}-${store.$id}`)
        //有值改变就会执行$subscribe函数
        store.$subscribe(()=>{
            setStorage(`${options?.key??__piniaKey__}-${store.$id}`,toRaw(store.$state))
        })
        return {
            ...data
        }
    }
}

export default piniaPlugin


