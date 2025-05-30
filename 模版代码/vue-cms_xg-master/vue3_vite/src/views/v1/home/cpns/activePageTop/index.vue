<!--
*- coding = utf-8 -*-
#@Time : 2023/7/21 15:21
#@Author : 管茂良
#@File : index.vue
#@web  : www.php-china.com
#@Software: WebStorm
-->
<template>
  <div id="activePageTop" class="u-f">
    <div id="activePageTopEcharts" :style="{ width: cWidth+'px', height:cHeight+'px' }"></div>
  </div>
</template>

<script setup lang="ts">

import {useFunc} from "./hooks/useFunc";

let id = "activePageTopEcharts"
let {cWidth,cHeight} = useFunc(id)
</script>

<style scoped lang="less">
#activePageTop{
  min-height:400px;
}
</style>
