/*- coding = utf-8 -*-
@Time : 2022/9/25 17:27
@Author : CSDN 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

// ui封装模型

import {ElLoading, ElMessage, ElMessageBox, ElNotification} from "element-plus";
import type {VNode,Component} from "vue"

type msgType = "success"|"warning"|"info"|"error"
type messageType = string | VNode | Function

type msgBoxOptionType = "success"|"warning"|"info"|"error"
interface msgBoxOptionInterface {
    confirmButtonText:string,
    cancelButtonText?:string,
    distinguishCancelAndClose?: boolean,
    type?:msgBoxOptionType,
    draggable?:boolean,
}

type noticeTypeInterface = "success" | "error" | "warning" | "info"

type msgBoxTypeInterface = "confirm" | "prompt" | "alert"

interface optionInterface{
    target?:HTMLElement|string
    body?:boolean
    fullscreen?:boolean
    text:string
    background?:string
    spinner?:string
}

interface msgOtherOptionsInterface {
    plain?:boolean
    icon?:string | Component
    dangerouslyUseHTMLString?:boolean
    customClass?:string
    duration?:number
    showClose?:boolean
    center?:boolean
    onClose?:() => void
    appendTo?:string | HTMLElement
    grouping?:boolean
    repeatNum?:number
}
const typeArr = [ "success" , "warning" , "error" , "info"]
const msgBoxTypeArr = ["confirm" , "prompt" , "alert"]

export default {
    /**
     * 消息提示
     */
    handleMsg(message:messageType,msgType:msgType="success",otherOptions?:msgOtherOptionsInterface){
        let curType = msgType.toLowerCase()
        if(!typeArr.includes(curType)){
            curType="success"
        }else{
            curType=msgType
        }
        ElMessage({
            message,
            type:curType,
            ...otherOptions
        })
    },


    /**
     * 消息彈出框
     */
    handleMsgBox(message?:string,msgTitle?:string,msgBoxOption?:msgBoxOptionInterface,type?:msgBoxTypeInterface){
        let curType = type?.toLowerCase()
        if(!msgBoxTypeArr.includes(curType??"")){
            curType="confirm"
        }else{
            curType=type
        }
        let data;
        switch (curType){
            case "confirm":
                data = ElMessageBox.confirm(message,msgTitle,msgBoxOption);
                break;
            case "prompt":
                data = ElMessageBox.prompt(message,msgTitle,msgBoxOption);
                break;
            case "alert":
                data = ElMessageBox.alert(message,msgTitle,msgBoxOption);
                break;
        }
        return data
    },


    /**
     * 通知
     * @param message
     * @param noticeType
     */
    handleNotification(message:string,noticeType:noticeTypeInterface,title:string='',otherOptions?:any){
        let curType = noticeType.toLowerCase()
        if(!typeArr.includes(curType)){
            curType="success"
        }else{
            curType=noticeType
        }
        ElNotification({
            title,
            message,
            type: curType,
            ...otherOptions
        })
    },
    handleNotificationClose(){
        return ElNotification.closeAll()
    },
    //加载
    handleLoading(options:optionInterface){
        return ElLoading.service({
            text:options.text,
            body:options.body,
            fullscreen:options.fullscreen,
            spinner:options.spinner,
            background:options.background??"rgba(0, 0, 0, 0.7)",
        })
    }
}