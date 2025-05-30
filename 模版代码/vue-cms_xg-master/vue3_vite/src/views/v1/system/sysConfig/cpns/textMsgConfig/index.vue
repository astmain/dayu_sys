<!--
*- coding = utf-8 -*-
#@Time : 2022-10-05 23:04
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div>
    <div :class="appStore.device=='mobile'?'':'u-f'">
      <el-tabs :tab-position="appStore.device=='mobile'?'top':'left'" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="腾讯短信" name="TxMsgConfig"></el-tab-pane>
        <el-tab-pane label="阿里短信" name="AliTextMsg"></el-tab-pane>
      </el-tabs>

      <component :is="curComponent" :ref="activeName"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useFunc} from "./hooks/useFunc"
import {defineAsyncComponent} from "vue";
const LoadComponentsAsync = defineAsyncComponent(() => import("@/components/loadComponentsAsync/index.vue"))
const G_PicListDialog = defineAsyncComponent(() => import("@/components/picListDialog/index"))
const CommonImage = defineAsyncComponent(()=>import("@/components/commonImage/index.vue"))

let {activeName,curComponent,appStore,handleClick} = useFunc()

</script>

<style scoped lang="less">


</style>
