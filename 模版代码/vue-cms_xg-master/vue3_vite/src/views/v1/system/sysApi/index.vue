<!--
*- coding = utf-8 -*-
#@Time : 2023/5/12 17:11
#@Author : 沉默小管
#@File : index.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<!--缓存监控-->
<template>
  <Loading :isLoading="loading" style="height:calc(100vh - 100px);">
      <iframe id="iframeId" style="width:100%;height:100%;" :src="url" frameborder="0"></iframe>
  </Loading>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import Loading from "@/components/loading/index.vue"

let loading = ref(true)
let url = ref("https://www.vuecms.cn/sysApi")
const handleIframeLoad = ()=> {
  const iframe:any = document.querySelector('#iframeId')
  // 处理兼容行问题 兼容IE
  if (iframe.attachEvent) {
    iframe.attachEvent('onload', function() {
      loading.value = false
    })
  } else {
    iframe.onload = function() {
      loading.value = false
    }
  }
}
onMounted(()=>{
  loading.value = true;
  handleIframeLoad()
})
</script>

<style scoped lang="less">

</style>
