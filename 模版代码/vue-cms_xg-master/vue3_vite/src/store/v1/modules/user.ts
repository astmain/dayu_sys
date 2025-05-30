/*- coding = utf-8 -*-
@Time : 2022/9/8 10:25
@Author : 沉默小管
@File : user.css
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {
    getToken, removeRemember,
    removeRememberPwd,
    removeRememberUsername,
    setRemember,
    setRememberPwd,
    setRememberUsername
} from "@/utils/storage";
import {removeToken, setToken,removeUserId, removeUsername} from "@/utils/storage";
import {
    requestGetInfo,
    requestLogin,
    requestLoginNoCode,
    requestLogout,
    requestRandomAccountLogin
} from "@/network/login/index";
import storeName from "@/store/storeName";
import {resInterface} from "@/commonNetwork/index";
import {setUserId, setUsername} from "@/utils/storage";
import {defineStore} from "pinia";
import {permsEnum} from "@/utils/enum";
interface userInterface{
    token:string
    userInfo:any
    avatar: string
    roles: any[],
    permissions: any[],
    sysConfig:any[],
}
// 用户状态管理
const useUserStore = defineStore(storeName.user,
    {
    state:():userInterface=>({
        token: getToken(),
        userInfo: {},
        avatar: '',
        roles: [],
        permissions: [],
        sysConfig: [],
    }),
    getters:{

    },
    actions:{
        // 登录方法 （不含验证码）
        LoginNoCode(userInfo: { username: string; password: string,rememberMe:boolean,userType:number }) {
            const username = userInfo.username
            const password = userInfo.password
            const userType = userInfo.userType
            const rememberMe = userInfo.rememberMe
            return new Promise<resInterface>(async (resolve, reject) => {
                let form = {username,password,userType}
                await requestLogin(form).then((res:resInterface)=>{
                    let {data,code,message} = res;
                    if(code==200){
                        if(rememberMe){
                            setRememberUsername(username)
                            setRememberPwd(password)
                            setRemember(true)
                        }else{
                            removeRememberUsername()
                            removeRememberPwd()
                            removeRemember()
                            setRemember(false)
                        }
                        setToken(data.token)
                        setUserId(data.id)
                        setUsername(data.username)
                        this.token = data.token
                        resolve(res)
                    }else{
                        reject(res)
                    }
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },
        // 测试登录方法 （不含验证码）
        TestLoginNoCode(userInfo: { username: string; password: string,userType:number }) {
            const username = userInfo.username
            const password = userInfo.password
            const userType = userInfo.userType
            return new Promise<resInterface>(async (resolve, reject) => {
                let form = {username,password,userType}
                await requestRandomAccountLogin(form).then((res:resInterface)=>{
                    let {data,code,message} = res;
                    if(code==200){
                        setToken(data.token)
                        setUserId(data.id)
                        setUsername(data.username)
                        this.token = data.token
                        resolve(res)
                    }else{
                        reject(res)
                    }
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },

        // 登录
        Login(userInfo: { username: string; password: any; code: any; uuid: any; }) {
            const username = userInfo.username.trim()
            const password = userInfo.password
            const code = userInfo.code
            const uuid = userInfo.uuid
            return new Promise<void>((resolve, reject) => {
                requestLogin({username, password, code, uuid}).then((res: { data: { token: any; }; }) => {
                    setToken(res.data.token)
                    this.token = res.data.token
                    resolve()
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo() {
            return new Promise<any>((resolve, reject) => {
                if(!this.token){
                    reject(false)
                }
                requestGetInfo({token:getToken()}).then((res: any) => {
                    const userInfo = res.data.userInfo
                    const role = res.data.roles
                    const permissions = res.data.permissions
                    const sysConfig = res.data.sysConfig
                    // const avatar = user.avatar == "" ? new URL(`../../../assets/v1/img/profile.jpg`, import.meta.url).href : process.env.VUE_APP_BASE_API + user.avatar;
                    if (role && role.length > 0) { // 验证返回的roles是否是一个非空数组
                        this.roles = role
                        this.permissions = permissions
                    } else {
                        this.roles = ['ROLE_DEFAULT']
                    }
                    this.sysConfig = sysConfig
                    this.userInfo = userInfo
                    // this.avatar = avatar
                    //判断是否开启系统，没有开启系统，除了超级管理员，其他都不能登录
                    if(this.sysConfig["sysStatus"]==1 || this.roles.includes(permsEnum.adminPerms)){
                        resolve(res)
                    }else{
                        reject("系统已关闭，请联系管理员")
                    }
                }).catch((error: any) => {
                    reject(error)
                })
            })
        },

        // 退出系统
        LogOut() {
            return new Promise<any>((resolve, reject) => {
                let uid = this.userInfo?.id
                let token = getToken()
                requestLogout({uid,token}).then((res: any) => {
                    this.token = ""
                    this.roles = []
                    this.permissions = []
                    removeUsername()
                    removeUserId()
                    removeToken()
                    resolve(true)
                }).catch(err=>{
                    reject(err)
                })

            })
        }
    }
})

export default useUserStore;
