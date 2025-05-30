<!--
*- coding = utf-8 -*-
#@Time : 2023/5/12 17:27
#@Author : 沉默小管
#@File : index.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<!--消息通知-->
<template>
  <Loading :isLoading="loading">
    <TableList ref="tableListRef" :tableConfig="tableConfig" :pageConfig="pageConfig"
               @handleCurrentChange="handleCurrentChange" v-on:handleSizeChange="handleSizeChange">
      <template #content="row">
        <div class="text-l">{{row.row.content}}</div>
      </template>
      <template #status="row">
        <DictTag :options="dicts.sysNotifyStatus" style="cursor:pointer;margin-left:0px;" :value="row.row.status" />
      </template>
      <template #addTime="row">
        <span>{{handleParseTime(row.row.addTime)}}</span>
      </template>
      <template #operation="row">
        <el-button :size="settingStore.sysSize" type="primary" @click="handleDetail(row.row,noticeDetailDialogRef)"
                   v-hasPower="['common:personalCenter:notify:check']"
        >查看</el-button>
      </template>
    </TableList>
    <!--    查看详细  -->
      <G_NoticeDetailDialog ref="noticeDetailDialogRef" @handleCloseDialog="handleCloseDialog" />
  </Loading>
</template>

<script setup lang="ts">
import {handleParseTime} from "@/utils/utils"
import FormList from '@/components/formList'
import Loading from "@/components/loading/index.vue"
import {defineAsyncComponent, ref} from "vue";
import {useFunc} from "@/views/common/personalCenter/cpns/notify/hooks/useFunc";
const DictTag = defineAsyncComponent(() => import("@/components/dictTag/index.vue"))
const G_NoticeDetailDialog = defineAsyncComponent(() => import("./cpns/noticeDetailDialog/index.vue"))
const LoadComponentsAsync = defineAsyncComponent(() => import("@/components/loadComponentsAsync/index.vue"))
const TableList = defineAsyncComponent(() => import("@/components/tableList"))

let {dicts,handleDict,formRef,tableListRef,noticeDetailDialogRef,
  handleTableSelectionChange,handleList,handleSizeChange,handleCurrentChange,handleDetail,handleCloseDialog,
  settingStore,dialogShow,dialogTitle,pageConfig,tableConfig,loading} = useFunc()

tableConfig.topStyleClientHeight = 90
</script>

<style scoped lang="less">

</style>