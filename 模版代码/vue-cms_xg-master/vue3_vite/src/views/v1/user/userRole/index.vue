<!--
*- coding = utf-8 -*-
#@Time : 2022/9/23 8:51
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<!--管理员角色列表-->
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
                  @click="handleAdd(roleAddDialogRef)"
                  v-hasPower="['user:userRole:add']"
              >{{$t("btn.add")}}</el-button>
            </div>
            <div class="margin-right-5">
              <el-button
                  :size="settingStore.sysSize"
                  :disabled="multiple"
                  type="danger"
                  @click="handleDelete"
                  v-hasPower="['user:userRole:delMore']"
              >{{$t("btn.mulDel")}}</el-button>
            </div>
          </div>
          <RightToolbar :columns="tableConfig.tableCol" v-model:showSearch="showSearch" @queryTable="handleRefreshTable(handleList)" @updateTableColumns="handleUpdateTableColumns" />
        </div>
    </div>
    <div class="table-style">
        <TableList :tableConfig="tableConfig" :pageConfig="pageConfig" @selection-change="handleTableSelectionChange"
                   @handleCurrentChange="handleCurrentChange" v-on:handleSizeChange="handleSizeChange">
          <template #status="row">
            <DictTag :options="dicts.sysSwitches"  @click.stop="handleChangeStatus(row.row)" style="margin-left:0px;cursor:pointer" :value="row.row.status" />
          </template>
          <template #operation="row">
            <el-button type="primary" :size="settingStore.sysSize" @click="handleEdit(row.row,roleEditDialogRef)"
                       v-hasPower="['user:userRole:edit']"
            >{{$t("btn.edit")}}</el-button>
            <el-button
                :size="settingStore.sysSize"
                type="danger"
                @click="handleDelete(row.row)"
                v-hasPower="['user:userRole:del']"
            >{{$t("btn.delete")}}</el-button>
          </template>
        </TableList>
    </div>

    <!--        编辑-->
      <G_RoleEditDialog ref="roleEditDialogRef" @handleCloseDialog="handleCloseDialog" />
    <!--        添加-->
      <G_RoleAddDialog ref="roleAddDialogRef" @handleCloseDialog="handleCloseDialog" />

  </Loading>
</template>

<script setup lang="ts">
import Loading from "@/components/loading/index.vue"
import FormList from '@/components/formList'
import {useFunc} from "./hooks/useFunc";
import {useRightToolBarFunc} from "@/components/rightToolbar/hooks/useRightToolBarFunc";
import {defineAsyncComponent, ref} from "vue";
const LoadComponentsAsync = defineAsyncComponent(()=>import("@/components/loadComponentsAsync/index.vue"))
const TableList = defineAsyncComponent(()=>import("@/components/tableList"))
const G_RoleEditDialog = defineAsyncComponent(()=>import("./cpns/userRoleEditDialog/index.vue"))
const G_RoleAddDialog = defineAsyncComponent(()=>import("./cpns/userRoleAddDialog/index.vue"))
const RightToolbar = defineAsyncComponent(() => import("@/components/rightToolbar/index.vue"))
const DictTag = defineAsyncComponent(() => import("@/components/dictTag/index.vue"))

let {handleAdd,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleDelete,handleEdit,handleCloseDialog,handleTableSelectionChange,handleChangeStatus,
    roleEditDialogRef,roleAddDialogRef,dicts,settingStore,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading,multiple} = useFunc()
let {handleUpdateTableColumns,handleRefreshTable,showSearch} = useRightToolBarFunc(tableConfig,loading)
</script>

<style scoped lang="less">

</style>

