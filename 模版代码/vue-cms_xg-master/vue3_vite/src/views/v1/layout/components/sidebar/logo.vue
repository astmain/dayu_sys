<template>
    <div class="sidebar-logo-container" :class="{'collapse':collapse}" :style="{ color:'red',backgroundColor: sideTheme === 'theme-dark' ? $style.menuBackground : $style.menuLightBackground }">
        <transition name="sidebarLogoFade">
            <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
              <img v-if="computedSysLogo" :src="computedSysLogo" class="sidebar-logo" />
            </router-link>
            <router-link v-else key="expand" class="sidebar-logo-link" to="/">
                <img v-if="computedSysLogo" :src="computedSysLogo" class="sidebar-logo" />
                <h1 class="sidebar-title" :style="{ color: sideTheme === 'theme-dark' ? $style.logoTitleColor : $style.logoLightTitleColor }">{{ computedSysName }} </h1>
            </router-link>
        </transition>
    </div>
</template>

<script setup lang="ts">
    import logoImg from '@/assets/img/vueCms.jpg'
    import {computed, defineAsyncComponent, ref} from "vue";
    import {useStore} from "@/store/piniaAutoImport";
    let settingStore:any = useStore("useSetting")
    let userStore:any = useStore("useUser")
    const CommonImage = defineAsyncComponent(()=>import("@/components/commonImage/index.vue"))
    // let settingStore:any = useStore("useSetting")
    // let appStore:any = useStore("useApp")
    let logo = ref<string>(logoImg)
    interface propsInterface {
        collapse?:boolean
    }
    let {collapse=true} = defineProps<propsInterface>()
    const sideTheme = computed(()=>{
        return settingStore.sideTheme
    })
    const computedSysLogo = computed(()=>{
        return userStore.sysConfig["sysLogo"]?userStore.sysConfig["sysLogo"]:logo.value;
    })
    const computedSysName = computed(()=>{
        return userStore.sysConfig["sysName"]?userStore.sysConfig["sysName"]:"vueCms";
    })
</script>

<style lang="scss" scoped module>
    @import "@/assets/css/variables.scss";
</style>
<style lang="scss" scoped>
    .sidebarLogoFade-enter-active {
        transition: opacity 1.5s;
    }

    .sidebarLogoFade-enter,
    .sidebarLogoFade-leave-to {
        opacity: 0;
    }

    .sidebar-logo-container {
        position: relative;
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #2b2f3a;
        text-align: center;
        overflow: hidden;

        & .sidebar-logo-link {
            height: 100%;
            width: 100%;

            & .sidebar-logo {
                width: 32px;
                height: 32px;
                vertical-align: middle;
                margin-right: 12px;
            }

            & .sidebar-title {
                display: inline-block;
                margin: 0;
                color: #fff;
                font-weight: 600;
                line-height: 50px;
                font-size: 14px;
                font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
                vertical-align: middle;
            }
        }

        &.collapse {
            .sidebar-logo {
                margin-right: 0px;
            }
        }
    }
</style>
