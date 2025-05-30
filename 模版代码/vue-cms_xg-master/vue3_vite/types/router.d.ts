import 'vue-router'

//对路由的meta属性进行类型声明
declare module 'vue-router' {
    interface _RouteRecordBase {
        permissions?: Array<any>,
        hidden?: boolean | string | number,
    }
    interface RouteMeta {
        title:string,            // 设置该路由在侧边栏和面包屑中展示的名字
        transition?:string,      // 如果设置为false，则不会在breadcrumb面包屑中显示
        noCache?:boolean,        // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        affix?:boolean,          // 是否附上在tag上
    }
}