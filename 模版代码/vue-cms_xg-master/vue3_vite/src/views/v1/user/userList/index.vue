<!--
*- coding = utf-8 -*-
#@Time : 2022/9/23 8:51
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<!--管理员列表-->
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
                @click="handleAdd(userAddDialogRef)"
                v-hasPower="['user:userList:add']"
            >{{$t("btn.add")}}</el-button>
          </div>
          <div class="margin-right-5">
            <el-button
                :size="settingStore.sysSize"
                :disabled="multiple"
                type="danger"
                @click="handleDelete"
                v-hasPower="['user:userList:delMore']"
            >{{$t("btn.mulDel")}}</el-button>
          </div>
        </div>
        <RightToolbar :columns="tableConfig.tableCol" v-model:showSearch="showSearch" @queryTable="handleRefreshTable(handleList)" @updateTableColumns="handleUpdateTableColumns" />
      </div>
    </div>
    <div class="table-style">
        <TableList :tableConfig="tableConfig" :pageConfig="pageConfig" @selection-change="handleTableSelectionChange"
                   @handleCurrentChange="handleCurrentChange" v-on:handleSizeChange="handleSizeChange">
          <template #sex="row">
            <DictTag style="margin-left:0px" :options="dicts.sysSex" :value="row.row.sex" />
          </template>
          <template #status="row">
            <DictTag :options="dicts.sysSwitches" @click.stop="handleChangeStatus(row.row)" style="cursor:pointer;margin-left:0px;" :value="row.row.status" />
          </template>
          <template #operation="row">
            <el-button :size="settingStore.sysSize" type="primary" @click="handleEdit(row.row,userEditDialogRef)"
                       v-hasPower="['user:userList:edit']"
            >{{$t("btn.edit")}}</el-button>
            <el-button
                :size="settingStore.sysSize"
                type="danger"
                @click="handleDelete(row.row)"
                v-hasPower="['user:userList:del']"
            >{{$t("btn.delete")}}</el-button>
          </template>
        </TableList>
    </div>


    <!--        编辑-->
      <G_UserEditDialog ref="userEditDialogRef" @handleCloseDialog="handleCloseDialog"  />
    <!--        添加-->
      <G_UserAddDialog ref="userAddDialogRef" @handleCloseDialog="handleCloseDialog" />
  </Loading>
</template>

<script setup lang="ts">
import {useFunc} from "./hooks/useFunc";
import {useRightToolBarFunc} from "@/components/rightToolbar/hooks/useRightToolBarFunc";
import Loading from "@/components/loading/index.vue"
import FormList from '@/components/formList'
import {defineAsyncComponent, ref} from "vue";
const DictTag = defineAsyncComponent(() => import("@/components/dictTag/index.vue"))
const TableList = defineAsyncComponent(()=>import("@/components/tableList"))
const G_UserAddDialog = defineAsyncComponent(()=>import("@/views/user/userList/cpns/userAddDialog/index.vue"))
const G_UserEditDialog = defineAsyncComponent(()=>import("@/views/user/userList/cpns/userEditDialog/index.vue"))
const RightToolbar = defineAsyncComponent(() => import("@/components/rightToolbar/index.vue"))

let {handleAdd,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleDelete,handleEdit,handleCloseDialog,handleChangeStatus,handleTableSelectionChange,
  tableListRef,userEditDialogRef,userAddDialogRef,dicts,settingStore,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading,multiple,ids} = useFunc()
let {handleUpdateTableColumns,handleRefreshTable,showSearch} = useRightToolBarFunc(tableConfig,loading)
</script>

<style scoped lang="less">

</style>
