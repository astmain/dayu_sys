<!--
*- coding = utf-8 -*-
#@Time : 2022-10-05 23:04
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <Loading :isLoading="loading">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="系统配置" v-if="handleCheckPower(['system:sysConfig:sysConfig'])" name="SysConfig"></el-tab-pane>
      <el-tab-pane label="邮件配置" v-if="handleCheckPower(['system:sysConfig:emailConfig'])" name="EmailConfig"></el-tab-pane>
      <el-tab-pane label="短信配置" v-if="handleCheckPower(['system:sysConfig:textMsgConfig'])" name="TextMsgConfig"></el-tab-pane>
      <el-tab-pane label="文件配置" v-if="handleCheckPower(['system:sysConfig:fileConfig'])" name="FileConfig"></el-tab-pane>
      <el-tab-pane label="敏感词设置" v-if="handleCheckPower(['system:sysConfig:sensitiveWordConfig'])" name="SensitiveWordConfig"></el-tab-pane>
      <el-tab-pane label="第三方配置" v-if="handleCheckPower(['system:sysConfig:thirdPartyConfig'])" name="ThirdPartyConfig"></el-tab-pane>
    </el-tabs>
    <component :is="curComponent" :ref="activeName"/>

  </Loading>
</template>

<script setup lang="ts">
import Loading from "@/components/loading/index.vue"
import {useFunc} from "./hooks/useFunc"
import {handleCheckPower} from "@/utils/utils"
import {defineAsyncComponent, ref, shallowRef} from "vue";
import type { TabsPaneContext } from 'element-plus'
const SysConfig = defineAsyncComponent(() => import("./cpns/sysConfig/index.vue"))
const EmailConfig = defineAsyncComponent(() => import("./cpns/emailConfig/index.vue"))
const FileConfig = defineAsyncComponent(() => import("./cpns/fileConfig/index.vue"))
const TextMsgConfig = defineAsyncComponent(() => import("./cpns/textMsgConfig/index.vue"))
const ThirdPartyConfig = defineAsyncComponent(() => import("./cpns/thirdPartyConfig/index.vue"))
const SensitiveWordConfig = defineAsyncComponent(() => import("./cpns/sensitiveWordConfig/index.vue"))
const LoadComponentsAsync = defineAsyncComponent(() => import("@/components/loadComponentsAsync/index.vue"))

const activeName = ref<any>('SysConfig')
const curComponent = shallowRef<any>(SysConfig)
let componentArr = {
  "SysConfig": SysConfig,
  "EmailConfig": EmailConfig,
  "FileConfig": FileConfig,
  "TextMsgConfig": TextMsgConfig,
  "ThirdPartyConfig": ThirdPartyConfig,
  "SensitiveWordConfig": SensitiveWordConfig,
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  activeName.value = tab?.paneName
  curComponent.value = componentArr[tab?.paneName]
}
let {loading, formModel,formRef,picListDialogRef, handleSubmit, handleResetForm} = useFunc()
</script>

<style scoped lang="less">


</style>
