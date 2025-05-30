//coding = utf-8
//@Time : 2022-09-10 22:43
//@Author : CSDN 沉默小管
//@File : useClass.ts
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import {request} from "@/commonNetwork/request"

//生成路由
export function requestCurRouters(){
    return request({
        url:"/menu/curRouters",
        method:"get",
    })
}