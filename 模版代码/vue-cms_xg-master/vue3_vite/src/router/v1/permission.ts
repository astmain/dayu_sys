/*- coding = utf-8 -*-
@Time : 2022/9/20 14:53
@Author : CSDN 沉默小管
@File : permission.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
//路由权限动态添加

//白名单
import NProgress from "nprogress";
import router from "./index";
import {getToken} from "@/utils/storage";
import {usePermission, useSetting, useUser} from "@/store/index";
import model from "@/plugins/model";
import useAppStore from "@/store/modules/app";
import {toRaw} from "vue";

const whiteList = ["/login","/auth/gitee",'/auth/qq', '/auth-redirect']
NProgress.configure({ showSpinner: false })//显示右上角螺旋加载效果

//前置导航守卫
router.beforeEach((to,from,next)=>{
    NProgress.start()
    const settingStore = useSetting()
    const userStore = useUser()
    const permissionStore = usePermission()
    const appStore = useAppStore()
    to.meta.title && settingStore.setTitle(to.meta.title)
    if (getToken()) {
        /* has token*/
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done();
        } else {
            if (userStore.roles.length === 0) {
                // 判断当前用户是否已拉取完user_info信息
                userStore.GetInfo().then(() => {
                    permissionStore.generateRoutes().then((accessRoutes: any) => {
                        // 根据roles权限动态生成可访问的路由表
                        toRaw(accessRoutes).forEach(v => {
                            router.addRoute(v)
                        })
                        if(from.path=="/login" && appStore.globalLoading==true){
                            model.handleNotification(`欢迎进入vueCms_xg系统`,"success","登录成功")
                        }
                        setTimeout(()=>{
                            appStore.handleSwitchGlobalLoading(false)
                        },5000)
                        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
                    }).catch(err=>{
                        appStore.handleSwitchGlobalLoading(false)
                    })
                }).catch(err => {
                    userStore.LogOut().then(() => {
                        appStore.handleSwitchGlobalLoading(false)
                        model.handleMsg(`${err.data}`,"error")
                        next({ path: '/' })
                    }).catch(err=>{
                        appStore.handleSwitchGlobalLoading(false)
                    })
                })
            } else {
                next()
            }
        }
    } else {
        // 没有token
        // 在免登录白名单，直接进入
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
            NProgress.done()
        }
    }
})

//后置导航守卫
router.afterEach((to,from)=>{
    NProgress.done();
})

export default router;
