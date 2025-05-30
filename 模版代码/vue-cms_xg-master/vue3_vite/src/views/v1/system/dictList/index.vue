<!--
*- coding = utf-8 -*-
#@Time : 2022-11-29 12:48
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<!--字典列表-->
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
                @click="handleAdd(dictAddDialogRef)"
                v-hasPower="['system:dictList:add']"
            >{{$t("btn.add")}}</el-button>
          </div>
          <div class="margin-right-5">
            <el-button
                :size="settingStore.sysSize"
                :disabled="multiple"
                type="danger"
                @click="handleDelete"
                v-hasPower="['system:dictList:delMore']"
            >{{$t("btn.mulDel")}}</el-button>
          </div>
        </div>
        <RightToolbar :columns="tableConfig.tableCol" v-model:showSearch="showSearch" @queryTable="handleRefreshTable(handleList)" @updateTableColumns="handleUpdateTableColumns" />
      </div>
    </div>
    <div class="table-style">
        <TableList ref="tableListRef" :tableConfig="tableConfig" :pageConfig="pageConfig" @selection-change="handleTableSelectionChange">
          <template #status="row">
            <DictTag style="margin-left:0px" :options="dicts.sysSwitches" :value="row.row.status" />
          </template>
          <template #dictType="row">
            <router-link :to="'/system/dictList-data/' + row.row.id" class="link-type">
              <span>{{ row.row.dictType }}</span>
            </router-link>
          </template>
          <template #operation="row">
            <div class="u-f">
              <el-button :size="settingStore.sysSize" type="primary" @click="handleEdit(row.row,dictEditDialogRef)"
                         v-hasPower="['system:dictList:edit']"
              >{{$t("btn.edit")}}</el-button>
              <el-button :size="settingStore.sysSize" type="danger" @click="handleDelete(row.row)"
                         v-hasPower="['system:dictList:del']"
              >{{$t("btn.delete")}}</el-button>
            </div>
          </template>
        </TableList>
      <!--        编辑-->
        <G_DictEditDialog ref="dictEditDialogRef" @handleCloseDialog="handleCloseDialog"  />
      <!--        添加-->
        <G_DictAddDialog ref="dictAddDialogRef" @handleCloseDialog="handleCloseDialog" />
    </div>
  </Loading>
</template>

<script setup lang="ts">
import FormList from '@/components/formList'
import Loading from "@/components/loading/index.vue"
import {useRightToolBarFunc} from "@/components/rightToolbar/hooks/useRightToolBarFunc";
import {useFunc} from "@/views/system/dictList/hooks/useFunc";
import {defineAsyncComponent, ref} from "vue";
const DictTag = defineAsyncComponent(() => import("@/components/dictTag/index.vue"))
const G_DictAddDialog = defineAsyncComponent(()=>import("@/views/system/dictList/cpns/dictAddDialog/index.vue"))
const G_DictEditDialog = defineAsyncComponent(()=>import("@/views/system/dictList/cpns/dictEditDialog/index.vue"))
const TableList = defineAsyncComponent(()=>import("@/components/tableList"))
const RightToolbar = defineAsyncComponent(() => import("@/components/rightToolbar/index.vue"))


let {handleTableSelectionChange,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleCloseDialog,handleDelete,handleEdit,handleAdd,
  formRef,tableListRef,dictEditDialogRef,dictAddDialogRef,dicts,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading} = useFunc()
let {handleUpdateTableColumns,handleRefreshTable,showSearch} = useRightToolBarFunc(tableConfig,loading)
</script>

<style scoped lang="less">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
