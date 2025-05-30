//*- coding = utf-8 -*-
//@Time : 2022-10-05 23:18
//@Author : CSDN 沉默小管
//@File : index.jsx
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {request} from "@/commonNetwork/request"

//菜单栏
export function requestMenuList(data?:any){
    return request({
        url:"menu/menuList",
        method:"post",
        data
    })
}

//添加导航栏列表
export function requestMenuAdd(data:any){
    return request({
        url:"menu/menuAdd",
        method:"post",
        data
    })
}
//更新导航栏列表
export function requestMenuUpdate(data:any){
    return request({
        url:"menu/menuUpdate",
        method:"post",
        data
    })
}
//删除菜单栏
export function requestMenuDel(data:any){
    return request({
        url:"menu/menuDel",
        method:"post",
        data
    })
}