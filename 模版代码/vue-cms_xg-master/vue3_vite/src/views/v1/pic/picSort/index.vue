<!--
*- coding = utf-8 -*-
#@Time : 2023-02-07 23:49
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
                @click="handleAdd(picSortAddDialogRef)"
                v-hasPower="['pic:picSort:add']"
            >{{$t("btn.add")}}</el-button>
          </div>
        </div>
        <RightToolbar :columns="tableConfig.tableCol" v-model:showSearch="showSearch" @queryTable="handleRefreshTable(handleList)" @updateTableColumns="handleUpdateTableColumns" />
      </div>
    </div>
    <div class="table-style">
        <TableList ref="tableListRef" :tableConfig="tableConfig" :pageConfig="pageConfig"  @selection-change="handleTableSelectionChange" @handleCurrentChange="handleCurrentChange" v-on:handleSizeChange="handleSizeChange">
          <template #addTime="row">
            <span>{{handleParseTime(row.row.addTime)}}</span>
          </template>
          <template #picNum="row">
<!--            <router-link :to="'/pic/picList-index/' + row.row.id" class="link-types">-->
<!--              {{row.row.picNum??0}}-->
<!--            </router-link>-->
            <template v-if="appStore.device=='mobile'?true:false">
              <el-button
                  @click="handleToImgListBySortId(row.row.id)"
                  link
                  v-hasPower="['pic:picSort:edit']">{{row.row.picNum??0}}&nbsp;<el-icon><ArrowRight :style="'color:'+settingStore.themeColor.primary" /></el-icon></el-button>
            </template>
            <template v-else>
              <div>
                <el-button
                    @click="handleToImgListBySortId(row.row.id)"
                    link
                    type="primary"
                    :size="settingStore.sysSize"
                    v-hasPower="['pic:picSort:edit']"><span style="color:#666666">{{row.row.picNum??0}}</span>&nbsp;&nbsp;查看</el-button>
              </div>
            </template>
          </template>
          <template #operation="row">
            <el-button :disabled="row.row.sortName=='默认'" :size="settingStore.sysSize" @click="handleEdit(row.row,picSortEditDialogRef)"
                       v-hasPower="['pic:picSort:edit']"
            >{{$t("btn.edit")}}</el-button>
            <el-button
                :disabled="row.row.sortName=='默认'"
                :size="settingStore.sysSize"
                type="danger"
                @click="handleDelete(row.row)"
                v-hasPower="['pic:picSort:del']"
            >{{$t("btn.delete")}}</el-button>
          </template>
        </TableList>
    </div>

    <!--        编辑-->
      <G_PicSortEditDialog ref="picSortEditDialogRef" @handleCloseDialog="handleCloseDialog"  />
    <!--        添加-->
      <G_PicSortAddDialog ref="picSortAddDialogRef" @handleCloseDialog="handleCloseDialog" />

    <!--        添加-->
      <G_PicListDialog ref="picListDialogRef" />
  </Loading>
</template>

<script setup lang="ts">
import {ArrowRight} from '@element-plus/icons-vue'
import {useRightToolBarFunc} from "@/components/rightToolbar/hooks/useRightToolBarFunc";
import {useFunc} from "@/views/pic/picSort/hooks/useFunc";
import {handleParseTime} from "@/utils/utils"
import TableList from "@/components/tableList";
import FormList from '@/components/formList'
import Loading from "@/components/loading/index.vue"
import {defineAsyncComponent, ref} from "vue";
const RightToolbar = defineAsyncComponent(() => import("@/components/rightToolbar/index.vue"))
const G_PicSortEditDialog = defineAsyncComponent(()=>import("./cpns/picSortEditDialog/index.vue"))
const G_PicSortAddDialog = defineAsyncComponent(()=>import("./cpns/picSortAddDialog/index.vue"))
const G_PicListDialog = defineAsyncComponent(()=>import("@/components/picListDialog"))

let {handleToImgListBySortId,handleTableSelectionChange,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleCloseDialog,handleDelete,handleEdit,handleAdd,
  appStore,tableListRef,picSortEditDialogRef,picSortAddDialogRef,picListDialogRef,tableConfig,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,loading} = useFunc()
let {handleUpdateTableColumns,handleRefreshTable,showSearch} = useRightToolBarFunc(tableConfig,loading)
</script>

<style scoped lang="less">

</style>
