<!--
*- coding = utf-8 -*-
#@Time : 2023-02-07 23:43
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
    <div>
        <el-dialog class="dialog-style" :align-center="props.alignCenter" :key="key" v-model="dialogShow" width="350" :title="dialogTitle">
            <FormList v-model="formModel" ref="formRef" :formConfig="formConfig" />
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

    import FormList from '@/components/formList'
    import {formConfig} from "./config/formConfig";
    import {useFunc} from "@/views/article/articleSort/cpns/articleSortAddDialog/hooks/useFunc";
    import type {propsInterface} from "@/views/article/articleSort/cpns/articleSortAddDialog/types";
    import {exposeInterface} from "@/views/article/articleSort/cpns/articleSortAddDialog/types";

    let props = withDefaults(defineProps<propsInterface>(),{
        alignCenter:true,
    })

    let {handleOpenDialog,handleAddSubmit,handleResetForm,handleCancel,formRef,dialogShow,loading,key,dialogTitle,formModel} = useFunc()

    interface EmitType {
        (e: "handleCloseDialog"): void,
    }
    const emit = defineEmits<EmitType>()

    defineExpose<exposeInterface>({
        handleResetForm,
        handleOpenDialog
    })
</script>


<style scoped lang="less">

</style>