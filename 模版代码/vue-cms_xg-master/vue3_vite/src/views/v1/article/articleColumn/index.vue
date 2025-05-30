<!--
*- coding = utf-8 -*-
#@Time : 2022/9/23 8:53
#@Author : CSDN 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<!--前端 后端 后端java栏目-->
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
                @click.stop="handleAdd(artColumnAddDialogRef)"
                    v-hasPower="['article:articleColumn:add']"
            >{{$t("btn.add")}}</el-button>
          </div>
          <div class="margin-right-5">
            <el-button
                    :size="settingStore.sysSize"
                :disabled="multiple"
                type="danger"
                @click.stop="handleDelete"
                    v-hasPower="['article:articleColumn:delMore']"
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
          <template #block_comment="row">
            <template v-if="row.row.block_comment">
              <el-tag class="ml-2" type="success">禁用</el-tag>
            </template>
            <template v-else>
              <el-tag class="ml-2" type="info">未禁用</el-tag>
            </template>
          </template>
          <template #operation="row">
            <el-button type="primary" :size="settingStore.sysSize" @click.stop="handleEdit(row.row,artColumnEditDialogRef)"
                       v-hasPower="['article:articleColumn:edit']"
            >{{$t("btn.edit")}}</el-button>
            <el-button
                :size="settingStore.sysSize"
                type="danger"
                @click.stop="handleDelete(row.row)"
                v-hasPower="['article:articleColumn:del']"
            >{{$t("btn.delete")}}</el-button>
          </template>
        </TableList>
    </div>
    <!--        编辑-->
      <G_ArticleColumnEditDialog ref="artColumnEditDialogRef" @handleCloseDialog="handleCloseDialog"/>
    <!--        添加-->
      <G_ArticleColumnAddDialog ref="artColumnAddDialogRef" @handleCloseDialog="handleCloseDialog" />
  </Loading>
</template>

<script setup lang="ts">
import {handleParseTime} from "@/utils/utils"
import {useRightToolBarFunc} from "@/components/rightToolbar/hooks/useRightToolBarFunc";
import {useFunc} from "@/views/article/articleColumn/hooks/useFunc";
import FormList from '@/components/formList'
import Loading from "@/components/loading/index.vue"
import {defineAsyncComponent, ref} from "vue";
const TableList = defineAsyncComponent(()=>import("@/components/tableList"))
const G_ArticleColumnEditDialog = defineAsyncComponent(()=>import("./cpns/articleColumnEditDialog/index.vue"))
const G_ArticleColumnAddDialog = defineAsyncComponent(()=>import("./cpns/articleColumnAddDialog/index.vue"))
const RightToolbar = defineAsyncComponent(() => import("@/components/rightToolbar/index.vue"))

let {handleTableSelectionChange,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleCloseDialog,handleDelete,handleEdit,handleAdd,
  tableListRef,artColumnEditDialogRef,artColumnAddDialogRef,tableConfig,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,loading} = useFunc()
let {handleUpdateTableColumns,handleRefreshTable,showSearch} = useRightToolBarFunc(tableConfig,loading)


</script>

<style scoped lang="less">

</style>

