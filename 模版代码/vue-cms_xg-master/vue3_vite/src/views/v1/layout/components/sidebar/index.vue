<template>
    <div class="sidebar-style" :class="{'has-logo':showLogo}" :style="{ backgroundColor: settingStore.sideTheme === 'theme-dark' ? $style.menuBackground : $style.menuLightBackground }">
        <G_Logo v-if="showLogo" :collapse="isCollapse()" />
        <el-scrollbar :class="settingStore.sideTheme" wrap-class="scrollbar-wrapper">
            <el-menu
                    :default-active="activeMenu"
                    :collapse="isCollapse()"
                    :background-color="settingStore.sideTheme === 'theme-dark' ? $style.menuBackground : $style.menuLightBackground"
                    :text-color="settingStore.sideTheme === 'theme-dark' ? $style.menuColor : $style.menuLightColor"
                    :unique-opened="true"
                    :active-text-color="settingStore.themeColor.primary"
                    :collapse-transition="false"
                    mode="vertical">
                <G_SidebarItem
                        v-for="(route, index) in permissionStore.sidebarRouters"
                        :key="route.path  + index"
                        :item="route"
                        :isOpen="isCollapse()"
                        :base-path="route.path"
                        :lev="1"
                ></G_SidebarItem>
            </el-menu>
        </el-scrollbar>
      <el-image class="img" :src="menuBg" v-if="settingStore.sideTheme === 'theme-light'"/>
    </div>
</template>

<script setup lang="ts">
    import menuBg from "@/assets/img/menuBg.png"
    import {computed, defineAsyncComponent} from "vue";
    import {useStore} from "@/store/piniaAutoImport";
    import {useRouter} from "vue-router";

    const G_Logo = defineAsyncComponent(()=>import("./logo.vue"))
    const G_SidebarItem = defineAsyncComponent(()=>import("./sidebarItem.vue"))
    const appStore:any = useStore("useApp")
    const settingStore:any = useStore("useSetting")
    const permissionStore:any = useStore("usePermission")
    const router = useRouter()
    const showLogo = computed(()=>{
        return settingStore.sidebarLogo
    })
    const activeMenu = computed(()=>{
        const route = router.currentRoute.value;
        const { meta, path } = route;
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
            return meta.activeMenu;
        }
        return path;
    })
    const isCollapse = () => {
      return !appStore.sidebar.opened;
    }
</script>
<style scoped module lang="scss">
    @import "@/assets/css/variables.scss";
</style>
<style scoped lang="less">
    .sidebar-style{
        position: relative;
        border-right: 1px solid #d8dce5;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
      .img{
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 999;
        pointer-events: none;//点击穿透
      }
    }
</style>
