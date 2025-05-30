//coding = utf-8
//@Time : 2022-09-24 0:37
//@Author : CSDN 沉默小管
//@File : index.ts
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {request} from "@/commonNetwork/request"

//在线用户列表
export function requestOnlineUserList(data?:any){
    return request({
        url:'user/onlineUserList',
        method:'post',
        data,
    })
}
//修改状态为退出
export function requestChangeStatusExit(data?:any){
    return request({
        url:'user/changeStatusExit',
        method:'post',
        data,
    })
}