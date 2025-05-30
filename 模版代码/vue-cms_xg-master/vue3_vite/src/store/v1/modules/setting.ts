/*- coding = utf-8 -*-
@Time : 2022/9/8 10:24
@Author : 沉默小管
@File : setting.tsx
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import config from "@/utils/config"
import {getLayoutSetting} from "@/utils/storage"
import storeName from "@/store/storeName";
import {defineStore} from "pinia";
const storageSetting:any = getLayoutSetting()
let {SideTheme,Language,ShowSettings,SysSize,TopTitle,TagsView,FixedHeader,SidebarLogo,DynamicTitle} = config

interface themeColorType {
    primary:string,
    success:string,
    warning:string,
    danger: string,
    error:string,
    info: string,
}

interface settingStoreInterface {
    title:string,
    language:string,
    sysSize:string,
    themeColor:themeColorType,
    sideTheme:string,
    showSettings:boolean,
    topTitle:boolean|undefined,
    fixedHeader:boolean|undefined,
    sidebarLogo:boolean|undefined,
    dynamicTitle:string|undefined,
    tagsView:string|undefined,
}

const useSettingStore = defineStore(storeName.setting,{
    state:():settingStoreInterface=>({
        title: 'title',
        language: storageSetting?.language === undefined ? Language : storageSetting?.language,
        sysSize: storageSetting?.sysSize === undefined ? SysSize : storageSetting?.sysSize,
        themeColor:{
            primary: storageSetting?.themeColor?.primary ?? "#409EFF",
            success: storageSetting?.themeColor?.success ?? "#67C23A",
            warning: storageSetting?.themeColor?.warning ?? "#E6A23C",
            danger: storageSetting?.themeColor?.danger ?? "#F56C6C",
            error: storageSetting?.themeColor?.error ?? "#F56C6C",
            info: storageSetting?.themeColor?.info ?? "#909399",
        },
        sideTheme: storageSetting?.sideTheme || SideTheme,
        showSettings: ShowSettings,
        topTitle: storageSetting?.topTitle === undefined ? TopTitle : storageSetting?.topTitle,
        tagsView: storageSetting?.tagsView === undefined ? TagsView : storageSetting?.tagsView,//tag标签是否显示
        fixedHeader: storageSetting?.fixedHeader === undefined ? FixedHeader : storageSetting?.fixedHeader,//是否固定到头部
        sidebarLogo: storageSetting?.sidebarLogo === undefined ? SidebarLogo : storageSetting?.sidebarLogo,//是否显示左侧标题
        dynamicTitle: storageSetting?.dynamicTitle === undefined ? DynamicTitle : storageSetting?.dynamicTitle,//是否动态显示标题
    }),
    //类似于computed 可以帮我们去修饰我们的值
    getters:{
        getter(state?:string|number|object):any{
            return state
        }
    },
    //可以操作一步和同步提交到state
    actions:{
        //需要优化
        changeSetting(data:{ key:string|number|Array<any>, value:any }) {
            if(data.key instanceof Array){
                if(this.getter.hasOwnProperty(data.key[0])){
                    this.getter[data.key[0]][data.key[1]] = data.value
                }
            }else{
                if(this.getter.hasOwnProperty(data.key)){
                    this.getter[data.key] = data.value
                }
            }

        },
        // 设置网页标题
        setTitle(title:string) {
            this.title = title
        }
    }
})
export default useSettingStore