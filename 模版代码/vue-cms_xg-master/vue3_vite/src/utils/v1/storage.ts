//*- coding = utf-8 -*-
//@Time : 2021-12-23 1:48
//@Author : 沉默小管
//@File : utils.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
//存储文件
import baseInfo from "./config";
import {handleIsJSON} from "@/utils/utils";
const SIZE = 'size';
const SIDEBAR_STATUS = 'sidebarStatus';
const LAYOUT_SETTING = 'layoutSetting';
const TOKEN = 'homeBlogToken';
const USERNAME = 'homeUsername';
const USERID = 'homeUid';
const REMEMBERUSERNAME = 'homeTememberUsername';
const REMEMBERPWD = 'homeRememberPassword';
const PASSWORD = 'password';
const REMENBER = 'remember';
const HEADIMG = 'headImg';
const GET_STAR = 'getStar';
const userId_key = USERID + baseInfo.BaseURL;
const token_key = TOKEN + baseInfo.BaseURL;
const remember_key = REMENBER + baseInfo.BaseURL;
const remember_username_key = REMEMBERUSERNAME + baseInfo.BaseURL;
const remember_password_key = REMEMBERPWD + baseInfo.BaseURL;
const username_key = USERNAME + baseInfo.BaseURL;
const password_key = PASSWORD + baseInfo.BaseURL;
const head_img = HEADIMG + baseInfo.BaseURL;
const layout_setting = LAYOUT_SETTING + baseInfo.BaseURL;
const sidebar_status = SIDEBAR_STATUS + baseInfo.BaseURL;
const size = SIZE + baseInfo.BaseURL;
const getStar = GET_STAR + baseInfo.BaseURL;
//token
function getToken() {
    return getLocalStorage(token_key)??"";
}
function setToken(token:string) {
    setLocalStorage(token_key,token)
    // setLocalStorage(token_key,token,{expires:3600*24})
}
function removeToken() {
    removeLocalStorage(token_key)
}

//user_id
function getUserId() {
    return getLocalStorage(userId_key)??"";
}
function setUserId(token:string) {
    setLocalStorage(userId_key,token)
}
function removeUserId() {
    removeLocalStorage(userId_key);
}

//remember
function getRemember():boolean {
    return !!getLocalStorage(remember_key)??false;
}
function setRemember(token:boolean) {
    setLocalStorage(remember_key,String(token),720000*24)
}
function removeRemember() {
    removeLocalStorage(remember_key);
}
//rememberUsername
function getRememberUsername() {
    return getLocalStorage(remember_username_key)??"";
}
function setRememberUsername(token:string) {
    setLocalStorage(remember_username_key,token,720000*24)
}
function removeRememberUsername() {
    removeLocalStorage(remember_username_key);
}
//rememberPwd
function getRememberPwd() {
    return getLocalStorage(remember_password_key)??"";
}
function setRememberPwd(token:string) {
    setLocalStorage(remember_password_key,token,720000*24)
}
function removeRememberPwd() {
    removeLocalStorage(remember_password_key);
}
//username
function getUsername() {
    return getLocalStorage(username_key)??"";
}
function setUsername(token:string) {
    setLocalStorage(username_key,token)
}
function removeUsername() {
    removeLocalStorage(username_key);
}
//password
function getPwd() {
    return getLocalStorage(password_key)??"";
}
function setPwd(token:string) {
    setLocalStorage(password_key,token)
}
function removePwd() {
    removeLocalStorage(password_key);
}
//password
function getHeadImg() {
    return getLocalStorage(head_img)??"";
}
function setHeadImg(token:string) {
    setLocalStorage(head_img,token)
}
function removeHeadImg() {
    removeLocalStorage(head_img);
}

//layout_setting
function getLayoutSetting() {
    return getLocalStorage(layout_setting)?JSON.parse(getLocalStorage(layout_setting) as string):""
}
function setLayoutSetting(val:object) {
    setLocalStorage(layout_setting,JSON.stringify(val))
}
function removeLayoutSetting() {
    removeLocalStorage(layout_setting);
}

/**
 * 获取侧边栏状态
 */
function getSidebarStatus() {
    return getLocalStorage(sidebar_status)
}
function setSidebarStatus(val:string) {
    setLocalStorage(sidebar_status,val)
}
function removeSidebarStatus() {
    removeLocalStorage(sidebar_status);
}

//是否跳转gitee仓库
function getGetStar() {
    return getLocalStorage(getStar)
}
function setGetStar(val:number) {
    setLocalStorage(getStar,val+"")
}
function removeGetStar() {
    removeLocalStorage(getStar);
}


function getLocalStorage(key:string) {
    if(!localStorage.getItem(key))return "";
    if(handleIsJSON(localStorage.getItem(key))){
        // @ts-ignore
        let storageData = JSON.parse(localStorage.getItem(key))
        let {expire,data,time} = storageData
        if(time+expire>Date.now()){
            return data;
        }else{
            removeLocalStorage(key)
            return ""
        }
    }else{
        removeLocalStorage(key)
        return ""
    }
}
/**
 *
 * @param key           存储 键
 * @param data          存储 值
 * @param expire        过期时间
 */
function setLocalStorage(key:string,data:string|number,expire:number=72000000) {
    let obj = {
        data,
        time:Date.now(),
        expire
    }
    localStorage.setItem(key,JSON.stringify(obj))
}
function removeLocalStorage(key:string) {
    localStorage.removeItem(key);
}


export{
    getGetStar,
    setGetStar,
    removeGetStar,
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage,
    getSidebarStatus,
    setSidebarStatus,
    removeSidebarStatus,
    getLayoutSetting,
    setLayoutSetting,
    removeLayoutSetting,
    getHeadImg,
    setHeadImg,
    removeHeadImg,
    getToken,
    setToken,
    removeToken,
    getUserId,
    setUserId,
    removeUserId,
    getUsername,
    setUsername,
    removeUsername,
    getRememberUsername,
    setRememberUsername,
    removeRememberUsername,
    getPwd,
    setPwd,
    removePwd,
    getRemember,
    setRemember,
    removeRemember,
    getRememberPwd,
    setRememberPwd,
    removeRememberPwd,
};
