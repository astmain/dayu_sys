<template>
    <div class="app-main" :style="appStore.device=='mobile'?'padding-top: 53px!important':''">
        <el-scrollbar>
<!--          子级不需要模板，现在是子级有模板又渲染一边-->
            <router-view v-slot="{ Component,route }">
                <transition name="fade" mode="out-in">
                    <keep-alive :include="cachedViews">
                        <component :is="Component" :key="route.path" />
                    </keep-alive>
                </transition>
            </router-view>
        </el-scrollbar>
    </div>

</template>

<script setup lang="ts">
    import router from "@/router/index";
    import {computed, inject} from "vue";
    import {useStore} from "@/store/piniaAutoImport";

    const useTagStore:any = useStore("useTagsView")
    const appStore:any = useStore("useApp")
    const cachedViews = computed(()=>{
      return Array.from(useTagStore.cachedViews)
    })
    const key = computed(()=>{
        return router.currentRoute.value.path
    })

</script>

<style lang="less">
    /* 渐变设置 */
    .fade-enter-from, .fade-leave-to {
      transform: translateX(20px);
      opacity: 0;
    }
    .fade-enter-to, .fade-leave-from {
      opacity: 1;
    }
    .fade-enter-active {
      transition: all 0.7s ease;
    }
    .fade-leave-active {
      transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1);
    }
    .scrollbar-demo-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        margin: 10px;
        text-align: center;
        border-radius: 4px;
        background: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
    }
    .app-main {
        /* 50= navbar  50  */
        min-height: 100vh;
        width: 100%;
        position: relative;
        overflow: hidden;
        :deep(.el-scrollbar__wrap)  {
            overflow: auto;
            height: calc(100vh - 85px);
        }
    }

    .fixed-header+.app-main {
        padding-top: 50px;
    }

    .hasTagsView {
        .app-main {
            /* 84 = navbar + tags-view = 50 + 34 */
            min-height: calc(100vh - 84px);
        }

        .fixed-header+.app-main {
            padding-top: 84px;
        }
    }
    /*// fix css style bug in open el-dialog*/
    .el-popup-parent--hidden {
        .fixed-header {
            padding-right: 17px;
        }
    }
</style>

