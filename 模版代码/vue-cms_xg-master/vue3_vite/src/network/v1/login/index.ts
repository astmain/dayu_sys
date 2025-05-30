/*- coding = utf-8 -*-
@Time : 2022/9/7 10:10
@Author : CSDN 沉默小管
@File : index.css
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {request} from "@/commonNetwork/request"

//登录
export function requestLogin(data:any){
    return request({
        url:"/user/login",
        method:"post",
        data,
    })
}
//退出
export function requestLogout(data:any){
    return request({
        url:"/user/logout",
        method:"post",
        data,
    })
}
//获取信息
export function requestGetInfo(data:any){
    return request({
        url:"/user/userInfo",
        method:"post",
        data,
    })
}
//登录没有验证码
export function requestLoginNoCode(data:any){
    return request({
        url:"/captchaImage",
        method:"get",
        data,
    })
}
//获取验证码图片
export function requestGetCodeImg(){
    return request({
        url:"/captchaImage",
        method:"get",
    })
}
//获取用户来源
export function requestObtainUserSources(data){
    return request({
        url:"/home/obtainUserSources",
        method:"post",
        data
    })
}

//随机登录
export function requestRandomAccountLogin(data){
    return request({
        url:"/user/randomAccountLogin",
        method:"post",
        data
    })
}
//判断系统配置是否配置
export function requestIsExistSysConfig(data){
    return request({
        url:"/user/isExistSysConfig",
        method:"post",
        data
    })
}
