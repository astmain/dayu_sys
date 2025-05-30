/*- coding = utf-8 -*-
@Time : 2023/4/13 14:20
@Author : CSDN 沉默小管
@File : index.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

//操作列表
import {request} from "@/commonNetwork/request"

/**
 * 报错日志
 * @param data
 */
export function requestErrorLog(data:any){
    return request({
        url:'log/errorLog',
        method:'post',
        data,
    })
}
/**
 * 清空报错日志
 * @param data
 */
export function requestCleanErrorLog(){
    return request({
        url:'log/cleanErrorLog',
        method:'post',
    })
}