/*- coding = utf-8 -*-
@Time : 2022/9/8 10:24
@Author : 沉默小管
@File : permission.css
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {RouteRecordRaw} from "vue-router"
import {requestCurRouters} from "@/network/common/menu/index";
import storeName from "@/store/storeName";
import Layout from "@/views/layout/index.vue"
import ParentView from '@/components/parentView/index.vue'
import InnerLink from '@/views/layout/components/innerLink/index.vue'
import router,{constRoutes, dynamicRoutes} from "@/router/index";
import auth from '@/plugins/auth/index'
import config from "@/utils/config";
import {resInterface} from "@/commonNetwork/index";
import {defineStore} from "pinia";
import {toRaw} from "vue";

interface permissionStoreInterface {
    routes:RouteRecordRaw[],
    addRoutes:RouteRecordRaw[],
    defaultRoutes:RouteRecordRaw[],
    topbarRouters:RouteRecordRaw[],
    sidebarRouters:RouteRecordRaw[],
}
//权限状态管理
const usePermissionStore = defineStore(storeName.permission,{
    state:():permissionStoreInterface=>({
        routes: [],
        addRoutes: [],
        defaultRoutes: [],
        topbarRouters: [],
        sidebarRouters: []
    }),
    getters:{

    },
    actions:{
        setSidebarRouters(routes:any){
            this.sidebarRouters = routes
        },
        // 生成路由
        generateRoutes() {
            return new Promise<RouteRecordRaw[]>(resolve => {
                // 向后端请求路由数据
                requestCurRouters().then((res:resInterface) => {
                    const sdata = JSON.parse(JSON.stringify(res.data))
                    const rdata = JSON.parse(JSON.stringify(res.data))
                    const sidebarRoutes = filterAsyncRouter(sdata)
                    const rewriteRoutes = filterAsyncRouter(rdata, false, true)
                    const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
                    rewriteRoutes.push({ path: '/:pathMatch(.*)', redirect: '/404', hidden: true })
                    toRaw(asyncRoutes).forEach(v => {
                        router.addRoute(v)
                    })
                    this.addRoutes = rewriteRoutes;
                    this.routes = constRoutes.concat(rewriteRoutes) as never[]

                    this.sidebarRouters = constRoutes.concat(sidebarRoutes) as never[]

                    this.defaultRoutes = constRoutes.concat(sidebarRoutes) as never[]

                    this.topbarRouters = sidebarRoutes

                    resolve(rewriteRoutes)
                })
            })
        }
    }
})
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap:Array<any>, lastRouter = false, type = false) {
    const routeAllPathToCompMap =import.meta.glob(`@/views/**/*.vue`,{
        eager:false,//true是硬加载，false是软加载
    });
    let version = config.ItemVersion
    return asyncRouterMap.filter((route:any) => {
        if (type && route.children) {
                route.children = filterChildren(route.children,route)
        }
        if (route.component) {
            // layout parentView 组件特殊处理
            if (route.component === 'Layout') {
                route.component = Layout
            } else if (route.component === 'ParentView') {//父级视图
                route.component = ParentView
            } else if (route.component === 'InnerLink') {//链接跳转
                route.component = InnerLink
            } else {
                let componentVue = routeAllPathToCompMap[`/src/views/${version}/${route.component}.vue`]
                route.component = loadView(componentVue)
            }
        }
        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, route, type)
        } else {
            delete route['children']
            delete route['redirect']
        }
        return true
    })
}

function filterChildren(childrenMap:any, lastRouter?:boolean|any) {
    if(!lastRouter){
        lastRouter = false
    }
    var children:any[] = []
    childrenMap.forEach((val: { children: any[]; component: string; path: string; }, index: any) => {
        if (val.children && val.children.length) {
            if (val.component === 'ParentView' && !lastRouter) {
                val.children.forEach(c => {
                    c.path = val.path + '/' + c.path
                    if (c.children && c.children.length) {
                        children = children.concat(filterChildren(c.children, c))
                        return
                    }
                    children.push(c)
                })
                return
            }
        }
        if (lastRouter) {
            val.path = lastRouter?.path + '/' + val.path
        }
        children = children.concat(val)
    })
    return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes:any) {
    const res:any[] = []
    routes.forEach((route:any) => {
        if (route.permissions) {
            if (auth.hasPermiOr(route.permissions)) {
                res.push(route)
            }
        } else if (route.roles) {
            if (auth.hasRoleOr(route.roles)) {
                res.push(route)
            }
        }
    })
    return res
}

export const loadView = (view:()=>any|undefined) => {
    if (import.meta.env.MODE === 'development') {
        return view
    } else {
        // 使用 import 实现生产环境的路由懒加载
        return view
    }
}

export default usePermissionStore
