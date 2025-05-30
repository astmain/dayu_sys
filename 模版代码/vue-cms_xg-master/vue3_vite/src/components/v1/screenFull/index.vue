<!--
*- coding = utf-8 -*-
#@Time : 2022/11/1 9:06
#@Author : CSDN 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div>
    <SvgIcon :iconClass="isFullscreen?'exit-fullscreen':'fullscreen'" @click="handleClickScreenFull" />
  </div>
</template>

<script setup lang="ts">
import screenfull from "screenfull";
import {handleGetCurInstance} from "@/utils/utils";
import {onMounted, ref} from "vue";
let {model,i18n} = handleGetCurInstance()
let isFullscreen = ref(false)
const handleClickScreenFull = ()=>{
  if(!screenfull.isEnabled){
    model.handleMsg("你的浏览器不支持全屏","warning")
    return
  }
  screenfull.toggle()
}
const handleInit = ()=>{
  if (screenfull.isEnabled) {
    screenfull.on('change', handleChange)
  }
}
const handleChange = ()=>{
  isFullscreen.value = screenfull.isFullscreen
}

onMounted(()=>{
  handleInit()
})

</script>

<style scoped lang="less">

</style>