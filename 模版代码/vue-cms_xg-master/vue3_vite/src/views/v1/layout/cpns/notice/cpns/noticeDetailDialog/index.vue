<!--
*- coding = utf-8 -*-
#@Time : 2022/10/16 14:40
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
    <div class="notice-detail-dialog">
        <el-dialog class="dialog-style" :align-center="props.alignCenter" :key="key" v-model="dialogShow" :title="''">
            <div style="line-height: 30px;">
              <div class="u-f">
                <div class="margin-right-10">标&nbsp;&nbsp;&nbsp;&nbsp;题:</div>
                <div>{{formModel.title}}</div>
              </div>
              <div class="u-f">
                <div class="margin-right-10">发送人:</div>
                <div>{{formModel.sendNoticeName}}</div>
              </div>
              <div class="u-f">
                <div class="margin-right-10">日&nbsp;&nbsp;&nbsp;&nbsp;期:</div>
                <div>{{handleParseTime(formModel.addTime)}}</div>
              </div>
              <div>
                <div>内&nbsp;&nbsp;&nbsp;&nbsp;容:</div>
                <div>{{formModel.content}}</div>
              </div>
            </div>
            <template #footer>
      <span class="dialog-footer">
          <el-button v-if="formModel.status!=1" @click.native.prevent="handleChangeNoticeStatus()" type="primary">已读</el-button>
          <el-button @click.native.prevent="handleCancel">{{$t("btn.cancel")}}</el-button>
      </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import {handleParseTime} from "@/utils/utils"
    import MdEditor from 'md-editor-v3';
    import 'md-editor-v3/lib/style.css';
    import {formConfig} from "./config/formConfig";
    import FormList from '@/components/formList'
    import {useFunc} from "./hooks/useFunc";
    import {defineAsyncComponent, ref} from "vue";
    import type {propsInterface,exposeInterface} from "@/views/layout/cpns/notice/cpns/noticeDetailDialog/types";
    const LoadComponentsAsync = defineAsyncComponent(()=>import("@/components/loadComponentsAsync/index.vue"))

    let props = withDefaults(defineProps<propsInterface>(),{
        alignCenter:true,
    })

    const formRef = ref<InstanceType<typeof FormList>>()

    interface EmitType {
        (e: "handleCloseDialog"): void,
    }
    const emit = defineEmits<EmitType>()

    let {handleOpenDialog,handleCancel,model,dialogShow,loading,dialogTitle,key,formModel,handleChangeNoticeStatus} = useFunc(emit)

    defineExpose<exposeInterface>({
        handleOpenDialog
    })
</script>

<style scoped lang="less">
.notice-detail-dialog{
  cursor:default;
    :deep(.el-dialog__body){
        padding:0px 16px;
    }
    :deep(.dialog-style){
        z-index:999;
    }
}
</style>