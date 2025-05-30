/*- coding = utf-8 -*-
@Time : 2022/9/8 10:15
@Author : 沉默小管
@File : app.css
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {getGetStar, getSidebarStatus, setGetStar, setSidebarStatus} from "@/utils/storage"
import storeName from "@/store/storeName"
import {defineStore} from "pinia";

type deviceType = "desktop" | "mobile"

interface appStoreInterface {
    getStar:boolean
    sidebar:{
        opened?:boolean|string,
        withoutAnimation?:boolean,
        hide?:boolean,
    },
    device?:deviceType,//当前设备
    size?:string,//当前页面大小
    globalLoading?:boolean//全局加载状态
}

const useAppStore = defineStore(storeName.app,{
    //sidebar,device,size解构后就需要.value
    state:():appStoreInterface=>({
        getStar:getGetStar()==1?true:false,
        sidebar: {
            opened: getSidebarStatus() === '1' ? true : false,
            withoutAnimation: false,
            hide: false
        },
        device: 'desktop',
        globalLoading:false,
    }),
    //类似于computed 可以帮我们去修饰我们的值
    getters:{
        getter(state){
            return state
        }
    },
    //可以操作异步和同步提交到state
    actions:{
        handleChangeGetStarStatus(){
            setGetStar(getGetStar()==1?2:1)
        },
        //修改全局loading
        handleSwitchGlobalLoading(status:boolean){
            this.globalLoading = status
        },
        toggleSideBar() {
            this.sidebar.opened = !this.sidebar.opened
            this.sidebar.withoutAnimation = false
            if (this.sidebar.opened) {
                setSidebarStatus('1')
            } else {
                setSidebarStatus('')
            }
        },
        closeSideBar(res: { withoutAnimation:boolean }) {
            setSidebarStatus('')
            this.sidebar.opened = false
            this.sidebar.withoutAnimation = res.withoutAnimation
        },
        toggleDevice( device:deviceType) {
            this.device = device
        },
        toggleSideBarHide( status:boolean) {
            this.sidebar.hide = status
        }
    }
})
export default useAppStore
