/*- coding = utf-8 -*-
@Time : 2022/9/24 15:17
@Author : CSDN 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {request} from "@/commonNetwork/request"

//文章栏目列表
export function requestArtColumnList(data?: any){
    return request({
        url:'artColumn/artColumnList',
        data,
        method:'post'
    })
}
//文章栏目添加
export function requestArtColumnAdd(data: any){
    return request({
        url:'artColumn/artColumnAdd',
        data,
        method:'post'
    })
}
//文章栏目删除
export function requestArtColumnDel(data: any){
    return request({
        url:'artColumn/artColumnDel',
        data,
        method:'post'
    })
}
//文章栏目编辑
export function requestArtColumnUpdate(data: any){
    return request({
        url:'artColumn/artColumnUpdate',
        data,
        method:'post'
    })
}