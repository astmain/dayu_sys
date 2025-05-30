/*- coding = utf-8 -*-
@Time : 2023/4/14 11:40
@Author : CSDN 沉默小管
@File : index.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {request} from "@/commonNetwork/request"

//gitee登录
export function requestGiteeLogin(data?:any){
    return request({
        url:"/user/oauth/giteeLogin",
        method:"post",
        data
    })
}
//gitee解绑
export function requestUnbindGitee(data?:any){
    return request({
        url:"/user/unbindGitee",
        method:"post",
        data
    })
}
//qq登录
export function requestQQLogin(data?:any){
    return request({
        url:"/user/oauth/qqLogin",
        method:"post",
        data
    })
}
//qq解绑
export function requestUnbindQQ(data?:any){
    return request({
        url:"/user/unbindQQ",
        method:"post",
        data
    })
}