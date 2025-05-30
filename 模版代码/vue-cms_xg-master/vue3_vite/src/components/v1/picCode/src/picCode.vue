<!--
*- coding = utf-8 -*-
#@Time : 2023/5/2 14:46
#@Author : 沉默小管
#@File : picCode.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div
      class="yzcode"
      @click="handleRefresh()"
      :style="{ width: props.width + 'px', height: props.height + 'px' }"
      v-bind="attrs"
  >
    <p ref="picyzm" style="margin:0px;padding:0px"></p>
  </div>
</template>

<script setup lang='ts'>
import GVerify from "./picCode.ts";
import {ref, onMounted, useAttrs} from "vue";
import type {exposeInterface,propsInterface} from "./types/index"

let props = withDefaults(defineProps<propsInterface>(),{
  width:0,
  height:30
})

let attrs = useAttrs()

const picyzm = ref<HTMLElement | null>(null);
let verifyCode: any = null;
onMounted(() => {
  handleInit()
});

const handleInit = ()=>{
  picyzm.value && picyzm.value.focus();
  //初始化验证码
  verifyCode = new GVerify({
    type: "blend",
    height: props.height,
    con: picyzm.value,
  });
  //获取验证码内容
  const code = verifyCode.GetCode();
  emit("update:code", code);
}

//点击图片主动刷新验证码
const handleRefresh = () => {
  verifyCode.refresh();
  const code = verifyCode.GetCode();
  emit("update:code", code);
};

interface EmitType {
  (e: "update:code", params: any): void,
}
const emit = defineEmits<EmitType>();

defineExpose<exposeInterface>({
  handleRefresh
})

</script>

<style scoped>
#picyzm {
  width: 100px;
  height: 40px;
  display: inline-block;
  margin: 0 30px;
}
#verifyCodeDemo {
  width: 100%;
  display: flex;
  margin-top: 200px;
  justify-content: center;
}
#btn {
  margin: 30px auto;
  background-color: blue;
  color: #fff;
  border-radius: 5px;
  border: 0;
  width: 100px;
  height: 40px;
}
</style>