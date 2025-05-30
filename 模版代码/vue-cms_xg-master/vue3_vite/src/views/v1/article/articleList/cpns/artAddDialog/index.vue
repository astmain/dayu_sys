<!--
*- coding = utf-8 -*-
#@Time : 2022-09-27 11:45
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
    <div>
        <el-dialog class="dialog-style" :align-center="props.alignCenter" :key="key" v-model="dialogShow" :fullscreen="dialogFullscreen" :show-close="false">
            <template #header="{ close, titleId, titleClass }">
                <div class="u-f u-f-ajs">
                    <div>{{dialogTitle}}</div>
                    <div class="u-f" style="cursor:pointer">
                        <div @click="dialogFullscreen=!dialogFullscreen"><el-icon><FullScreen /></el-icon></div>
                        <div class="margin-left-10" @click="close"><el-icon><Close /></el-icon></div>
                    </div>
                </div>
            </template>
            <Loading style="margin:0px" :isLoading="loading">
            <div class="scroll-bar-style" style="height:calc(100vh - 250px);">
                <FormList v-model="formModel" ref="formRef" :formConfig="formConfig" >
                    <template #picId>
                        <div @click="handleShowPicListDialog(picListDialogRef)" style="cursor:pointer">
                          <CommonImage v-if="formModel.picUrl" :imgStyle="'height: 100px;width: auto;'" :picList="[formModel.picUrl]" :picUrl="formModel.picUrl" />
                            <div style="border:1px solid #d8dce5;padding:10px;" class="u-f u-f-ac u-f-ajc" v-else>
                                <el-icon  :size="40" class="avatar-uploader-icon"><Plus /></el-icon>
                            </div>
                        </div>
                    </template>
                    <template #artContent>
                        <MdEditor
                                :toolbar="mdEditorToolbarsConfig"
                                v-model="formModel.artContent"
                                @onUploadImg="handleUploadImg"
                                @onHtmlChanged="handleChangeHtml"
                        >
                        </MdEditor>
                    </template>
                </FormList>
            </div>
            </Loading>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" :loading="loading" @click.native.prevent="handleAddSubmit(formRef,emit)">{{$t("btn.add")}}</el-button>
                  <el-button type="primary" @click.native.prevent="handleResetForm(formRef)">{{$t("btn.reset")}}</el-button>
                  <el-button @click.native.prevent="handleCancel">{{$t("btn.cancel")}}</el-button>
              </span>
            </template>
        </el-dialog>
        <!--        添加-->
            <G_PicListDialog ref="picListDialogRef" @handleGetPicId="handleGetPicId" />
    </div>
</template>

<script setup lang="ts">
    import { Plus,Close,FullScreen } from '@element-plus/icons-vue'
    import {formConfig} from "@/views/article/articleList/cpns/artAddDialog/config/formConfig";
    import {mdEditorToolbarsConfig} from "../config/index"
    import Loading from "@/components/loading/index.vue"
    import MdEditor from 'md-editor-v3';
    import 'md-editor-v3/lib/style.css';
    // import sanitizeHtml from 'sanitize-html';// 使用 sanitizeHtml 处理不安全的 html
    import FormList from '@/components/formList'
    import {useFunc} from "@/views/article/articleList/cpns/artAddDialog/hooks/useFunc";
    import {usePic} from "@/components/picListDialog/src/hooks/usePic";
    import {useArtContentUpload} from "@/views/article/articleList/cpns/hooks/useArtContentUpload";
    import {defineAsyncComponent, ref} from "vue";
    import type {propsInterface,exposeInterface} from "@/views/article/articleList/cpns/artAddDialog/types";
    const CommonImage = defineAsyncComponent(()=>import("@/components/commonImage/index.vue"))
    const LoadComponentsAsync = defineAsyncComponent(()=>import("@/components/loadComponentsAsync/index.vue"))
    const G_PicListDialog = defineAsyncComponent(()=>import("@/components/picListDialog/index"))

    let props = withDefaults(defineProps<propsInterface>(),{
        alignCenter:true,
    })

    interface EmitType {
        (e: "handleCloseDialog"): void,
    }
    const emit = defineEmits<EmitType>()

    let {handleOpenDialog,handleResetForm,handleAddSubmit,handleCancel,dialogFullscreen,formRef,picListDialogRef,model,dialogShow,loading,dialogTitle,key,formModel,artContentImgUploadArr} = useFunc()
    let {handleShowPicListDialog,handleGetPicId} = usePic(formModel,["picId","picUrl"])
    let {handleChangeHtml,handleUploadImg} = useArtContentUpload(loading,artContentImgUploadArr)

    defineExpose<exposeInterface>({
        handleResetForm,
        handleOpenDialog
    })
</script>

<style scoped lang="less">

</style>
