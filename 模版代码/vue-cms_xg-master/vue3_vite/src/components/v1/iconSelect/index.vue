<!--
*- coding = utf-8 -*-
#@Time : 2022/10/13 10:35
#@Author : CSDN 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
    <div class="icon-body">
        <el-input v-model.trim="name" style="position: relative;" clearable placeholder="请输入图标名称" @clear="filterIcons" @input.native="filterIcons">
            <i slot="suffix" class="el-icon-search el-input__icon" />
        </el-input>
        <div class="icon-list">
            <div class="u-f u-f-ac" v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)">
                <SvgIcon style="margin-right:5px" :iconClass="item" />
                <span class="title">
          {{item}}
        </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import icons from './requireIcons'
    import {ref} from "vue";
    import type {exposeInterface} from "@/components/iconSelect/types";
    let name = ref("")
    let iconList = ref(icons)
    interface PropsEmit{
        (e:"selected",name?:string):void
    }
    const emit = defineEmits<PropsEmit>()

    const filterIcons = ()=>{
        iconList.value = icons
        if (name.value) {
            iconList.value = iconList.value.filter((item:any) => item.includes(name.value))
        }
    }
    const selectedIcon = (name:string)=>{
        emit('selected', name)
        document.body.click()
    }
    const reset = () =>{
        name.value = ''
        iconList.value = icons
    }
    defineExpose<exposeInterface>({
        reset
    })
</script>

<style scoped lang="less">
    .icon-body {
        width: 100%;
        padding: 10px;
        .icon-list {
            height: 200px;
            overflow-y: scroll;
            div {
                height: 30px;
                line-height: 30px;
                margin-bottom: -5px;
                cursor: pointer;
                width: 33%;
                float: left;
            }
            span {
                display: inline-block;
                vertical-align: -0.15em;
                fill: currentColor;
                overflow: hidden;
            }
        }
    }
</style>
