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
        <el-dialog class="dialog-style" :align-center="props.alignCenter" :key="key" v-model="dialogShow" :title="dialogTitle">
          <FormList v-model="formModel" ref="formRef" :formConfig="formConfig" >
            <template #imgUrl>
              <UploadImg
                  ref="uploadImgRef"
                  :formModel="formModel"
                  @handleChangeFormModel="handleChangeFormModel"
              />
            </template>
            <template #imgSortId>
              <el-select v-model="formModel.imgSortId" clearable placeholder="请选择图片分类">
                <el-option v-for="(item,index) in imgSortArr" :key="index" :label="item.sortName" :value="item.id" />
              </el-select>
            </template>
          </FormList>
            <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" :loading="loading" @click.native.prevent="handleEditSubmit(uploadImgRef,formRef)">{{$t("btn.edit")}}</el-button>
        <el-button type="primary" @click.native.prevent="handleResetForm(uploadImgRef,formRef)">{{$t("btn.reset")}}</el-button>
        <el-button @click.native.prevent="handleCancel(uploadImgRef)">{{$t("btn.cancel")}}</el-button>
      </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import {formConfig} from "./config/formConfig"
    import FormList from '@/components/formList'
    import {useFunc} from "./hooks/useFunc";
    import UploadImg from "@/components/uploadImg";
    import type {propsInterface,exposeInterface} from "@/views/pic/picList/cpns/picEditDialog/types";

    let props = withDefaults(defineProps<propsInterface>(),{
        alignCenter:true,
    })

    interface EmitType {
        (e: "handleCloseDialog"): void,
    }
    const emit = defineEmits<EmitType>()

    let {handleOpenDialog,handleResetForm,handleEditSubmit,handleCancel,handleChangeFormModel,
      formRef,uploadImgRef,dialogShow,loading,dialogTitle,key,formModel,imgSortArr} = useFunc(emit)

    defineExpose<exposeInterface>({
        handleResetForm,
        handleOpenDialog
    })
</script>

<style scoped lang="less">

</style>