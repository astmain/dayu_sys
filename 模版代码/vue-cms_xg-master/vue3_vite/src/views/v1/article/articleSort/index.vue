<!--
*- coding = utf-8 -*-
#@Time : 2022/9/23 8:53
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
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
                @click="handleAdd(artSortAddDialogRef)"
                v-hasPower="['article:articleSort:add']"
            >{{$t("btn.add")}}</el-button>
          </div>
          <div class="margin-right-5">
            <el-button
                :size="settingStore.sysSize"
                :disabled="multiple"
                type="danger"
                @click="handleDelete"
                v-hasPower="['article:articleSort:delMore']"
            >{{$t("btn.mulDel")}}</el-button>
          </div>
        </div>
          <RightToolbar :columns="tableConfig.tableCol" v-model:showSearch="showSearch" @queryTable="handleRefreshTable(handleList)" @updateTableColumns="handleUpdateTableColumns" />
      </div>
    </div>
    <div class="table-style">
        <TableList ref="tableListRef" :tableConfig="tableConfig" :pageConfig="pageConfig" @selection-change="handleTableSelectionChange" @handleCurrentChange="handleCurrentChange" v-on:handleSizeChange="handleSizeChange">
          <template #addTime="row">
            {{handleParseTime(row.row.addTime)}}
          </template>
          <template #operation="row">
            <el-button type="primary" :size="settingStore.sysSize" @click="handleEdit(row.row,artSortEditDialogRef)"
                       v-hasPower="['article:articleSort:edit']"
            >{{$t("btn.edit")}}</el-button>
            <el-button
                :size="settingStore.sysSize"
                type="danger"
                @click="handleDelete(row.row)"
                v-hasPower="['article:articleSort:del']"
            >{{$t("btn.delete")}}</el-button>
          </template>
        </TableList>
    </div>
    <!--        编辑-->
      <G_ArtSortEditDialog ref="artSortEditDialogRef" @handleCloseDialog="handleCloseDialog"  />
    <!--        添加-->
      <G_ArtSortAddDialog ref="artSortAddDialogRef" @handleCloseDialog="handleCloseDialog" />
  </Loading>
</template>

<script setup lang="ts">
import {handleParseTime} from "@/utils/utils"
import {useRightToolBarFunc} from "@/components/rightToolbar/hooks/useRightToolBarFunc";
import FormList from '@/components/formList'
import Loading from "@/components/loading/index.vue"
import {useFunc} from "@/views/article/articleSort/hooks/useFunc";
import {defineAsyncComponent, ref} from "vue";
const RightToolbar = defineAsyncComponent(() => import("@/components/rightToolbar/index.vue"))
const TableList = defineAsyncComponent(()=>import("@/components/tableList"))
const G_ArtSortEditDialog = defineAsyncComponent(()=>import("./cpns/articleSortEditDialog/index.vue"))
const G_ArtSortAddDialog = defineAsyncComponent(()=>import("./cpns/articleSortAddDialog/index.vue"))

let {handleTableSelectionChange,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleCloseDialog,handleDelete,handleEdit,handleAdd,
  tableListRef,artSortEditDialogRef,artSortAddDialogRef,tableConfig,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,loading} = useFunc()
let {handleUpdateTableColumns,handleRefreshTable,showSearch} = useRightToolBarFunc(tableConfig,loading)

</script>

<style scoped lang="less">

</style>

