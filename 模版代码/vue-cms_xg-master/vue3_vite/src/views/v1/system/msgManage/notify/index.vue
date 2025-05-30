<!--
*- coding = utf-8 -*-
#@Time : 2023/5/7 11:17
#@Author : 沉默小管
#@File : index.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<!--消息通知 显示所有发送消息-->
<template>
    <Loading :isLoading="loading">
        <div class="top-style">
            <div class="form-style" v-if="showSearch">
                <FormList v-model="formSearchModel" ref="formRef" :formConfig="formConfig" @submit="handleSearch" @reset="handleReset"/>
            </div>
            <div class="other-option u-f u-f-ajs u-f-spa margin-bottom-10">
                <div class="u-f margin-bottom-10">

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
                        <DictTag :options="dicts.sysNotifyStatus" style="cursor:pointer;margin-left:0px;" :value="row.row.status" />
                    </template>
                    <template #content="row">
                        <div class="text-l">{{row.row.content}}</div>
                    </template>
                    <template #addTime="row">
                        {{handleParseTime(row.row.addTime)}}
                    </template>
                </TableList>
        </div>
    </Loading>
</template>

<script setup lang="ts">
    import FormList from '@/components/formList'
    import Loading from "@/components/loading/index.vue"
    const TableList = defineAsyncComponent(()=>import("@/components/tableList"))
    const DictTag = defineAsyncComponent(() => import("@/components/dictTag/index.vue"))
    const RightToolbar = defineAsyncComponent(() => import("@/components/rightToolbar/index.vue"))
    import {handleParseTime} from "@/utils/utils"
    import {defineAsyncComponent, onMounted, reactive, ref} from "vue";
    import {useFunc} from "./hooks/useFunc";
    import {useRightToolBarFunc} from "@/components/rightToolbar/hooks/useRightToolBarFunc";

    let {handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleTableSelectionChange,
      tableListRef,dicts,settingStore,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading,multiple,ids} = useFunc()
    let {handleUpdateTableColumns,handleRefreshTable,showSearch} = useRightToolBarFunc(tableConfig,loading)
</script>

<style scoped lang="less">

</style>
