/*- coding = utf-8 -*-
@Time : 2023/5/7 15:58
@Author : 沉默小管
@File : index.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {request} from "@/commonNetwork/request"

//消息通知列表
export function requestNotifyList(data?:any){
    return request({
        url:"notify/notifyList",
        method:"post",
        data,
    })
}

//发送通知公告
export function requestSendNotice(data?:any){
    return request({
        url:"notify/notifySend",
        method:"post",
        data,
    })
}
//未读的通知公告
export function requestNoReadNotice(data?:any){
    return request({
        url:"notify/noReadNotice",
        method:"post",
        data,
    })
}


//修改消息通知状态
export function requestChangeNoticeStatus(data?:any){
    return request({
        url:"notice/changeNoticeStatus",
        method:"post",
        data,
    })
}