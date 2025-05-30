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
      <template #formCustomBtn>
        <el-button type="primary" v-if="handleCheckPower(['system:sysConfig:fileConfig:localFile'])" :loading="loading" @click.native.prevent="handleSubmit(formRef)">{{$t("btn.update")}}</el-button>
        <el-button type="primary" @click.native.prevent="handleResetForm(formRef)">{{$t("btn.reset")}}</el-button>
      </template>
    </FormList>

  </Loading>
</template>

<script setup lang="ts">
import Loading from "@/components/loading/index.vue"
import FormList from '@/components/formList'
import {useFunc} from "./hooks/useFunc"
import {formConfig} from "./config/formConfig"
import {defineAsyncComponent, ref} from "vue";
import {handleCheckPower} from "@/utils/utils"
const LoadComponentsAsync = defineAsyncComponent(() => import("@/components/loadComponentsAsync/index.vue"))

let {loading, formModel,formRef, handleSubmit, handleResetForm} = useFunc()

</script>

<style scoped lang="less">


</style>
