<!--
*- coding = utf-8 -*-
#@Time : 2023/4/14 9:18
#@Author : CSDN 沉默小管
#@File : index.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
    <Loading :isLoading="loading">
        <FormList v-model="formModel" ref="formRef" :formConfig="formConfig">
            <template #authLogin>
                <div class="u-f">
                    <div>
                        {{userStore.userInfo.qqNickname}}&nbsp;&nbsp;
                        {{userStore.userInfo.giteeNickname}}
                    </div>
                    <el-button size="small" @click="handleBindOrUnbind" type="primary">绑定/解绑</el-button>
                </div>
            </template>
            <template #headImg>
                <div @click="handleShowPicListDialog(picListDialogRef,formModel.headImgId)" style="cursor:pointer">
                    <CommonImage v-if="formModel.headImg" :imgStyle="'max-height: 100px;width: auto;'" :picUrl="formModel.headImg" />
                    <div style="border:1px solid #d8dce5;padding:10px;" class="u-f u-f-ac u-f-ajc" v-else>
                        <el-icon  :size="40" class="avatar-uploader-icon"><Plus /></el-icon>
                    </div>
                </div>
            </template>
            <template #roleId>
                <el-select v-model="formModel.roleId" placeholder="请选择角色" clearable>
                    <el-option v-for="item in roleOptions" :key="item.id" :label="item.roleName" :value="item.id"
                               :disabled="true"></el-option>
                </el-select>
            </template>
            <template #formCustomBtn>
                <el-button type="primary" :loading="loading" @click.native.prevent="handleSubmit(formRef)" v-hasPower="['user:userList:edit']">{{$t("btn.update")}}</el-button>
                <el-button type="primary" @click.native.prevent="handleResetForm(formRef)" v-hasPower="['user:userList:edit']">{{$t("btn.reset")}}</el-button>
            </template>
        </FormList>

        <!--        添加-->
        <G_PicListDialog ref="picListDialogRef" @handleGetPicId="handleGetPicId" />
        <G_AuthLoginDialog ref="authLoginDialogRef" />
    </Loading>
</template>

<script setup lang="ts">
    import { Plus } from '@element-plus/icons-vue'
    import FormList from '@/components/formList'
    import {formConfig} from "./config/formConfig"
    import {useFunc} from "@/views/common/personalCenter/cpns/baseInfo/hooks/useFunc";
    import {usePic} from "@/components/picListDialog/src/hooks/usePic";
    import Loading from "@/components/loading/index.vue"
    import {defineAsyncComponent, ref} from "vue";
    const LoadComponentsAsync = defineAsyncComponent(()=>import("@/components/loadComponentsAsync/index.vue"))
    const CommonImage = defineAsyncComponent(()=>import("@/components/commonImage/index.vue"))
    const G_PicListDialog = defineAsyncComponent(()=>import("@/components/picListDialog/index"))
    const G_AuthLoginDialog = defineAsyncComponent(()=>import("@/views/common/personalCenter/cpns/baseInfo/cpns/authLoginDialog/index"))


    let {loading,formModel,handleSubmit,handleResetForm,roleOptions,formRef,picListDialogRef,authLoginDialogRef,handleBindOrUnbind,userStore} = useFunc()
    let {handleShowPicListDialog,handleGetPicId} = usePic(formModel,["headImgId","headImg"])
</script>

<style scoped lang="less">

</style>
