<!--
*- coding = utf-8 -*-
#@Time : 2023/7/21 15:21
#@Author : 管茂良
#@File : index.vue
#@web  : www.php-china.com
#@Software: WebStorm
-->
<template>
  <div id="userSourceTop" class="u-f">
    <div id="userSourceTopEcharts" :style="{ width: cWidth+'px', height:cHeight+'px' }"></div>
  </div>
</template>

<script setup lang="ts">

import {useFunc} from "@/views/home/cpns/userSourceTop/hooks/useFunc";

let id = "userSourceTopEcharts"
let {cWidth,cHeight} = useFunc(id)
</script>

<style scoped lang="less">
#userSourceTop{
  min-height:400px;
}
</style>
