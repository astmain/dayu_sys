/*- coding = utf-8 -*-
@Time : 2023/5/7 15:58
@Author : 沉默小管
@File : index.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {request} from "@/commonNetwork/request"

//通知公告列表
export function requestNoticeList(data?:any){
    return request({
        url:"notice/noticeList",
        method:"post",
        data,
    })
}
//通知公告添加
export function requestNoticeAdd(data?:any){
    return request({
        url:"notice/noticeAdd",
        method:"post",
        data,
    })
}
//通知公告更新
export function requestNoticeUpdate(data?:any){
    return request({
        url:"notice/noticeUpdate",
        method:"post",
        data,
    })
}

//通知公告删除
export function requestNoticeDel(data?:any){
    return request({
        url:"notice/noticeDel",
        method:"post",
        data,
    })
}
