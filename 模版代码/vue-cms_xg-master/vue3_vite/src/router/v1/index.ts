/**
 *   @author 沉默小管
 */

import {createRouter,createWebHistory,RouteRecordRaw} from "vue-router"

import Layout from "@/views/layout/index.vue"

const Home = ()=>import("@/views/home/index.vue")
const Login = ()=>import("@/views/login/index.vue")
const GiteePage = ()=>import("@/views/common/oauthPage/gitee/index.vue")
const QQPage = ()=>import("@/views/common/oauthPage/qq/index.vue")
//授权页路由
export const oauthPageRoutes = [
    {
        path: '/auth/gitee',
        name:"Gitee登录",
        component: GiteePage,
        hidden: true,
        meta: { title: 'gitee登录', icon: 'dashboard', noCache: true, affix: false }
    },
    {
        path: '/auth/qq',
        name:"QQ登录",
        component: QQPage,
        hidden: true,
        meta: { title: 'QQ登录', icon: 'dashboard', noCache: true, affix: false }
    },
]
/**
 * Note: 路由配置项
 *
 * hidden: true                   // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    noCache: true                // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'               // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false            // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */
export const constRoutes:Array<RouteRecordRaw> = [
    //绝对定位
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: ()=>import("@/views/redirect.vue")
            }
        ]
    },
    {
        path: '/',
        component: Layout,
        redirect: 'index',
        hidden: false,
        children: [
            {
                path: '/',
                name: '首页',
                component: Home,
                meta: { title: '首页', icon: 'home', noCache: true, affix: true }
            },
        ]
    },
    {
        path: '/login',
        name:"登录",
        component: Login,
        hidden: true,
        meta: { title: '登录', icon: 'dashboard', noCache: true, affix: false }
    },
    {
        path: '/404',
        hidden: true,
        component: () => import("@/views/common/error/404.vue")
    },
    {
        path: '/401',
        hidden: true,
        component: () => import("@/views/common/error/401.vue")
    },
    {
        path: '/common/personalCenter',
        component: Layout,
        hidden: true,
        children: [
            {
                path: 'index',
                component: () => import('@/views/common/personalCenter/index.vue'),
                name: 'personalCenter',
                meta: { title: '个人中心', activeMenu: '' }
            }
        ]
    },
    ...oauthPageRoutes
]



// 动态路由，基于用户权限动态去加载
export const dynamicRoutes:RouteRecordRaw[] = [
    {
        path: '/system/dictList-data',
        component: Layout,
        hidden: true,
        permissions: ['system:dictList:data'],
        children: [
            {
                path: ':id(\\d+)',
                component: () => import('@/views/system/dictList/data.vue'),
                name: 'dictListData',
                meta: { title: '字典数据', activeMenu: '/system/dict' }
            }
        ]
    },
    {
        path: '/system/menuList/children',
        component: Layout,
        hidden: true,
        permissions: ['system:menuList:children'],
        children: [
            {
                path: ':id(\\d+)',
                component: () => import('@/views/system/menuList/index.vue'),
                name: 'menuListData',
                meta: { title: '菜单列表子级', activeMenu: '/system/menuList/children' }
            }
        ]
    },
    {
        path: '/pic/picList-index',
        component: Layout,
        hidden: true,
        permissions: ['pic:picList:index'],
        children: [
            {
                path: ':id(\\d+)',
                component: () => import('@/views/pic/picList/index.vue'),
                name: 'picListIndex',
                meta: { title: '图片列表', activeMenu: '/pic/picList/index' }
            }
        ]
    },
]


const router = createRouter({
    history:createWebHistory(),
    scrollBehavior:(to,from,savePosition)=>{
        if(savePosition){
            return savePosition
        }else{
            return {
                top:0
            }
        }
    },
    routes:constRoutes
})

export default router;
