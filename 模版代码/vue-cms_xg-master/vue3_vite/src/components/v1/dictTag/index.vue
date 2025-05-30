<!--
*- coding = utf-8 -*-
#@Time : 2022/10/11 11:18
#@Author : CSDN 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<!--字典标签-->
<template>
  <div>
    <template v-for="(item, index) in props.options">

      <template v-if="values.includes(item.value)">
        <span
            v-if="item.listClass == 'default' || item.listClass == ''"
            :key="item.value"
        >{{ item.label }}</span>
        <el-tag
            v-else
            :disable-transitions="true"
            :key="item.value"
            :type="item.listClass == 'primary' ? '' : item.listClass"
            v-bind="attrs"
        >
          {{ item.label }}
        </el-tag>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">

import {computed, useAttrs} from "vue";
import type {propsInterface} from "@/components/dictTag/types";


let props = withDefaults(defineProps<propsInterface>(),{
  options:[],
  value:""
})
const attrs = useAttrs()
const values = computed(()=>{
  if (props.value !== null && typeof props.value !== 'undefined') {
    return Array.isArray(props.value) ? props.value : [String(props.value)];
  } else {
    return [];
  }
})
</script>

<style scoped lang="less">
.el-tag{
  margin-left:10px;
}
</style>