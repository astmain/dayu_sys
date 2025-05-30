<!--
*- coding = utf-8 -*-
#@Time : 2022-09-09 1:11
#@Author : CSDN 沉默小管
#@File : Index1.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
    <div ref="rightPanel" :class="{show:show}" class="rightPanel-container">
        <div class="rightPanel-background" />
        <div class="rightPanel">
            <div class="rightPanel-items">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import {addClass, removeClass} from "@/utils/systemRules";
    import {useSetting} from "@/store/index";
    import {computed, onMounted, ref, watch} from "vue";
    import type {propsInterface} from "@/components/rightPanel/types";

    let {
        clickNotClose=false,
        buttonTop=250,
    }=defineProps<propsInterface>()

    let settingStore:any = useSetting()
    let rightPanel = ref(null)

    const show = computed({
        get() {
            return settingStore.showSettings
        },
        set(val) {
            settingStore.changeSetting({
                key: 'showSettings',
                value: val
            })
        }
    })

    watch(()=>show.value,(value:any)=>{
        if (value && !clickNotClose) {
            addEventClick()
        }
      if (value) {
            addClass(document.body, 'showRightPanel')
        } else {
            removeClass(document.body, 'showRightPanel')
        }
    },{deep:true})

    const addEventClick = () => {
        window.addEventListener('click', closeSidebar)
    }
    const closeSidebar = (evt:any) => {
        const parent = evt.target.closest('.rightPanel-background')
        if (parent) {
            show.value = false
            window.removeEventListener('click', closeSidebar)
        }
    }
    const insertToBody = () => {
        const elx = rightPanel.value
        const body = document.querySelector('body')
        body.insertBefore(elx, body.firstChild)
    }

    onMounted(()=>{
      insertToBody()
      addEventClick()
    })

</script>
<style>
    .showRightPanel {
        overflow: hidden;
        position: relative;
        width: calc(100% - 15px);
    }
</style>

<style scoped lang="less">
    .rightPanel-background {
        position: fixed;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity .3s cubic-bezier(.7, .3, .1, 1);
        background: rgba(0, 0, 0, .2);
        z-index: -1;
    }
    @media screen and (max-width:760px) {
      .rightPanel{
        max-width: 70% !important;
      }
    }
    .rightPanel {
        width: 100%;
        max-width: 350px;
        height: 100vh;
        position: fixed;
        top: 0;
        right: 0;
        box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .05);
        transition: all .25s cubic-bezier(.7, .3, .1, 1);
        transform: translate(100%);
        background: #fff;
        z-index: 1000;
    }

    .show {
        transition: all .3s cubic-bezier(.7, .3, .1, 1);

        .rightPanel-background {
            z-index: 500;
            opacity: 1;
            width: 100%;
            height: 100%;
        }

        .rightPanel {
            transform: translate(0);
        }
    }

    .handle-button {
        width: 48px;
        height: 48px;
        position: absolute;
        left: -48px;
        text-align: center;
        font-size: 24px;
        border-radius: 6px 0 0 6px !important;
        z-index: 0;
        pointer-events: auto;
        cursor: pointer;
        color: #fff;
        line-height: 48px;
        i {
            font-size: 24px;
            line-height: 48px;
        }
    }
</style>
