import axios from "axios"

import { ElButton, ElDialog, ElInput, ElForm, ElMessage, ElFormItem, ElTree, ElDrawer, ElCheckboxGroup, ElCheckbox } from 'element-plus'




globalThis.config_axios_api = function config_axios_api({name = "axios_api", baseURL, debug = false, timeout = 30000}) {
    console.log('axios_create 初始化基础链接  baseURL         :', baseURL)
    axios.defaults.headers.get['Cache-Control'] = 'no-cache' // 禁用缓存
    axios.defaults.headers.get['Pragma'] = 'no-cache' // 禁用缓存兼容老旧浏览器
    const axios_api = axios.create({
        baseURL: baseURL, //后端接口地址
        // withCredentials: false,// 用于配置请求接口跨域时是否需要凭证
        timeout: timeout, // 超时时间，单位毫秒
    });

    // 请求拦截器***************************************************
    axios_api.interceptors.request.use((config) => {
        let token = localStorage.getItem("token")
        if (token) {
            config.headers['token'] = token
        }


        if (config?.headers_custom) {
            config.headers['headers_custom'] = JSON.stringify(config.headers_custom)
        }


        return config;
    }, (error) => {
        console.error("axios_api请求异常====》", error);
        return Promise.reject(error);
    });

    //响应拦截器*****************************************************
    axios_api.interceptors.response.use((response) => {
        if (response.data.code === 200) {


        } //
        else if (response.data.code === 201) {

        } //
        else if (response.data.code >= 400) {
            ElMessage.error({message:response.data.msg, })
        } //
        else {
            if (debug === true) console.log('axios_api 其它状态码响应结果 response         :', response)
        }

        return response.data;
    }, (error) => {
        return Promise.reject(error);
    });


    // hook钩子axios_api
    window[name] = function (config) {
        // if (debug === true) console.log("axios_api---config:", config)
        return axios_api(config)
    }
    return axios_api

}


export default config_axios_api