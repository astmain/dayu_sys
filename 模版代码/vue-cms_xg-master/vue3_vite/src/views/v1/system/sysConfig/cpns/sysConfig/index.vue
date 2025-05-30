<!--
*- coding = utf-8 -*-
#@Time : 2022-10-05 23:04
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <Loading :isLoading="loading">
    <FormList v-model="formModel" ref="formRef" :formConfig="formConfig">
      <template #sysLogo>
        <div @click="handleShowPicListDialog(picListDialogRef)" style="cursor:pointer">
          <CommonImage :title="'系统logo'" v-if="formModel.sysLogo" :lazy="true" :isShowImg="false" :imgStyle="'cursor:pointer;height: 100px;width: auto;'" :picUrl="formModel.sysLogo" />
          <div style="border:1px solid #d8dce5;padding:10px;" class="u-f u-f-ac u-f-ajc" v-else>
            <el-icon  :size="40" class="avatar-uploader-icon"><Plus /></el-icon>
          </div>
        </div>
      </template>
      <template #formCustomBtn>
        <el-button type="primary" v-if="handleCheckPower(['system:sysConfig:sysConfig:sysConfigEdit'])" :loading="loading" @click.native.prevent="handleSubmit(formRef)">{{$t("btn.update")}}</el-button>
        <el-button type="primary" @click.native.prevent="handleResetForm(formRef)">{{$t("btn.reset")}}</el-button>
      </template>
    </FormList>

    <!--        添加-->
      <G_PicListDialog ref="picListDialogRef" @handleGetPicId="handleGetPicId" />
  </Loading>
</template>

<script setup lang="ts">

import {Plus } from '@element-plus/icons-vue'
import FormList from '@/components/formList'
import Loading from "@/components/loading/index.vue"
import {useFunc} from "./hooks/useFunc"
import {formConfig} from "./config/formConfig"
import {usePic} from "@/components/picListDialog/src/hooks/usePic";
import {defineAsyncComponent, ref} from "vue";
import type { TabsPaneContext } from 'element-plus'
import {handleCheckPower} from "@/utils/utils"
const LoadComponentsAsync = defineAsyncComponent(() => import("@/components/loadComponentsAsync/index.vue"))
const G_PicListDialog = defineAsyncComponent(() => import("@/components/picListDialog/index"))
const CommonImage = defineAsyncComponent(()=>import("@/components/commonImage/index.vue"))

let {loading, formModel,formRef,picListDialogRef, handleSubmit, handleResetForm} = useFunc()
let {handleShowPicListDialog, handleGetPicId} = usePic(formModel, ["sysLogoId", "sysLogo"])

</script>

<style scoped lang="less">


</style>
