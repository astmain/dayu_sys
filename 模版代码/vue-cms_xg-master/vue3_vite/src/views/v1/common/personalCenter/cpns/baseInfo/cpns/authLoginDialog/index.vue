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
        <el-dialog class="dialog-style" :align-center="props.alignCenter" :key="key" v-model="dialogShow" :title="dialogTitle">
            <div>
                <div class="u-f u-f-ajs" style="cursor:pointer" @click="handleClickToAuth('qq')">
                    <div class="u-f">
                        <div class="u-f margin-right-10 margin-left-5">
                            <div class="u-f u-f-ac u-f-ajc margin-right-10" style="cursor:pointer">
                                <SvgIcon :size="'20px'" style="color:#79bbff" :iconClass="'qq'" />
                            </div>
                            <div class="u-f u-f-ac" style="width:50px" >QQ</div>
                        </div>
                        <div class="authName-style" style="color:rgb(204, 204, 204)">{{userInfo?.qqNickname}}</div>
                    </div>
                    <div class="authOption-style" style="justify-content:flex-end">
                        <span style="color:rgb(21, 125, 207)" v-if="!userInfo?.isQQAuth">绑定</span>
                        <span style="color:red" v-else>解绑</span>
                    </div>
                </div>
                <div style="width:100%;height:1px;background:rgb(224, 224, 224)" class="margin-top-10 margin-bottom-10"></div>
                <div class="u-f u-f-ajs" style="cursor:pointer" @click="handleClickToAuth('gitee')">
                    <div class="u-f">
                        <div class="u-f margin-right-10 margin-left-5">
                            <div class="u-f u-f-ac u-f-ajc margin-right-10" style="cursor:pointer">
                                <SvgIcon :size="'20px'" style="color:#79bbff" :iconClass="'gitee'" />
                            </div>
                            <div class="u-f u-f-ac" style="width:50px" >Gitee</div>
                        </div>
                        <div class="authName-style" style="color:rgb(204, 204, 204)">{{userInfo?.giteeNickname }}</div>
                    </div>
                    <div class="authOption-style" style="justify-content:flex-end">
                        <span style="color:rgb(21, 125, 207)" v-if="!userInfo?.isGiteeAuth">绑定</span>
                        <span style="color:red" v-else>解绑</span>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import FormList from '@/components/formList'
    import {useFunc} from "./hooks/useFunc";
    import type {exposeInterface} from "@/views/common/personalCenter/cpns/baseInfo/cpns/authLoginDialog/types";

    interface propsInterface{
        alignCenter?:boolean//弹出框是否垂直居中
    }
    let props = withDefaults(defineProps<propsInterface>(),{
        alignCenter:true,
    })

    interface EmitType {
        (e: "handleCloseDialog"): void,
    }
    const emit = defineEmits<EmitType>()

    let {handleOpenDialog,handleCancel,handleClickToAuth,dialogShow,loading,key,dialogTitle,userInfo} = useFunc()

    defineExpose<exposeInterface>({
        handleOpenDialog
    })
</script>

<style scoped lang="less">

</style>