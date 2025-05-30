//coding = utf-8
//@Time : 2022-09-24 0:37
//@Author : CSDN 沉默小管
//@File : useClass.ts
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {request} from "@/commonNetwork/request"

//图片列表
export function requestImgList(data?:any){
    return request({
        url:'img/imgList',
        method:'post',
        data,
    })
}
//图片更新
export function requestImgUpdate(data:any){
    return request({
        headers: {'Content-Type': 'multipart/form-data'},
        url:'img/imgUpdate',
        method:'post',
        data,
    })
}
//图片删除
export function requestImgDel(data:any){
    return request({
        url:'img/imgDel',
        method:'post',
        data,
    })
}
//图片添加
export function requestImgAdd(data:any){
    return request({
        headers: {'Content-Type': 'multipart/form-data'},
        url:'img/imgAdd',
        method:'post',
        data,
    })
}