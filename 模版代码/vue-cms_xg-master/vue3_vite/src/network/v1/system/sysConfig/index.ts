//*- coding = utf-8 -*-
//@Time : 2022-12-20 22:29
//@Author : CSDN 沉默小管
//@File : index.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {request} from "@/commonNetwork/request"

//系统配置
export function requestSysConfig(data?:any){
    return request({
        url:"sysConfig/sysConfig",
        method:"post",
        data,
    })
}
//系统配置更新
export function requestSysConfigUpdate(data:any){
    return request({
        url:"sysConfig/sysConfigUpdate",
        method:"post",
        data,
    })
}
//发送邮箱
export function requestSendEmail(data:any){
    return request({
        url:"sysConfig/sendEmail",
        method:"post",
        data,
    })
}