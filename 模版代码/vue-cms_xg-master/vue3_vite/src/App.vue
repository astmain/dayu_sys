<template>
    <div>
        <el-config-provider :locale="localLanguage" :button="btnConfig" :message="msgConfig">
            <router-view />
        </el-config-provider>
    </div>
</template>
<script setup lang="ts">
    import logoImg from '@/assets/img/vueCms.jpg'
    import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
    import en from 'element-plus/dist/locale/en.mjs'
    import {handleIcoCreate} from "@/utils/utils";
    import {computed, provide, ref, watch} from "vue";
    import {useStore} from "@/store/piniaAutoImport";
    import {useRouter} from "vue-router";
    import {requestWatchUserAccessPage} from "@/network/home/index";
    import {socketClient} from "@/plugins/socketClient";
    import {socketEnum} from "@/utils/enum";

    let logo = ref<string>(logoImg)
    const localLanguage = computed(()=>{
      let settingStore = useStore("useSetting")
      return settingStore.language=="zh"?zhCn:en
    })
    interface btnInterface {
        autoInsertSpace:boolean
    }
    const btnConfig = computed(():btnInterface=>{
        return {
            autoInsertSpace: true,
        };
    })
    interface msgInterface {
        max:number
    }
    const msgConfig = computed(():msgInterface=>{
        return {
            max: 5,
        }
    })

    //动态标题
    const settingStore:any = useStore("useSetting")
    watch(()=>settingStore.dynamicTitle && settingStore.title,(title:any)=>{
      let userStore:any = useStore("useUser")
      const computedSysLogo = computed(()=>{
        return userStore.sysConfig["sysLogo"]??logo.value;
      })
      handleIcoCreate(computedSysLogo.value,title)
    })
    //监听页面路径
    const router = useRouter()
    watch(()=>router.currentRoute.value.path,(newData:string,oldData:string)=>{
        let {path,name} = router.currentRoute.value
        if(!["登录","首页"].includes(name+'')){
            handleWatchUserAccessPage()
        }
    })
    //监听用户访问页面，并记录
    const handleWatchUserAccessPage = async ()=>{
        let {path,name} = router.currentRoute.value
        let form = {
            pageUrl:path,
            pageName:name,
        }
        await requestWatchUserAccessPage(form)
    }

    //初始化socket通信
    const client = ref(new socketClient())
    provide(socketEnum.socket,client)

    window.addEventListener("resize",()=>{

    })
</script>
<style lang="less">
    .router-link-active{
      --el-menu-active-color:v-bind("settingStore.themeColor.primary");
      svg{
        fill:v-bind("settingStore.themeColor.primary") !important;
      }
    }
    /* 解决自定义滚动条 x 轴显示问题 */
    .el-scrollbar__wrap
    {
      //overflow-x: hidden!important;
    }
    .el-scrollbar{
      :deep(.el-scrollbar__bar.is-horizontal){
        display: none;
      }
    }
    .app-container{
        margin:15px 15px 0px 15px;
    }
    //弹出框 宽度设置
    @media screen and (min-width:600px ) and (max-width:1200px) {
        .dialog-style{
          width:50%;
        }
    }
    @media screen and (max-width:600px) {
      .dialog-style{
        width:95%;
        .el-form-item{
          width:100% !important;
        }
      }
    }
</style>
<style lang="scss">
    @import "@/assets/css/variables.scss";
    /* 滚动条所在容器 */
    #app {
        width: 100%;
        height: 100vh;
        //overflow: overlay;
    }

    /* 滚动条整体 */
    #app::-webkit-scrollbar {
        height: 5px;
        width: 8px;
    }
    /* 两个滚动条交接处 -- x轴和y轴 */
    #app::-webkit-scrollbar-corner {
        background-color: transparent;
    }

    /* 滚动条滑块 */
    #app::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: $baseMenuBackground;
    }

    /* 滚动条轨道 */
    #app::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #ededed;
    }

    /* 滚动条两端按钮 */
    #app::-webkit-scrollbar-button {
    }


    /** 滚动条样式 start **/
    /* 滚动条整体 */
    .scroll-bar-style {
      padding:0px 20px 0px 0px;
      overflow-y: auto;
    }
    /* 滚动条整体 */
    .scroll-bar-style::-webkit-scrollbar {
        height: 5px;
        width: 8px;
    }
    /* 两个滚动条交接处 -- x轴和y轴 */
    .scroll-bar-style::-webkit-scrollbar-corner {
        background-color: transparent;
    }

    /* 滚动条滑块 */
    .scroll-bar-style::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: $baseMenuBackground;
    }

    /* 滚动条轨道 */
    .scroll-bar-style::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #ededed;
    }

    /* 滚动条两端按钮 */
    .scroll-bar-style::-webkit-scrollbar-button {
    }

</style>
