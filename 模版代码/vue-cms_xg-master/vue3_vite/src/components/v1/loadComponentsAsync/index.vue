<!--
*- coding = utf-8 -*-
#@Time : 2022/9/20 9:21
#@Author : CSDN 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<!--帮助我们异步处理组件。Suspense管理我们的加载状态-->
<template>
    <div>
        <Suspense>
            <template #default>
                <slot/>
            </template>
            <template #fallback>
                <div style="width:100%;height:100vh" class="u-f u-f-ac u-f-ajc" v-if="props.isShow">
                    <div class="loading-icon">
                        <span :style="'background:'+primary"></span>
                        <span :style="'background:'+primary"></span>
                        <span :style="'background:'+primary"></span>
                        <span :style="'background:'+primary"></span>
                        <span :style="'background:'+primary"></span>
                    </div>
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
    import {useStore} from "@/store/piniaAutoImport";
    import {storeToRefs} from "pinia";
    import type {propsInterface} from "@/components/loadComponentsAsync/types";

    let props = withDefaults(defineProps<propsInterface>(),{
        isShow:true
    })
    //加载颜色设置主体颜色
    let settingStore = useStore("useSetting")
    let {themeColor} = storeToRefs(settingStore)
    let {primary} = themeColor.value;
</script>

<style scoped lang="less">
    .loading-icon{
        width: 150px;
        height: 15px;
        margin: 0 auto;
        text-align: center;
    }
    .loading-icon span{
        display: inline-block;
        width: 15px;
        height: 100%;
        margin-right: 5px;
        background: linear-gradient(60deg,rgb(39, 91, 214),rgb(16, 54, 171));
        -webkit-animation: load 1.04s ease infinite;
    }
    .loading-icon span:last-child{
        margin-right: 0px;
    }
    @-webkit-keyframes load{
        0%{
          opacity: 1;
        }
        100%{
          opacity: 0;
        }
    }
    @keyframes load{
        0%{
          opacity: 1;
        }
        100%{
          opacity: 0;
        }
    }
    .loading-icon span:nth-child(1){
        -webkit-animation-delay:0.13s;
    }
    .loading-icon span:nth-child(2){
        -webkit-animation-delay:0.36s;
    }
    .loading-icon span:nth-child(3){
        -webkit-animation-delay:0.59s;
    }
    .loading-icon span:nth-child(4){
        -webkit-animation-delay:0.72s;
    }
    .loading-icon span:nth-child(5){
        -webkit-animation-delay:0.95s;
    }
</style>
