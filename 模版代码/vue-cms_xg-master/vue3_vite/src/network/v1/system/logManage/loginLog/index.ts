//coding = utf-8
//@Time : 2022-09-24 0:37
//@Author : CSDN 沉默小管
//@File : useClass.ts
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {request} from "@/commonNetwork/request"

//访问日志
export function requestLoginLogList(data?:any){
    return request({
        url:'log/loginLogList',
        method:'post',
        data,
    })
}
//通过uid获取访问日志
export function requestLoginLogListByUid(data?:any){
    return request({
        url:'log/loginLogListByUid',
        method:'post',
        data,
    })
}
/**
 * 清空访问日志
 * @param data
 */
export function requestCleanLoginLog(){
    return request({
        url:'log/cleanLoginLog',
        method:'post',
    })
}
