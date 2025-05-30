/*- coding = utf-8 -*-
@Time : 2022/9/24 15:17
@Author : CSDN 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {request} from "@/commonNetwork/request"

//文章分类列表
export function requestArtSortList(data?: any){
    return request({
        url:'artSort/artSortList',
        data,
        method:'post'
    })
}
//文章分类添加
export function requestArtSortAdd(data: any){
    return request({
        url:'artSort/artSortAdd',
        data,
        method:'post'
    })
}
//文章分类删除
export function requestArtSortDel(data: any){
    return request({
        url:'artSort/artSortDel',
        data,
        method:'post'
    })
}
//文章分类编辑
export function requestArtSortUpdate(data: any){
    return request({
        url:'artSort/artSortUpdate',
        data,
        method:'post'
    })
}