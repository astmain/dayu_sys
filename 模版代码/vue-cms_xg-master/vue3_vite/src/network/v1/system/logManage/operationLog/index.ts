//coding = utf-8
//@Time : 2022-09-24 0:37
//@Author : CSDN 沉默小管
//@File : useClass.ts
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {request} from "@/commonNetwork/request"

//操作日志
export function requestOperationLog(data:any){
    return request({
        url:'log/operationLog',
        method:'post',
        data,
    })
}
//通过uid获取操作日志
export function requestOperationLogByUid(data:any){
    return request({
        url:'log/operationLogByUid',
        method:'post',
        data,
    })
}
//操作删除
export function requestOperationLogDel(data:any){
    return request({
        url:'log/operationLogDel',
        method:'post',
        data,
    })
}
/**
 * 清空操作日志
 * @param data
 */
export function requestCleanOperationLog(){
    return request({
        url:'log/cleanOperationLog',
        method:'post',
    })
}
