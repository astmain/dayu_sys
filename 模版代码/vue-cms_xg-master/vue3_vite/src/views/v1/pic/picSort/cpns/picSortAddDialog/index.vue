<!--
*- coding = utf-8 -*-
#@Time : 2022-10-05 23:04
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div>
    <el-dialog class="dialog-style" :align-center="props.alignCenter" :key="key" v-model="dialogShow" width="350" :title="dialogTitle">
        <FormList v-model="formModel" ref="formRef" :formConfig="formConfig"/>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" :loading="loading" @click.native.prevent="handleAddSubmit(formRef,emit)">{{$t("btn.add")}}</el-button>
          <el-button type="primary" @click.native.prevent="handleResetForm(formRef)">{{$t("btn.reset")}}</el-button>
          <el-button @click.native.prevent="handleCancel">{{$t("btn.cancel")}}</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">

import {formConfig} from "./config/formConfig"
import FormList from '@/components/formList'
import {useFunc} from "./hooks/useFunc";
import type {propsInterface,exposeInterface} from "@/views/pic/picSort/cpns/picSortAddDialog/types";

let props = withDefaults(defineProps<propsInterface>(),{
  alignCenter:true,
})

interface EmitType {
  (e: "handleCloseDialog"): void,
}
const emit = defineEmits<EmitType>()

let {handleOpenDialog,handleAddSubmit,handleResetForm,handleCancel,dialogShow,loading,key,dialogTitle,formModel,formRef} = useFunc()


defineExpose<exposeInterface>({
  handleResetForm,
  handleOpenDialog
})
</script>


<style scoped lang="less">

</style>