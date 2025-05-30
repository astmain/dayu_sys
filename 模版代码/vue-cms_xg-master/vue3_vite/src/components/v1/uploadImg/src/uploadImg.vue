<!--
*- coding = utf-8 -*-
#@Time : 2023/4/9 9:50
#@Author : CSDN 沉默小管
#@File : themePicker.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div>
    <el-upload :auto-upload="false"
               accept=".png,.jpeg,.jpg"
               :on-change="handleChangeUpload"
               @click="handleClickUpload"
               :disabled="fileList.length>=props.uploadImgLimit?true:false"
               :limit="props.uploadImgLimit" v-model:file-list="fileList" list-type="picture-card"
               v-bind="attrs">
      <el-icon ><Plus /></el-icon>
      <template #file="{ file }">
        <div>
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file,$event)">
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file,$event)">
            <el-icon><Download /></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file,props.formModel)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
        </div>
      </template>

      <template #tip>
        <div class="el-upload__tip">只能上传图片,且单张图片大小不能超过2MB,最多上传{{props.uploadImgLimit}}张</div>
      </template>
    </el-upload>
    <el-dialog v-model="dialogVisible" append-to-body>
      <div class="u-f u-f-ac u-f-ajc">
        <img w-full :src="dialogImageUrl" style="max-width: 100%" alt="沉默小管" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Plus,Delete, Download, ZoomIn } from '@element-plus/icons-vue'
import {useUpload} from "./hooks/useUpload";
import {useAttrs} from "vue";
import type {propsInterface} from "@/components/uploadImg/src/types";
const attrs = useAttrs();

let props = withDefaults(defineProps<propsInterface>(),{
  formModel:[],
  uploadImgLimit:1,
})
interface EmitType {
  (e: "handleChangeFormModel", formModel: any): void,
}
const emit = defineEmits<EmitType>();
let {handleBeforeUpload,handleClickUpload,handleChangeUpload,handleRemove,handlePictureCardPreview,handleDownload,
  dialogImageUrl,dialogVisible,disabled,fileList,isUpload}=useUpload(props.uploadImgLimit,emit)

defineExpose({
  isUpload,fileList
})
</script>

<style scoped lang="less">

</style>