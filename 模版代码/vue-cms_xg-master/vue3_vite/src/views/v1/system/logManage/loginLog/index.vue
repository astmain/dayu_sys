<!--
*- coding = utf-8 -*-
#@Time : 2022/12/29 9:41
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <Loading :isLoading="loading">
    <div class="top-style">
      <div class="form-style" v-if="showSearch">
        <FormList v-model="formSearchModel" ref="formRef" :formConfig="formConfig" @submit="handleSearch" @reset="handleReset" @change="handleFormChange"/>
      </div>
      <div class="other-option u-f u-f-ajs u-f-spa">
        <div class="u-f margin-bottom-10">
          <div class="margin-right-5">
            <el-button
                :size="settingStore.sysSize"
                type="primary"
                plain
                @click="handleClean"
                v-hasPower="['system:logManage:loginLog:clean']"
            >{{$t("btn.empty")}}</el-button>
          </div>
          <div class="margin-right-5">
            <el-button type="warning" plain :icon="Download" :size="settingStore.sysSize" @click="handleExport"
                       v-hasPower="['system:logManage:loginLog:download']">{{$t("btn.leadingOut")}}</el-button>
          </div>
        </div>
        <RightToolbar :columns="tableConfig.tableCol" v-model:showSearch="showSearch" @queryTable="handleRefreshTable(handleList)" @updateTableColumns="handleUpdateTableColumns" />
      </div>
    </div>
    <div class="table-style">
        <TableList ref="tableListRef" :tableConfig="tableConfig" :pageConfig="pageConfig"
                   @selection-change="handleTableSelectionChange"
                   @handleCurrentChange="handleCurrentChange" v-on:handleSizeChange="handleSizeChange">
          <template #isPcOrIphone="row">
            <span>{{row.row.isPcOrIphone?(row.row.isPcOrIphone==1?"PC端":"无线端"):"未知"}}</span>
          </template>
          <template #status="row">
            <DictTag style="margin-left:0px" :options="dicts.sysCommonStatus" :value="row.row.status" />
          </template>
          <template #addTime="row">
            <span>{{handleParseTime(row.row.addTime)}}</span>
          </template>
        </TableList>
    </div>
  </Loading>
</template>

<script setup lang="ts">
import {
  Download
} from '@element-plus/icons-vue'
import {handleParseTime} from "@/utils/utils"
import FormList from '@/components/formList'
import Loading from "@/components/loading/index.vue"
import {useRightToolBarFunc} from "@/components/rightToolbar/hooks/useRightToolBarFunc";
import {useFunc} from "./hooks/useFunc";
import {defineAsyncComponent, ref} from "vue";
const TableList = defineAsyncComponent(() => import("@/components/tableList"))
const DictTag = defineAsyncComponent(() => import("@/components/dictTag/index.vue"))
const RightToolbar = defineAsyncComponent(() => import("@/components/rightToolbar/index.vue"))



let {handleTableSelectionChange,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleFormChange,handleExport,handleClean,
  formRef,tableListRef,dicts,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading} = useFunc()
let {handleUpdateTableColumns,handleRefreshTable,showSearch} = useRightToolBarFunc(tableConfig,loading)
</script>

<style scoped lang="less">

</style>
