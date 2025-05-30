//coding = utf-8
//@Time : 2022-09-24 0:37
//@Author : CSDN 沉默小管
//@File : useClass.ts
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {request} from "@/commonNetwork/request"

//用户列表
export function requestUserList(data?:any){
    return request({
        url:'user/userList',
        method:'post',
        data,
    })
}
//用户更新
export function requestUserUpdate(data:any){
    return request({
        url:'user/userUpdate',
        method:'post',
        data,
    })
}
interface delDataInterface{
    id:string
}
//用户删除
export function requestUserDel(data:delDataInterface){
    return request({
        url:'user/userDel',
        method:'post',
        data,
    })
}
//用户添加
export function requestUserAdd(data:any){
    return request({
        url:'user/userAdd',
        method:'post',
        data,
    })
}
//修改用户状态
export function requestChangeUserStatus(data:any){
    return request({
        url:'user/userChangeStatus',
        method:'post',
        data,
    })
}