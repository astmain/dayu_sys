/*- coding = utf-8 -*-
@Time : 2023/4/14 11:40
@Author : CSDN 沉默小管
@File : index.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {request} from "@/commonNetwork/request"

//用户信息更新
export function requestPersonalInfoUpdate(data?:any){
    return request({
        url:"/user/userUpdate",
        method:"post",
        data
    })
}
//获取用户详情
export function requestUserInfoDetail(data?:any){
    return request({
        url:"/user/userInfoDetail",
        method:"post",
        data
    })
}