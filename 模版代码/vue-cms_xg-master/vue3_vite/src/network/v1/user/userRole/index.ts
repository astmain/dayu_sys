/*- coding = utf-8 -*-
@Time : 2023/2/10 10:00
@Author : CSDN 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {request} from "@/commonNetwork/request"

//用户列表
export function requestRoleList(data?:any){
    return request({
        url:'role/roleList',
        method:'post',
        data,
    })
}
//角色更新
export function requestRoleUpdate(data:any){
    return request({
        url:'role/roleUpdate',
        method:'post',
        data,
    })
}
interface delDataInterface{
    id:string
}
//角色删除
export function requestRoleDel(data:delDataInterface){
    return request({
        url:'role/roleDel',
        method:'post',
        data,
    })
}
//角色添加
export function requestRoleAdd(data:any){
    return request({
        url:'role/roleAdd',
        method:'post',
        data,
    })
}
//修改角色状态
export function requestChangeRoleStatus(data:any){
    return request({
        url:'role/changeRoleStatus',
        method:'post',
        data,
    })
}