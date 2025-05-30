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
        <template #isPcOrIphone="row">
          <span>{{row.row.isPcOrIphone?(row.row.isPcOrIphone==1?"PC端":"无线端"):"未知"}}</span>
        </template>
        <template #status="row">
          <DictTag style="margin-left:0px" :options="dicts.sysSwitches" :value="row.row.status" />
        </template>
        <template #addTime="row">
          <span>{{handleParseTime(row.row.addTime)}}</span>
        </template>
      </TableList>
  </Loading>
</template>

<script setup lang="ts">
import {handleParseTime} from "@/utils/utils"
import Loading from "@/components/loading/index.vue"
import {useFunc} from "@/views/common/personalCenter/cpns/loginLog/hooks/useFunc";
import {defineAsyncComponent, ref} from "vue";
const TableList = defineAsyncComponent(() => import("@/components/tableList"))
const DictTag = defineAsyncComponent(() => import("@/components/dictTag/index.vue"))

let {handleList,handleSizeChange,handleCurrentChange,
  formRef,tableListRef,dicts,settingStore,dialogShow,dialogTitle,key,formSearchModel,pageConfig,tableConfig,loading} = useFunc()
  tableConfig.topStyleClientHeight = 90
</script>

<style scoped lang="less">

</style>
