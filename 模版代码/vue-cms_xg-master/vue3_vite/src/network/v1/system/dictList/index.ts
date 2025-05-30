//*- coding = utf-8 -*-
//@Time : 2022-12-20 22:29
//@Author : CSDN 沉默小管
//@File : index.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {request} from "@/commonNetwork/request"

//字典
export function requestDictList(data?:any){
    return request({
        url:"dict/dictList",
        method:"post",
        data,
    })
}
//字典详情
export function requestDictDetail(data:any){
    return request({
        url:"dict/dictDetail",
        method:"post",
        data,
    })
}

//添加字典
export function requestDictAdd(data:any){
    return request({
        url:"dict/dictAdd",
        method:"post",
        data
    })
}
//更新字典
export function requestDictUpdate(data:any){
    return request({
        url:"dict/dictUpdate",
        method:"post",
        data
    })
}
//字典删除
export function requestDictDel(data:any){
    return request({
        url:"dict/dictDel",
        method:"post",
        data
    })
}