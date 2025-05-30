/*- coding = utf-8 -*-
@Time : 2022/9/24 15:17
@Author : CSDN 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {request} from "@/commonNetwork/request"

//文章列表
export function requestArtList(data?: any){
    return request({
        url:'art/artList',
        data,
        method:'post'
    })
}
/**
 * 单个删除
 * @returns {*}
 */
export function requestArtDel(data: any){
    return request({
        url:'art/artDel',
        data,
        method:'post'
    })
}
/**
 * 添加文章
 */
export function requestArtAdd(data: any){
    return request({
        url:'art/artAdd',
        data,
        method:'post'
    })
}
/**
 * 文章更新
 */
export function requestArtUpdate(data: any){
    return request({
        url:'art/artUpdate',
        data,
        method:'post'
    })
}
/**
 * 文章是否显示
 */
export function requestChangeArtStatus(data: any){
    return request({
        url:'art/artChangeStatus',
        data,
        method:'post'
    })
}
/**
 * 文章内容图片上传
 */
export function requestArtContentImgUpload(data: any){
    return request({
        url:'art/artContentImgUpload',
        headers: {'Content-Type': 'multipart/form-data'},
        data,
        method:'post'
    })
}