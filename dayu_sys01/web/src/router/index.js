import { createRouter, createWebHistory } from 'vue-router'


// 路由开发页面pages
const menus = [
    { path: '/home', name: '首页', component: () => import('@src/views/home.jsx') },
    { path: '/about', name: '关于', component: () => import('@src/views/about.vue') },
    { path: '/setting', name: '设置', component: () => import('@src/views/setting.jsx') },
    {
        path: '/system', name: '权限管理', children: [
            { path: '/system/menu/menu', name: '菜单管理', component: () => import('@src/views/system/menu/menu.vue') },
            // { path: '/system/role/role', name: '角色管理', component: () => import('@src/views/system/role/role.vue') },
            { path: '/system/user/user', name: '用户管理', component: () => import('@src/views/system/user/user.vue') },
            { path: '/system/depart/depart', name: '部门角色管理', component: () => import('@src/views/system/depart/depart.vue') },
            // { path: '/system/depart/depart', name: '部门管理', component: () => import('@src/views/system/depart/depart.jsx') },
        ]
    },
    { path: '/mall_order_3D_print', name: '商城订单3D打印', component: () => import('@src/views/mall/mall_order_3D_print/mall_order_3D_print.vue') },
    { path: '/mall_order_manage', name: '商城订单管理', component: () => import('@src/views/mall/mall_order_manage/mall_order_manage.vue') },
    { path: '/mall_materials_manage', name: '商城材料管理', component: () => import('@src/views/mall/mall_materials_manage/mall_materials_manage.vue') },


    {
        path: '/test', name: '测试', children: [
            { path: '/test/test0', name: '测试0_原始模版', component: () => import('@src/views/test/test0.vue') },
            { path: '/test/test1', name: '测试1_渲染器_动画', component: () => import('@src/views/test/test0.vue') },
            { path: '/test/test2', name: '测试2_轨迹_鼠标旋转', component: () => import('@src/views/test/test2.vue') },
            { path: '/test/test3', name: '测试3_OrbitControls', component: () => import('@src/views/test/test3.vue') },
            { path: '/test/test4', name: '测试4_绘制物件', component: () => import('@src/views/test/test4.vue') },
            { path: '/test/test5', name: '测试5_贴图自发光', component: () => import('@src/views/test/test5.vue') },
            { path: '/test/test6', name: 'test6_高光_亚光_粗糙度_金属度', component: () => import('@src/views/test/test6.vue') },
            { path: '/test/test7', name: 'test7_贴图皮肤', component: () => import('@src/views/test/test7.vue') },
            { path: '/test/test8', name: 'test8_贴图皮肤2', component: () => import('@src/views/test/test8.vue') },
            { path: '/test/test9', name: 'test9_加载stl文件', component: () => import('@src/views/test/test9.vue') },
            { path: '/test/test10', name: 'test10_光源_环境光_平行光_半球光_点光源', component: () => import('@src/views/test/test10.vue') },
            { path: '/test/test11', name: 'test11_投影效果', component: () => import('@src/views/test/test11.vue') },
        ]
    },
]
let routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: '登陆', component: () => import('@src/views/login.vue') },
    { path: '/:catchAll(.*)', name: 'NotFound', component: () => import('@src/views/login.vue') },
    { path: '/', name: 'main', children: menus },
]

let menu_list = adapter_add_field_menu(menus)


// 路由配置
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.path != "/login" && !token) {
        next('/login')
    } else {
        next()
    }
})

// export default router
export default { router, menus, routes, menu_list }




function adapter_add_field_menu(data) {
    if (Array.isArray(data)) {
        return data.map(item => adapter_add_field_menu(item));
    } else if (typeof data === 'object' && data !== null) {
        const newItem = { ...data };
        if (newItem.name) {
            newItem.menu = newItem.name;
        }
        if (newItem.children) {
            newItem.children = adapter_add_field_menu(newItem.children);
        }
        return newItem;
    }
    return data;
}