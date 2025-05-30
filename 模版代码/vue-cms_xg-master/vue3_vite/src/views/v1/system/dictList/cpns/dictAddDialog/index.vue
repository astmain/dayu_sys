<!--
*- coding = utf-8 -*-
#@Time : 2022/12/25 17:21
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
                <el-button type="primary" @click.native.prevent="handleAddSubmit(formRef,emit)">确 定</el-button>
                  <el-button @click.native.prevent="handleCancel">{{$t("btn.cancel")}}</el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import FormList from '@/components/formList'
    import {useFunc} from "./hooks/useFunc";
    import {formConfig} from './config/formConfig';
    import type {propsInterface,exposeInterface} from "@/views/system/dictList/cpns/dictAddDialog/types";

    let props = withDefaults(defineProps<propsInterface>(),{
        alignCenter:true,
    })

    interface EmitType {
        (e: "handleCloseDialog"): void,
    }
    const emit = defineEmits<EmitType>()

    let {handleOpenDialog,handleResetForm,handleAddSubmit,handleCancel,dialogShow,loading,dialogTitle,key,formModel,formRef} = useFunc()


    defineExpose<exposeInterface>({
        handleResetForm,
        handleOpenDialog
    })

</script>

<style scoped lang="less">

</style>