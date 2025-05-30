<!--
*- coding = utf-8 -*-
#@Time : 2023/5/7 9:24
#@Author : 沉默小管
#@File : index.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div class="u-f u-f-ac u-f-ajc">
    <el-popover
            ref="popoverRef"
        placement="bottom"
        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
        :width="400" trigger="click">
      <template #reference>
        <template v-if="newNum>0">
          <el-badge :value="newNum" class="item">
            <SvgIcon @click="handleShowMsg" :size="'18px'" :iconClass="'bell'" />
          </el-badge>
        </template>
        <template v-else>
            <SvgIcon @click="handleShowMsg" :size="'18px'" :iconClass="'bell'" />
        </template>
      </template>
      <template #default>
        <div
            class="demo-rich-conent"
            style="display: flex; gap: 16px; flex-direction: column">
          <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <template v-for="(item,index) in dicts.sysNoticeType">
            <el-tab-pane :label="item.label" :name="item.value">
              <Loading :classData="'custom-loading-style'" :isLoading="loading">
              <TableList ref="tableListRef" :tableConfig="tableConfig" :pageConfig="pageConfig"
                         @selection-change="handleTableSelectionChange"
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
                             v-hasPower="['layout:notice:check']"
                  >查看</el-button>
                </template>
              </TableList>
              </Loading>
            </el-tab-pane>
            </template>
          </el-tabs>
        </div>
      </template>
    </el-popover>
      <!--    查看详细  -->
          <G_NoticeDetailDialog ref="noticeDetailDialogRef" @handleCloseDialog="handleCloseDialog" />
  </div>
</template>

<script setup lang="ts">
import {handleParseTime} from "@/utils/utils"
import {defineAsyncComponent, ref} from "vue";
import {useFunc} from "@/views/layout/cpns/notice/hooks/useFunc";
import Loading from "@/components/loading/index.vue"
import FormList from "@/components/formList";
const TableList = defineAsyncComponent(() => import("@/components/tableList"))
const DictTag = defineAsyncComponent(() => import("@/components/dictTag/index.vue"))
const G_NoticeDetailDialog = defineAsyncComponent(() => import("./cpns/noticeDetailDialog/index.vue"))
const LoadComponentsAsync = defineAsyncComponent(()=>import("@/components/loadComponentsAsync/index.vue"))
let formRef = ref<InstanceType<typeof FormList>>()
let tableListRef = ref<InstanceType<typeof TableList>>(null)
let popoverRef = ref<any>(null)
let noticeDetailDialogRef = ref<InstanceType<typeof G_NoticeDetailDialog>>(null)
let {dicts,handleDict,handleShowMsg,activeName,handleTabClick,handleCloseDialog,
  handleTableSelectionChange,handleList,handleSizeChange,handleCurrentChange,handleDetail,
  settingStore,dialogShow,dialogTitle,pageConfig,tableConfig,loading,newNum} = useFunc(tableListRef,popoverRef)



</script>

<style scoped lang="less">

</style>
