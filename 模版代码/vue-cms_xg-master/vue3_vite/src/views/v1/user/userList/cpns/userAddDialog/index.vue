<!--
*- coding = utf-8 -*-
#@Time : 2022/10/16 14:39
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
    <div>
        <el-dialog class="dialog-style" :align-center="props.alignCenter" :key="key" v-model="dialogShow" :title="dialogTitle">
            <FormList v-model="formModel" ref="formRef" :formConfig="formConfig" >
              <template #headImg>
                <div @click="handleShowPicListDialog(picListDialogRef)" style="cursor:pointer">
                  <CommonImage v-if="formModel.headImg" :imgStyle="'height: 100px;width: auto;'" :picList="[formModel.headImg]" :picUrl="formModel.headImg" />
                  <div style="border:1px solid #d8dce5;padding:10px;" class="u-f u-f-ac u-f-ajc" v-else>
                    <el-icon  :size="40" class="avatar-uploader-icon"><Plus /></el-icon>
                  </div>
                </div>
              </template>
                <template #roleId="row">
                    <el-select v-bind="row.row.otherOptions" v-model="formModel.roleId" placeholder="请选择角色" clearable>
                        <el-option v-for="item in roleOptions" :key="item.id" :label="item.roleName" :value="item.id"
                                   :disabled="item.status != 1"></el-option>
                    </el-select>
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
      <!--        添加-->
        <G_PicListDialog ref="picListDialogRef" @handleGetPicId="handleGetPicId" />
    </div>
</template>

<script setup lang="ts">
    import { Plus } from '@element-plus/icons-vue'
    import {formConfig} from "./config/formConfig";
    import FormList from '@/components/formList'
    import {useFunc} from "./hooks/useFunc";
    import {usePic} from "@/components/picListDialog/src/hooks/usePic";
    import {defineAsyncComponent, ref} from "vue";
    import type {propsInterface,exposeInterface} from "@/views/user/userList/cpns/userAddDialog/types";
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

    let {handleOpenDialog,handleResetForm,handleAddSubmit,handleCancel,picListDialogRef,formRef,model,dialogShow,loading,dialogTitle,key,formModel,roleOptions} = useFunc()
    let {handleShowPicListDialog,handleGetPicId} = usePic(formModel,["headImgId","headImg"])

    defineExpose<exposeInterface>({
        handleResetForm,
        handleOpenDialog
    })
</script>

<style scoped lang="less">

</style>
