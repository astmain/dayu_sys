<!--
*- coding = utf-8 -*-
#@Time : 2023/4/14 9:19
#@Author : CSDN 沉默小管
#@File : index.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <Loading :isLoading="loading">
    <TableList ref="tableListRef" :tableConfig="tableConfig" :pageConfig="pageConfig"
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
              <div style="overflow-y:auto;width:350px;overflow-wrap: break-word;">
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
              <div style="overflow-y:auto;width:350px;overflow-wrap: break-word;">
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
      <template #operName="row">
        <span>{{row.row.operName}}</span>
      </template>
      <template #addTime="row">
        <span>{{handleParseTime(row.row.addTime)}}</span>
      </template>
      <template #isPcOrIphone="row">
        <span>{{row.row.isPcOrIphone?(row.row.isPcOrIphone==1?"PC端":"无线端"):"未知"}}</span>
      </template>
    </TableList>
  </Loading>
</template>

<script setup lang="ts">
import {handleParseTime} from "@/utils/utils"
import FormList from '@/components/formList'
import Loading from "@/components/loading/index.vue"
import {useFunc} from "@/views/common/personalCenter/cpns/operationLog/hooks/useFunc";
import {defineAsyncComponent, ref} from "vue";

const LoadComponentsAsync = defineAsyncComponent(() => import("@/components/loadComponentsAsync/index.vue"))
const TableList = defineAsyncComponent(() => import("@/components/tableList"))

let {handleList,handleSizeChange,handleCurrentChange,computedContent,handleRequestParamsToObj,
  formRef,tableListRef,settingStore,dialogShow,dialogTitle,key,formSearchModel,pageConfig,tableConfig,loading} = useFunc()

tableConfig.topStyleClientHeight = 90
</script>

<style scoped lang="less">

</style>