/*- coding = utf-8 -*-
@Time : 2022/12/26 9:40
@Author : CSDN 沉默小管
@File : data.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {request} from "@/commonNetwork/request"

// 字典列表
export function requestDictDataList(data?:any) {
    return request({
        url: 'dict/dictData',
        method: 'post',
        data
    })
}
// 新增字典数据
export function requestDictDataAdd(data?:any) {
    return request({
        url: 'dict/dictDataAdd',
        method: 'post',
        data
    })
}


// 修改字典数据
export function requestDictDataUpdate(data:any) {
    return request({
        url: 'dict/dictDataUpdate',
        method: 'post',
        data
    })
}
interface delDataInterface{
    id:string
}
// 删除字典数据
export function requestDictDataDel(data:delDataInterface) {
    return request({
        url: 'dict/dictDataDel',
        method: 'post',
        data
    })
}

