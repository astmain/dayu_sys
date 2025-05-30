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
                @click="handleAdd(artAddDialogRef)"
                v-hasPower="['article:articleList:add']"
            >{{$t("btn.add")}}</el-button>
          </div>
          <div class="margin-right-5">
            <el-button
                :size="settingStore.sysSize"
                :disabled="multiple"
                type="danger"
                @click="handleDelete"
                v-hasPower="['article:articleList:delMore']"
            >{{$t("btn.mulDel")}}</el-button>
          </div>
        </div>
          <RightToolbar :columns="tableConfig.tableCol" v-model:showSearch="showSearch" @queryTable="handleRefreshTable(handleList)" @updateTableColumns="handleUpdateTableColumns" />
      </div>
    </div>
    <div class="table-style">
        <TableList ref="tableListRef" :tableConfig="tableConfig" :pageConfig="pageConfig"  @selection-change="handleTableSelectionChange" @handleCurrentChange="handleCurrentChange" v-on:handleSizeChange="handleSizeChange">
          <template #picUrl="row">
            <CommonImage :picUrl="row.row.picUrl" />
          </template>
          <template #status="row">
            <DictTag :options="dicts.sysSwitches" @click.stop="handleChangeStatus(row.row)" style="cursor:pointer;margin-left:0px;" :value="row.row.status" />
          </template>
          <template #addTime="row">
            {{handleParseTime(row.row.addTime)}}
          </template>
          <template #operation="row">
                <el-button type="primary" :size="settingStore.sysSize" @click="handleEdit(row.row,artEditDialogRef)"
                           v-hasPower="['article:articleList:edit']"
                >{{$t("btn.edit")}}</el-button>
                <el-button
                    :size="settingStore.sysSize"
                    type="danger"
                    @click="handleDelete(row.row)"
                    v-hasPower="['article:articleList:del']"
                >{{$t("btn.delete")}}</el-button>
          </template>
        </TableList>

    </div>
    <!--        编辑-->
    <LoadComponentsAsync>
      <G_ArtEditDialog ref="artEditDialogRef" @handleCloseDialog="handleCloseDialog" />
    </LoadComponentsAsync>
    <!--        添加-->
      <G_ArtAddDialog ref="artAddDialogRef" @handleCloseDialog="handleCloseDialog" />
  </Loading>
</template>

<script setup lang="ts">
import Loading from "@/components/loading/index.vue"
import FormList from '@/components/formList'
import {handleParseTime} from "@/utils/utils"
import {useFunc} from "@/views/article/articleList/hooks/useFunc";
import {useRightToolBarFunc} from "@/components/rightToolbar/hooks/useRightToolBarFunc";
import {defineAsyncComponent, ref} from "vue";
const LoadComponentsAsync = defineAsyncComponent(()=>import("@/components/loadComponentsAsync/index.vue"))
const TableList = defineAsyncComponent(()=>import("@/components/tableList"))
const CommonImage = defineAsyncComponent(()=>import("@/components/commonImage/index.vue"))
const G_ArtEditDialog = defineAsyncComponent(()=>import("./cpns/artEditDialog/index.vue"))
const G_ArtAddDialog = defineAsyncComponent(()=>import("./cpns/artAddDialog/index.vue"))
const RightToolbar = defineAsyncComponent(() => import("@/components/rightToolbar/index.vue"))
const DictTag = defineAsyncComponent(() => import("@/components/dictTag/index.vue"))

let {handleTableSelectionChange,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleCloseDialog,handleDelete,handleEdit,handleAdd,handleChangeStatus,
  tableListRef,artEditDialogRef,artAddDialogRef,dicts,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading} = useFunc()
let {handleUpdateTableColumns,handleRefreshTable,showSearch} = useRightToolBarFunc(tableConfig,loading)
</script>

<style scoped lang="less">

</style>
