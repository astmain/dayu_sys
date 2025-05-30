<!--
*- coding = utf-8 -*-
#@Time : 2022/10/16 14:40
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div>
    <el-dialog class="dialog-style" :align-center="props.alignCenter" :key="key" v-model="dialogShow" :title="dialogTitle">
      <FormList v-model="formModel" ref="formRef" :formConfig="formConfig" >
        <template #content>
          <MdEditor
              :toolbarsExclude="['github']"
              :toolbars="mdEditorToolbarsConfig"
              v-model="formModel.content"
              highlightJs="/highlight.min.js"
              highlightCss="/atom-one-dark.min.css"
              prettierCDN="/standalone.js"
              prettierMDCDN="/parser-markdown.js"
              cropperJs="/cropper.min.js"
              cropperCss="/cropper.min.css"
          >
          </MdEditor>
        </template>
        <template #notifyUid>
          <el-transfer
              v-model="formModel.notifyUid"
              filterable
              :titles="['用户列表', '接收通知用户']"
              :filter-method="handleFilterMethod"
              filter-placeholder="请输入用户名"
              :data="transferData"
          />
        </template>
      </FormList>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click.native.prevent="handleEditSubmit(formRef,emit)">发送通知</el-button>
          <el-button type="primary" @click.native.prevent="handleResetForm(formRef)">{{$t("btn.reset")}}</el-button>
          <el-button @click.native.prevent="handleCancel">{{$t("btn.cancel")}}</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {mdEditorToolbarsConfig} from '../config';
import {formConfig} from "./config/formConfig";
import FormList from '@/components/formList'
import {useFunc} from "./hooks/useFunc";
import {defineAsyncComponent, ref} from "vue";
const LoadComponentsAsync = defineAsyncComponent(()=>import("@/components/loadComponentsAsync/index.vue"))
import type {propsInterface} from "@/views/system/msgManage/notice/cpns/noticeSendMsgDialog/types";
import type {exposeInterface} from "@/views/system/msgManage/notice/cpns/noticeSendMsgDialog/types";

let props = withDefaults(defineProps<propsInterface>(),{
  alignCenter:true,
})

interface EmitType {
  (e: "handleCloseDialog"): void,
}
const emit = defineEmits<EmitType>()

let {formRef,transferData,handleOpenDialog,handleResetForm,handleEditSubmit,handleCancel,handleFilterMethod,model,dialogShow,loading,dialogTitle,key,formModel} = useFunc()


defineExpose<exposeInterface>({
  handleResetForm,
  handleOpenDialog
})
</script>

<style scoped lang="less">
//弹出框 宽度设置
@media screen and (min-width:1200px){
  *{
    :deep(.dialog-style){
      width:60% !important;
    }
  }
}
@media screen and (min-width:600px ) and (max-width:1200px) {
  *{
    :deep(.dialog-style){
      width:80% !important;
    }
  }
}
</style>