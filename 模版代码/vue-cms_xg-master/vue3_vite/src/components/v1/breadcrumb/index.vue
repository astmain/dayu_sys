<!--
*- coding = utf-8 -*-
#@Time : 2022-09-08 21:42
#@Author : CSDN 沉默小管
#@File : Index1.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<!--element-plus 面包削组件-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import router from "@/router/index";
import {onMounted, reactive, watch} from "vue";

let levelList = reactive<Array<any>>([])

//监听路由变化，动态改变面包屑标题
watch(()=>router.currentRoute.value,(value:any)=>{
  if (value.path.startsWith('/redirect/')) {
    return
  }
  handleGetBreadcrumb()
},{deep:true})

onMounted(()=>{
  handleGetBreadcrumb()
})

const handleGetBreadcrumb = ()=>{
  levelList.length = 0
  let matched:any = router.currentRoute.value.matched.filter(item => item.meta && item.meta.title)
  const first = matched[0]
  if (!isDashboard(first)) {
    matched = [{ path: '/', meta: { title: '首页' }}].concat(matched)
  }
  levelList.push(...matched.filter((item: any) => item.meta && item.meta.title && item.meta.breadcrumb !== false))
}

const isDashboard = (route:any)=>{
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim() === '首页'
}

const pathCompile = (path:any)=>{
  const {pathToRegexp } = require('path-to-regexp');
  const { params } = router.currentRoute.value
  let toPath = pathToRegexp.compile(path)
  return toPath(params)
}
const handleLink = (item: { redirect: any; path: any })=>{
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(pathCompile(path))
}

</script>

<style scoped lang="less">
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>