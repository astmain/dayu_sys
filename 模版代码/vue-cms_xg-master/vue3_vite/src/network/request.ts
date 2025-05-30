//*- coding = utf-8 -*-
//@Time : 2021-12-24 1:30
//@Author : CSDN 沉默小管
//@File : request.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import axios, { AxiosRequestConfig } from "axios";
import config from "@/utils/config";
import { getToken } from "@/utils/storage";
import {configInterface} from "./index";
import model from "@/plugins/model/index";
import {saveAs} from "file-saver"
import errorCode from '@/utils/errorCode'
import {blobValidate, tansParams} from "@/utils/systemRules";
import {useUser} from "@/store/index";
import {handleArrTrim, handleCurBrowser, handleGetCurInstance, handleGetOS, handleGetPcOrIphone} from "@/utils/utils";
let BaseURL = config.BaseURL;
let BackUrl = config.BackUrl;
let BaseURLStorage = config.BaseURLStorage;
let HomeBaseURL = config.HomeBaseURL;
let ImgURLStorage = config.ImgURLStorage;
export { BaseURL,BackUrl, BaseURLStorage,HomeBaseURL,ImgURLStorage };

let flag:boolean = true
let oldUrl:string = ''
let timer:any = null
let isRequest = true

const request = (config: configInterface) => {
    const instance = axios.create({
        baseURL: BaseURL,
        // BaseURL:'http://laravelBlogNew.cn',
        timeout: 100000
    });
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source()
    const userStore:any = useUser()
    let Token = getToken();
    if(!config.headers){
        config.headers={
            "Content-Type": "application/json"
        }
    }

    if (Token) {
        config.headers = {
            ...config.headers,
            'X-CSRF-TOKEN': `VueCms_xg ${Token}`,
            'Authorization': `Bearer vuecms.cn`,
        }
    }
    config.data={
        ...config.data,
        operationSystem:handleGetOS(),
        browser:handleCurBrowser(),
        isPcOrIphone:handleGetPcOrIphone(),
    }


    //下载
    if(config.downloadData){
        let downloadParams = config.downloadData
        //下载
        let {i18n} = handleGetCurInstance()
        // prettier-ignore
        const downloadLoadingInstance = model.handleLoading({
            text: i18n.t("content.downloadingData_pleaseWait"),
            background: "rgba(0, 0, 0, 0.7)"
        })
        let req:any = null;

        if (downloadParams.isPost) {
            req = instance.post(downloadParams.url, {...downloadParams.params}, {
                transformRequest: [
                    (params) => {
                        return tansParams(params);
                    },
                ],
                headers: {
                    ...config.headers,
                    'Content-Type': 'application/x-www-formList-urlencoded'
                },
                responseType: "blob"
            })
        } else {
            req = instance.get(downloadParams.url, {
                headers: { ...config.headers,
                    'Content-Type': 'application/x-www-formList-urlencoded'
                },
                responseType: "blob"
            })
        }
        return req.then(async (resp: any) => {
            const isLogin = await blobValidate(resp);
            if (isLogin) {
                const blob = new Blob([resp]);

                saveAs(blob, downloadParams.filename);

                console.log("%s ====>>>导出成功", downloadParams.filename);
            } else {
                const resText = resp.text();
                const rspObj = JSON.parse(resText);
                // prettier-ignore
                const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
                model.handleMsg(errMsg,"error")
            }
            downloadLoadingInstance.close();
        }).catch((r) => {
            console.error(r);
            model.handleMsg("下载文件出现错误，请联系管理员！","error")
            downloadLoadingInstance.close();
        });
    }

    instance.interceptors.request.use(config => {
        // 全局拦截 清除字符串空格情况
        let {data} = config
        if(!data) return config
        //清空数组中字符串所有空格
        config.data = handleArrTrim(data)
        if(config.method=="get" && config.data){
            let url = config.url + '?' + tansParams(config.data);
            url = url.slice(0, -1);
            config.params = {};
            config.url = url
        }
        //添加取消请求配置
        config.cancelToken = source.token

        // let requestData = handleMisRepeatedRequest(config)
        // if(!requestData){
        //     return Promise.reject('请勿频繁点击操作');
        // }
        return config;

    }, err => {
        console.log(err);
        return Promise.reject(err)
    })
    instance.interceptors.response.use((res: any) => {
        let {code,message,data} = res.data
        if (code === 403) {
            model.handleMsgBox('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                userStore.LogOut().then(() => {
                    location.href = "/login";
                })
            })
        }else if (code === 500) {
            model.handleMsg(message,"error")
            return Promise.reject(new Error(message))
        } else if (code !== 200) {
            model.handleNotification(message,"error")
            return Promise.reject('error')
        } else {
            return res.data
        }
        return res.data;
    }, err => {
        let { message,response} = err;
        if(!response && !message){
            return Promise.resolve(err)
        }
        //请求取消
        source.cancel();
        if (message == "Network error") {
            message = "后端接口连接异常";
        }else if(response?.data?.data == "jwt expired" || response?.data?.data == "Forbidden resource" || response?.data?.data == "请重新登录，超过登录有效期"){
            model.handleMsgBox('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                userStore.LogOut().then((res:any) => {
                    location.href="/login"
                })
            })
            return Promise.reject(err.response.data)
        }else if(response?.data?.data == "不能多地登陆"){
                userStore.LogOut().then((res:any) => {
                    location.href="/login"
                })
            return
        }else if(response?.data?.data == "账号密码不匹配"){
            return Promise.reject(response.data)
        }else if(response?.data?.data == "ip被封，请联系管理员"){
            model.handleMsg(message,"error")
            setTimeout(()=>{
                userStore.LogOut().then((res:any) => {
                    location.href="/login"
                })
            },2000)
            return
        }else if (message?.includes("timeout")) {
            message = "系统接口请求超时";
        }else if (message?.includes("Request failed with status code") && !response.data.message) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }else{
            message = response.data.message
        }
        response.data.message = message
        return Promise.resolve(response.data)
    })
    return instance(config)
}
let lastRequestTime = {};
let minRequestInterval = 5000;//最小请求时间间隔
let whiteList = [] as any;//白名单
//设置请求误重复请求
const handleMisRepeatedRequest = (config:any):boolean=>{
    // 通过白名单解决posturl复用冲突问题
    if (whiteList.indexOf(config.url) != -1) {
        return config
    }
    // 如果当前请求路径不存在于记录对象中，说明此路径还没有发送过请求
    const now = Date.now();
    if (!lastRequestTime[config.url]) {
        lastRequestTime[config.url] = 0;
    }
    // 判断当前时间减去这个路径最近一次请求时间是否小于规定时间间隔
    if (now - lastRequestTime[config.url] < minRequestInterval) {
        return false
    }
    // 如果时间间隔不小于规定时间间隔，记录本次请求时间，以进行下一次请求的时间计算
    lastRequestTime[config.url] = now;
    return true;
}

export {
    request
}









