<!--
*- coding = utf-8 -*-
#@Time : 2022-09-22 23:35
#@Author : 沉默小管
#@File : redirect.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div>
    <div v-show="false" ref="clickRef" @click="handleToUrl"></div>
  </div>
</template>
<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()
let clickRef = ref()

const handleToUrl = ()=>{
  let path = route.params
  let query = route.query
  router.replace({path:"/"+path.path,query}).catch(failure => {
    console.log(failure);
  })
}
const handleToPage = ()=>{
  clickRef.value.dispatchEvent(new MouseEvent('click'));
}
onMounted(()=>{
  handleToPage()
})
</script>
