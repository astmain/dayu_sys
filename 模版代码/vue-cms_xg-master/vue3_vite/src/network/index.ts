/*- coding = utf-8 -*-
@Time : 2022/10/23 15:28
@Author : CSDN 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {AxiosRequestConfig} from "axios";

export type methodsData = "post" | "get" | "put" | "delete"
export interface configInterface extends AxiosRequestConfig {
    url?: string,
    data?: any,
    method?: methodsData,
    headers?: any,
    downloadData?:downloadParamsInterface
}
interface downloadParamsInterface{
    url: string,
    params?: any,
    filename: string
    isPost?: boolean
}

export interface resInterface {
    code:number,
    message:string,
    data:any,
}
