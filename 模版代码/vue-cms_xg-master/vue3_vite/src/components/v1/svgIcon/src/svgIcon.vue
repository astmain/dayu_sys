<!--
*- coding = utf-8 -*-
#@Time : 2022/10/13 15:55
#@Author : CSDN 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <svg :style="getStyle" class="svg-style u-f u-f-ac u-f-ajc" aria-hidden="true">
    <use :href="svgHref" />
  </svg>
</template>

<script setup lang="ts">
import {CSSProperties} from "vue";
import {computed} from "vue";
import type {propsInterface} from "@/components/svgIcon/src/types";

let props = withDefaults(defineProps<propsInterface>(),{
  iconClass:"",
  className:"",
  size:"12",
})

const svgHref = computed(()=>{
  return `#icon-${props.iconClass}`
})
const getStyle = computed((): CSSProperties => {
      const { size } = props;
      let s = `${size}`;
      s = `${s.replace('px', '')}px`;
  return {
        width: s,
        height: s,
        fill: 'currentColor',
        ...props.iconStyle
      };
    }
);
</script>

<style scoped lang="less">
.svg-style:focus{
  outline: none;
}
</style>
