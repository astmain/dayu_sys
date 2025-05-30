<!--
*- coding = utf-8 -*-
#@Time : 2022/12/30 9:06
#@Author : CSDN 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div>
    <el-dialog class="dialog-style" :align-center="props.alignCenter" :key="key" v-model="dialogShow" :title="dialogTitle">
      <el-form
          v-loading.lock="loading"
          label-width="auto"
          ref="formRef"
          :model="props.formModel"
          class="login-form"
          status-icon
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="操作模块:" prop="title">
              {{ props.formModel.title }}
            </el-form-item>
            <el-form-item label="登录信息:" prop="title">
              {{ props.formModel.operName }} / {{ props.formModel.operIp }} / {{ props.formModel.operLocation }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请求地址:">
              {{ props.formModel.operUrl }}
            </el-form-item>
            <el-form-item label="请求方式:">
              {{ props.formModel.requestMethod }}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="操作方法:">
              {{props.formModel.method}}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="请求参数:">
              {{props.formModel.operParam}}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="返回参数:">
              {{props.formModel.jsonResult}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作状态：">
              <div v-if="props.formModel.status === 0">正常</div>
              <div v-else-if="props.formModel.status === 1">失败</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作时间:">
              {{handleParseTime(props.formModel.operTime) }}
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="props.formModel.status === 1">
            <el-form-item label="异常信息:">
              {{ props.formModel.errorMsg }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {handleParseTime} from "@/utils/utils"
import {handleGetCurInstance} from "@/utils/utils";
import {onMounted, ref} from "vue";
import FormList from "@/components/formList";
import type {propsInterface,exposeInterface} from "@/views/system/logManage/errorLog/cpns/operationDetailDialog/types";

let props = withDefaults(defineProps<propsInterface>(),{
    alignCenter:true,
})
let {axios,model} = handleGetCurInstance()
let loading = ref(false)
let key = ref(0)
let dialogTitle = ref("")
let dialogShow = ref(false)
let formRef = ref<InstanceType<typeof FormList>>()

interface EmitType {
  (e: "handleCloseDialog"): void,
}
onMounted(()=>{
  // options.length = 0;
})

const emit = defineEmits<EmitType>()

const handleResetForm = ()=> {

  formRef.value.resetFields()
}

defineExpose<exposeInterface>({
  handleResetForm
})
</script>

<style scoped lang="less">

</style>