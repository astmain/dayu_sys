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
            <el-button type="danger" plain :icon="Delete" :size="settingStore.sysSize" :disabled="multiple" @click="handleDelete"
                       v-hasPower="['system:logManage:operationLog:del']">{{$t("btn.delete")}}</el-button>
          </div>
          <div class="margin-right-5">
            <el-button
                :size="settingStore.sysSize"
                type="primary"
                plain
                @click="handleClean"
                v-hasPower="['system:logManage:operationLog:clean']"
            >{{$t("btn.empty")}}</el-button>
          </div>
          <div class="margin-right-5">
            <el-button type="warning" plain :icon="Download" :size="settingStore.sysSize" @click="handleExport"
                       v-hasPower="['system:logManage:operationLog:leadingOut']">{{$t("btn.leadingOut")}}</el-button>
          </div>
        </div>
        <RightToolbar :columns="tableConfig.tableCol" v-model:showSearch="showSearch" @queryTable="handleRefreshTable(handleList)" @updateTableColumns="handleUpdateTableColumns" />
      </div>
    </div>
    <div class="table-style">
        <TableList ref="tableListRef" :tableConfig="tableConfig" :pageConfig="pageConfig"
                   @selection-change="handleTableSelectionChange"
                   @handleCurrentChange="handleCurrentChange" v-on:handleSizeChange="handleSizeChange">
          <template #expandSlot="row">
            <div style="padding:10px">
              <el-descriptions
                  :size="settingStore.sysSize"
                  border
              >
                <el-descriptions-item label-class-name="descriptions-item-style">
                  <template #label >
                    <div class="cell-item">
                      账号
                    </div>
                  </template>
                  {{ row.props.row.operName }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="descriptions-item-style">
                  <template #label>
                    <div class="cell-item">
                      IP
                    </div>
                  </template>
                  {{ row.props.row.requestIp }}
                </el-descriptions-item>
                <el-descriptions-item label-class-name="descriptions-item-style">
                  <template #label>
                    <div class="cell-item">
                      操作时间
                    </div>
                  </template>
                  {{handleParseTime(row.props.row.addTime) }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      浏览器
                    </div>
                  </template>
                  {{ row.props.row.browser }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      操作系统
                    </div>
                  </template>
                  {{ row.props.row.operationSystem }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      请求方法
                    </div>
                  </template>
                  {{ row.props.row.requestMethod }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <div class="cell-item">
                      请求URL
                    </div>
                  </template>
                  {{ row.props.row.requestUrl }}
                </el-descriptions-item>
              </el-descriptions>
              <el-descriptions
                  :column="2"
                  :size="settingStore.sysSize"
                  border
              >
                <el-descriptions-item label-class-name="descriptions-item-style">
                  <template #label>
                    <div class="cell-item">
                      请求参数
                    </div>
                  </template>
                  <div style="overflow-y:auto;overflow-wrap: break-word;">
                      <template v-if="row.props.row.requestParams">
                          <JsonViewer :value="handleRequestParamsToObj(row.props.row.requestParams)" copyable boxed sort />
                      </template>
                  </div>

                </el-descriptions-item>
                <el-descriptions-item label-class-name="descriptions-item-style">
                  <template #label>
                    <div class="cell-item">
                      响应参数
                    </div>
                  </template>
                  <div style="overflow-y:auto;overflow-wrap: break-word;">
                      <template v-if="row.props.row.respondParams">
                          <JsonViewer :value="handleRequestParamsToObj(row.props.row.respondParams)" copyable boxed sort />
                      </template>
                  </div>
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </template>
          <template #requestUrl="row">
            <div class="text-l">{{row.row.requestUrl}}</div>
          </template>
          <template #status="row">
              <DictTag :options="dicts.sysCommonStatus" style="cursor:pointer;margin-left:0px;" :value="row.row.status" />
          </template>
          <template #operationType="row">
              <DictTag :options="dicts.sysOperType" style="cursor:pointer;margin-left:0px;" :value="row.row.operationType" />
          </template>
          <template #operationContent="row">
            <div class="text-l">{{row.row.operationContent}}</div>
          </template>
          <template #operName="row">
            <span>{{row.row.operName}}</span>
          </template>
          <template #addTime="row">
            <span>{{handleParseTime(row.row.addTime)}}</span>
          </template>
          <template #isPcOrIphone="row">
            <span>{{row.row.isPcOrIphone?(row.row.isPcOrIphone==1?"PC端":"无线端"):"未知"}}</span>
          </template>
          <template #operation="row">
            <div class="u-f">
              <el-button :size="settingStore.sysSize" :plain="true" type="primary" :icon="View" @click="handleDetail(row.row)">{{$t("btn.detail")}}</el-button>
            </div>
          </template>
        </TableList>
    </div>
  </Loading>
</template>

<script setup lang="ts">
import {
  View,
  Download,
  Delete
} from '@element-plus/icons-vue'
import {handleParseTime} from "@/utils/utils"
import FormList from '@/components/formList'
import Loading from "@/components/loading/index.vue"
import {useRightToolBarFunc} from "@/components/rightToolbar/hooks/useRightToolBarFunc";
import {useFunc} from "./hooks/useFunc";
import {defineAsyncComponent, ref} from "vue";
const TableList = defineAsyncComponent(() => import("@/components/tableList"))
const RightToolbar = defineAsyncComponent(() => import("@/components/rightToolbar/index.vue"))
const DictTag = defineAsyncComponent(() => import("@/components/dictTag/index.vue"))


let {handleTableSelectionChange,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleDelete,handleClean,handleRequestParamsToObj,handleFormChange,handleExport,
  formRef,tableListRef,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading,dicts} = useFunc()
let {handleUpdateTableColumns,handleRefreshTable,showSearch} = useRightToolBarFunc(tableConfig,loading)
</script>

<style scoped lang="less">
.table-style{
  :deep(.descriptions-item-style){
    width:100px!important;
  }
}
</style>
