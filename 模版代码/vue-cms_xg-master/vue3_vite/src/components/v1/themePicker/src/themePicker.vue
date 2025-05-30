<!--
*- coding = utf-8 -*-
#@Time : 2023/4/9 9:50
#@Author : CSDN 沉默小管
#@File : themePicker.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div class="u-f u-f-spa u-f-ajs">
    <div class="item-style">
      <span class="margin-right-10">{{$t("content.primary")}}</span>
      <span class="comp-style">
        <el-color-picker v-model="primary" :predefine="predefineColorArr" @change="handleChangeThemeColor($event,'primary')"/>
      </span>
    </div>
    <div class="item-style">
      <span class="margin-right-10">{{$t("content.success")}}</span>
      <span class="comp-style">
        <el-color-picker v-model="success" :predefine="predefineColorArr" @change="handleChangeThemeColor($event,'success')"/>
      </span>
    </div>
    <div class="item-style">
      <span class="margin-right-10">{{$t("content.warning")}}</span>
      <span class="comp-style">
        <el-color-picker v-model="warning" :predefine="predefineColorArr" @change="handleChangeThemeColor($event,'warning')"/>
      </span>
    </div>
    <div class="item-style">
      <span class="margin-right-10">{{$t("content.danger")}}</span>
      <span class="comp-style">
        <el-color-picker v-model="danger" :predefine="predefineColorArr" @change="handleChangeThemeColor($event,'danger')"/>
      </span>
    </div>
    <div class="item-style">
      <span class="margin-right-10">{{$t("content.error")}}</span>
      <span class="comp-style">
        <el-color-picker v-model="error" :predefine="predefineColorArr" @change="handleChangeThemeColor($event,'error')"/>
      </span>
    </div>
    <div class="item-style">
      <span class="margin-right-10">{{$t("content.info")}}</span>
      <span class="comp-style">
        <el-color-picker v-model="info" :predefine="predefineColorArr" @change="handleChangeThemeColor($event,'info')"/>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, useAttrs} from "vue";
import {useStore} from "@/store/piniaAutoImport";
const attrs = useAttrs();
const settingStore:any = useStore("useSetting")

let primary = ref(settingStore.themeColor.primary)
let success = ref(settingStore.themeColor.success)
let warning = ref(settingStore.themeColor.warning)
let danger = ref(settingStore.themeColor.danger)
let error = ref(settingStore.themeColor.error)
let info = ref(settingStore.themeColor.info)
let sideTheme = ref(settingStore.sideTheme)
let predefineColorArr = ref(['#409EFF', '#67C23A', '#E6A23C','#F56C6C','#F56C6C', '#909399', '#6959CD', '#f5222d'])

const handleChangeThemeColor = (val,type:string) => {
    settingStore.changeSetting({
        key: ["themeColor","primary"],
        value: val
    })
}

interface EmitType {
  (e: "handleChangeFormModel", formModel: any): void,
}
const emit = defineEmits<EmitType>();
// let {handleBeforeUpload,handleClickUpload,handleChangeUpload,handleRemove,handlePictureCardPreview,handleDownload,
//   dialogImageUrl,dialogVisible,disabled,fileList,isUpload}=useFunc()

// defineExpose({
//   isUpload,fileList
// })
</script>

<style scoped lang="less">
.item-style{
  margin:0px 10px 10px 0px;
}
</style>