//coding = utf-8
//@Time : 2022-09-24 0:37
//@Author : CSDN 沉默小管
//@File : index.ts
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {request} from "@/commonNetwork/request"

//系统cpu和内存监控
export function requestSysMonitor(data?:any){
    return request({
        url:'statusMonitor/sysMonitor',
        method:'post',
        data,
    })
}
//缓存列表
export function requestSysCacheList(data?:any){
    return request({
        url:'statusMonitor/sysCacheList',
        method:'post',
        data,
    })
}

//查看缓存下级
export function requestSysCacheChild(data?:any){
    return request({
        url:'statusMonitor/sysCacheChild',
        method:'post',
        data,
    })
}
//系统缓存内容
export function requestSysCacheContent(data?:any){
    return request({
        url:'statusMonitor/sysCacheContent',
        method:'post',
        data,
    })
}
//更新缓存数据
export function requestSysCacheDel(data?:any){
    return request({
        url:'statusMonitor/sysCacheDel',
        method:'post',
        data,
    })
}
