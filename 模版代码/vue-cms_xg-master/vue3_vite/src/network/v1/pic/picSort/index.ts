//coding = utf-8
//@Time : 2022-09-24 0:37
//@Author : CSDN 沉默小管
//@File : useClass.ts
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {request} from "@/commonNetwork/request"

//图片分类列表
export function requestImgSortList(data?:any){
    return request({
        url:'imgSort/imgSortList',
        method:'post',
        data,
    })
}
//图片分类更新
export function requestImgSortUpdate(data:any){
    return request({
        url:'imgSort/imgSortUpdate',
        method:'post',
        data,
    })
}
//图片分类删除
export function requestImgSortDel(data:any){
    return request({
        url:'imgSort/imgSortDel',
        method:'post',
        data,
    })
}
//图片分类添加
export function requestImgSortAdd(data:any){
    return request({
        url:'imgSort/imgSortAdd',
        method:'post',
        data,
    })
}