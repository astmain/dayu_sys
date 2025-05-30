<!--
*- coding = utf-8 -*-
#@Time : 2022/9/23 8:51
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<!--在线用户列表-->
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
        <TableList :tableConfig="tableConfig" :pageConfig="pageConfig"
                   @handleCurrentChange="handleCurrentChange" v-on:handleSizeChange="handleSizeChange">
          <template #sex="row">
            <DictTag style="margin-left:0px" :options="dicts.sysSex" :value="row.row.sex" />
          </template>
          <template #isOnline="row">
            <DictTag :options="dicts.sysUserLoginStatus" style="cursor:pointer;margin-left:0px;" :value="row.row.isOnline" />
          </template>
          <template #loginTime="row">
              <span>{{handleParseTime(row.row.loginTime)}}</span>
          </template>
          <template #operation="row">
            <el-button
                :size="settingStore.sysSize"
                type="danger"
                @click.stop="handleChangeStatusExit(row.row)"
                v-hasPower="['systemMonitor:onlineUser:exit']"
            >强退</el-button>
          </template>
        </TableList>
    </div>

  </Loading>
</template>

<script setup lang="ts">
import {handleParseTime} from "@/utils/utils"
import {useFunc} from "./hooks/useFunc";
import {useRightToolBarFunc} from "@/components/rightToolbar/hooks/useRightToolBarFunc";
import Loading from "@/components/loading/index.vue"
import FormList from '@/components/formList'
import {defineAsyncComponent, ref} from "vue";
const DictTag = defineAsyncComponent(() => import("@/components/dictTag/index.vue"))
const TableList = defineAsyncComponent(()=>import("@/components/tableList"))
const RightToolbar = defineAsyncComponent(() => import("@/components/rightToolbar/index.vue"))

let {handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleChangeStatusExit,
  tableListRef,dicts,settingStore,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading} = useFunc()
let {handleUpdateTableColumns,handleRefreshTable,showSearch} = useRightToolBarFunc(tableConfig,loading)
</script>

<style scoped lang="less">

</style>
