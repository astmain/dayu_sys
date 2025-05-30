<!--
*- coding = utf-8 -*-
#@Time : 2022/9/7 9:23
#@Author : 沉默小管
#@File : Index1.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
    <div :class="classObj()" class="app-wrapper">
        <LoadComponentsAsync>
            <div v-if="appStore.device==='mobile'&&appStore.sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
            <G_Sidebar v-if="true" class="sidebar-container"/>

            <div :class="mainClass">
                <div :class="fixedHeaderClass">
                    <G_NavBar />
                    <G_TagsView v-if="needTagsView && appStore.device!='mobile'" />
                </div>
                <G_AppMain v-if="isRouterAlive" />
                <G_RightPanel>
                    <G_Setting />
                </G_RightPanel>
            </div>
        </LoadComponentsAsync>
    </div>
</template>

<script setup lang="ts">
    import {computed, defineAsyncComponent, nextTick, onMounted, provide, ref} from "vue";
    import {useStore} from "@/store/piniaAutoImport";
    import {useFunc} from "@/views/layout/hooks/useFunc";

    const LoadComponentsAsync = defineAsyncComponent(()=>import("@/components/loadComponentsAsync/index.vue"))
    const G_RightPanel = defineAsyncComponent(()=>import("@/components/rightPanel/index.vue"))
    const G_Setting = defineAsyncComponent(()=>import("./components/settings/index.vue"))
    const G_TagsView = defineAsyncComponent(()=>import("./components/tagsView/index.vue"))
    const G_Sidebar = defineAsyncComponent(()=>import("./components/sidebar/index.vue"))
    const G_AppMain = defineAsyncComponent(()=>import("./components/appMain.vue"))
    const G_NavBar = defineAsyncComponent(()=>import("./navBar.vue"))

    const appStore:any = useStore("useApp")
    const settingStore:any = useStore("useSetting")

    // 局部组件刷新
    let isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };
    provide("reload", reload);
    let needTagsView = computed(()=>{
      return settingStore.tagsView
    })
    const handleClickOutside =()=> {
        appStore.closeSideBar({ withoutAnimation: false })
    }

    const fixedHeaderClass = computed(()=>{
      return {'fixed-header':settingStore.fixedHeader}
    })
    const mainClass = computed(()=>{
      return {hasTagsView:needTagsView.value,sidebarHide:appStore.sidebar.hide,'main-container':true}
    })

    const classObj = ()=>{
        return {
        hideSidebar: !appStore.sidebar?.opened,
        openSidebar: appStore.sidebar?.opened,
        withoutAnimation: appStore.sidebar?.withoutAnimation,
        mobile: appStore.device === 'mobile'
      }
    }
    const handleColor = ()=>{
      // document.documentElement 是全局变量时
      const el = document.documentElement

      // 获取 css 变量
      getComputedStyle(el).getPropertyValue(`--el-color-primary`)
      getComputedStyle(el).getPropertyValue(`--el-color-success`)
      getComputedStyle(el).getPropertyValue(`--el-color-warning`)
      getComputedStyle(el).getPropertyValue(`--el-color-danger`)
      getComputedStyle(el).getPropertyValue(`--el-color-error`)
      getComputedStyle(el).getPropertyValue(`--el-color-info`)

        // 设置 css 变量
      el.style.setProperty('--el-color-primary', settingStore.themeColor.primary)
      el.style.setProperty('--el-color-success', settingStore.themeColor.success)
      el.style.setProperty('--el-color-warning', settingStore.themeColor.warning)
      el.style.setProperty('--el-color-danger', settingStore.themeColor.danger)
      el.style.setProperty('--el-color-error', settingStore.themeColor.error)
      el.style.setProperty('--el-color-info', settingStore.themeColor.info)
    }
    let {handleGetWidth} = useFunc()
    onMounted(()=>{
      handleColor()
      handleGetWidth()
    })

</script>

<style scoped lang="scss">
    @import "@/assets/css/mixin.scss";
    @import "@/assets/css/variables.scss";

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        --current-color:v-bind("settingStore.themeColor.primary");
        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }

    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }

    .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: calc(100% - #{$sideBarWidth});
        transition: width 0.28s;
    }

    .hideSidebar .fixed-header {
        width: calc(100% - 54px)
    }
    .system-fixed-header {
        width: calc(100%);
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        transition: width 0.28s;
    }

    .mobile .fixed-header {
        width: 100%;
    }
</style>
