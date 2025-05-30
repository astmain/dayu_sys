<!--
*- coding = utf-8 -*-
#@Time : 2023/5/7 11:17
#@Author : 沉默小管
#@File : index.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<!--通知公告-->
<template>
    <Loading :isLoading="loading">
        <div class="top-style">
            <div class="form-style" v-if="showSearch">
                <FormList v-model="formSearchModel" ref="formRef" :formConfig="formConfig" @submit="handleSearch" @reset="handleReset"/>
            </div>
            <div class="other-option u-f u-f-ajs u-f-spa">
                <div class="u-f margin-bottom-10">
                    <div class="margin-right-5">
                        <el-button
                                :size="settingStore.sysSize"
                                type="primary"
                                @click="handleAdd(noticeAddDialogRef)"
                                v-hasPower="['system:msgManage:notice:add']"
                        >{{$t("btn.add")}}</el-button>
                    </div>
                    <div class="margin-right-5">
                        <el-button
                                :size="settingStore.sysSize"
                                :disabled="multiple"
                                type="danger"
                                @click="handleDelete"
                                v-hasPower="['system:msgManage:notice:delMore']"
                        >{{$t("btn.mulDel")}}</el-button>
                    </div>
                    <div class="margin-right-5">
                        <el-button
                                :size="settingStore.sysSize"
                                type="primary"
                                @click="handleShowNoticeDialog(noticeSendMsgDialogRef)"
                                v-hasPower="['system:msgManage:notice:sendNotice']"
                        >发送通知</el-button>
                    </div>
                </div>
                <RightToolbar :columns="tableConfig.tableCol" v-model:showSearch="showSearch" @queryTable="handleRefreshTable(handleList)" @updateTableColumns="handleUpdateTableColumns" />
            </div>
        </div>
        <div class="table-style">
                <TableList :tableConfig="tableConfig" :pageConfig="pageConfig" @selection-change="handleTableSelectionChange"
                           @handleCurrentChange="handleCurrentChange" v-on:handleSizeChange="handleSizeChange">
                    <template #noticeType="row">
                        <DictTag :options="dicts.sysNoticeType" style="cursor:pointer;margin-left:0px;" :value="row.row.noticeType" />
                    </template>
                    <template #status="row">
                        <DictTag :options="dicts.sysNoticeStatus" style="cursor:pointer;margin-left:0px;" :value="row.row.status" />
                    </template>
                    <template #content="row">
                        <div class="text-l">{{row.row.content}}</div>
                    </template>
                    <template #addTime="row">
                        {{handleParseTime(row.row.addTime)}}
                    </template>
                    <template #operation="row">
                        <el-button :size="settingStore.sysSize" type="primary" @click="handleEdit(row.row,noticeEditDialogRef)"
                                   v-hasPower="['system:msgManage:notice:edit']"
                        >{{$t("btn.edit")}}</el-button>
                        <el-button
                                :size="settingStore.sysSize"
                                type="danger"
                                @click="handleDelete(row.row)"
                                v-hasPower="['system:msgManage:notice:del']"
                        >{{$t("btn.delete")}}</el-button>
                    </template>
                </TableList>
        </div>

        <!--        编辑-->
            <G_NoticeEditDialog ref="noticeEditDialogRef" @handleCloseDialog="handleCloseDialog"  />
        <!--        添加-->
            <G_NoticeAddDialog ref="noticeAddDialogRef" @handleCloseDialog="handleCloseDialog" />
        <!--        发送通知-->
            <G_NoticeSendMsgDialog ref="noticeSendMsgDialogRef" @handleCloseDialog="handleCloseDialog" />
  </Loading>
</template>

<script setup lang="ts">
import FormList from '@/components/formList'
import Loading from "@/components/loading/index.vue"
const TableList = defineAsyncComponent(()=>import("@/components/tableList"))
const DictTag = defineAsyncComponent(() => import("@/components/dictTag/index.vue"))
const G_NoticeAddDialog = defineAsyncComponent(()=>import("@/views/system/msgManage/notice/cpns/noticeAddDialog/index.vue"))
const G_NoticeEditDialog = defineAsyncComponent(()=>import("@/views/system/msgManage/notice/cpns/noticeEditDialog/index.vue"))
const G_NoticeSendMsgDialog = defineAsyncComponent(()=>import("@/views/system/msgManage/notice/cpns/noticeSendMsgDialog/index.vue"))
const RightToolbar = defineAsyncComponent(() => import("@/components/rightToolbar/index.vue"))
import {handleParseTime} from "@/utils/utils"
import {defineAsyncComponent, ref} from "vue";
import {useFunc} from "./hooks/useFunc";
import {useRightToolBarFunc} from "@/components/rightToolbar/hooks/useRightToolBarFunc";


let {handleAdd,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleDelete,handleEdit,handleCloseDialog,handleTableSelectionChange,handleShowNoticeDialog,
  tableListRef,noticeEditDialogRef,noticeAddDialogRef,noticeSendMsgDialogRef,dicts,settingStore,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading,multiple,ids} = useFunc()
let {handleUpdateTableColumns,handleRefreshTable,showSearch} = useRightToolBarFunc(tableConfig,loading)
</script>

<style scoped lang="less">

</style>
