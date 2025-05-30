<!--
*- coding = utf-8 -*-
#@Time : 2022/11/1 16:02
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div>
    <el-dialog class="dialog-style" :align-center="props.alignCenter" :key="key" v-model="dialogShow" width="400" :title="dialogTitle">
      <FormList v-model="formModel" ref="formRef" :formConfig="formConfig" >
          <template #menuIds>
              <el-tree style="width:100%" class="tree-border" :data="menuOptions" @check="handleCurrentChecked" show-checkbox ref="menuRef" node-key="id"
                       empty-text="加载中，请稍候" :props="defaultProps" :check-strictly="true"></el-tree>
          </template>
      </FormList>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click.native.prevent="handleAddSubmit(formRef,emit)">{{$t("btn.add")}}</el-button>
          <el-button type="primary" @click.native.prevent="handleResetForm(formRef)">{{$t("btn.reset")}}</el-button>
          <el-button @click.native.prevent="handleCancel">{{$t("btn.cancel")}}</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {formConfig} from "./config/formConfig";
import FormList from '@/components/formList'
import {useFunc} from "./hooks/useFunc";
import {useTreeFunc} from "../hooks/useTreeFunc";
import type {propsInterface,exposeInterface} from "@/views/user/userRole/cpns/userRoleAddDialog/types";

let props = withDefaults(defineProps<propsInterface>(),{
  alignCenter:true,
})

interface EmitType {
  (e: "handleCloseDialog"): void,
}

const emit = defineEmits<EmitType>()

let {handleOpenDialog,handleResetForm,handleAddSubmit,handleCancel,formRef,menuRef,dialogShow,loading,dialogTitle,key,formModel,model,menuOptions,defaultProps} = useFunc()
let {handleCurrentChecked} = useTreeFunc(formModel)

defineExpose<exposeInterface>({
  handleResetForm,
  handleOpenDialog
})

</script>

<style scoped lang="less">

</style>