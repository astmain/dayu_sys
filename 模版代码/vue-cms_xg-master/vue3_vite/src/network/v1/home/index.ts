//*- coding = utf-8 -*-
//@Time : 2023-03-26 16:00
//@Author : 沉默小管
//@File : index.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {request} from "@/commonNetwork/request"

//后台访问人数总数
export function requestAccessStatistics(){
    return request({
        url:"/home/accessStatistics",
        method:"post"
    })
}
//访问人数时间段
export function requestAccessTimeSlot(data:any){
    return request({
        url:"/home/accessTimeSlot",
        method:"post",
        data,
    })
}
//文章总数
export function requestArtStatistics(){
    return request({
        url:"/home/artStatistics",
        method:"post"
    })
}
//用户来源排名
export function requestUserSourcesTop(){
    return request({
        url:"/home/userSourcesTop",
        method:"post"
    })
}
//活跃页面排名
export function requestActivePageTop(){
    return request({
        url:"/home/activePageTop",
        method:"post"
    })
}
//监听用户访问页面
export function requestWatchUserAccessPage(data:any){
    return request({
        url:"/home/watchUserAccessPage",
        method:"post",
        data
    })
}
