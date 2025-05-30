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
                            :toolbars="mdEditorToolbarsConfig"
                            v-model="formModel.content"
                    >
                    </MdEditor>
                </template>
            </FormList>
            <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click.native.prevent="handleEditSubmit(formRef,emit)">{{$t("btn.edit")}}</el-button>
          <el-button type="primary" @click.native.prevent="handleResetForm(formRef)">{{$t("btn.reset")}}</el-button>
          <el-button @click.native.prevent="handleCancel">{{$t("btn.cancel")}}</el-button>
      </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import {mdEditorToolbarsConfig} from '../config';
    import MdEditor from 'md-editor-v3';
    import 'md-editor-v3/lib/style.css';
    import {formConfig} from "./config/formConfig";
    import FormList from '@/components/formList'
    import {useFunc} from "./hooks/useFunc";
    import {defineAsyncComponent, ref} from "vue";
    const LoadComponentsAsync = defineAsyncComponent(()=>import("@/components/loadComponentsAsync/index.vue"))
    const G_PicListDialog = defineAsyncComponent(()=>import("@/components/picListDialog/index"))
    import type {propsInterface,exposeInterface} from "@/views/system/msgManage/notice/cpns/noticeEditDialog/types";

    let props = withDefaults(defineProps<propsInterface>(),{
        alignCenter:true,
    })

    interface EmitType {
        (e: "handleCloseDialog"): void,
    }
    const emit = defineEmits<EmitType>()

    let {handleOpenDialog,handleResetForm,handleEditSubmit,handleCancel,model,dialogShow,loading,dialogTitle,key,formModel,roleOptions} = useFunc()


    defineExpose<exposeInterface>({
        handleResetForm,
        handleOpenDialog
    })
</script>

<style scoped lang="less">

</style>