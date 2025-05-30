<!--
*- coding = utf-8 -*-
#@Time : 2023/5/12 17:11
#@Author : 沉默小管
#@File : index.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<!--系统状态监控-->
<template>
  <Loading :isLoading="loading">
    <el-row :gutter="16">
      <el-col class="margin-bottom-10" :span="10" :xs="24" :sm="24" :md="12" :lg="12">
        <div class="card-style">
          <div class="u-f margin-bottom-10">
            <div class="margin-right-5 title-icon"></div>
            <div style="line-height: 25px;">cpu</div>
          </div>
          <div style="padding:10px 30px">
            <div class="u-f u-f-ajs" style="padding:0px 15px;font-size:16px;border-bottom:1px solid #dfe6ec;line-height: 44px">
              <div>属性</div>
              <div>值</div>
            </div>
            <div class="u-f u-f-ajs" style="padding:0px 15px;font-size:14px;border-bottom:1px solid #dfe6ec;line-height: 44px">
              <div>核数</div>
              <div>{{ sysInfo.cpu.cpuLength }}</div>
            </div>
            <div class="u-f u-f-ajs" style="padding:0px 15px;font-size:14px;border-bottom:1px solid #dfe6ec;line-height: 44px">
              <div>类型</div>
              <div>{{ sysInfo.cpu.cpuModel }}</div>
            </div>
            <div class="u-f u-f-ajs" style="padding:0px 15px;font-size:14px;border-bottom:1px solid #dfe6ec;line-height: 44px">
              <div>使用率</div>
              <div>{{ sysInfo.cpu.cpuUsage }}</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col class="margin-bottom-10" :span="10" :xs="24" :sm="24" :md="12" :lg="12">
        <div class="card-style">
          <div class="u-f margin-bottom-10">
            <div class="margin-right-5 title-icon"></div>
            <div style="line-height: 25px;">内存</div>
          </div>
          <div style="padding:10px 30px">
            <div class="u-f u-f-ajs" style="padding:0px 15px;font-size:16px;border-bottom:1px solid #dfe6ec;line-height: 44px">
              <div>属性</div>
              <div>内存</div>
            </div>
            <div class="u-f u-f-ajs" style="padding:0px 15px;font-size:14px;border-bottom:1px solid #dfe6ec;line-height: 44px">
              <div>总内存</div>
              <div>{{ sysInfo.memory.systemTotal }}</div>
            </div>
            <div class="u-f u-f-ajs" style="padding:0px 15px;font-size:14px;border-bottom:1px solid #dfe6ec;line-height: 44px">
              <div>空闲内存</div>
              <div>{{ sysInfo.memory.systemFree }}</div>
            </div>
            <div class="u-f u-f-ajs" style="padding:0px 15px;font-size:14px;border-bottom:1px solid #dfe6ec;line-height: 44px">
              <div>使用率</div>
              <div>{{ sysInfo.memory.sysUsePercent }}%</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col class="margin-bottom-10" :span="24" :xs="24" :sm="24" :md="24" :lg="24">
        <div class="card-style">
          <div class="u-f margin-bottom-10">
            <div class="margin-right-5 title-icon"></div>
            <div style="line-height: 25px;">系统环境信息</div>
          </div>
          <div style="padding:10px 30px">
            <div class="u-f u-f-ajs" style="padding:0px 15px;font-size:16px;border-bottom:1px solid #dfe6ec;line-height: 44px">
              <div>系统内核</div>
              <div>{{ sysInfo.sysInfo.type }}</div>
            </div>
            <div class="u-f u-f-ajs" style="padding:0px 15px;font-size:16px;border-bottom:1px solid #dfe6ec;line-height: 44px">
              <div>操作系统</div>
              <div>{{ sysInfo.sysInfo.platform }}</div>
            </div>
            <div class="u-f u-f-ajs" style="padding:0px 15px;font-size:14px;border-bottom:1px solid #dfe6ec;line-height: 44px">
              <div>运行时长</div>
              <div>{{ handleTimeComponent(sysInfo.sysInfo.sysOnTime) }}</div>
            </div>
            <div class="u-f u-f-ajs" style="padding:0px 15px;font-size:14px;border-bottom:1px solid #dfe6ec;line-height: 44px">
              <div>主机名</div>
              <div>{{ sysInfo.sysInfo.hostname }}</div>
            </div>
            <div class="u-f u-f-ajs" style="padding:0px 15px;font-size:14px;border-bottom:1px solid #dfe6ec;line-height: 44px">
              <div>主目录</div>
              <div>{{ sysInfo.sysInfo.hdir }}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16">
      <el-col class="margin-bottom-10" :span="10" :xs="24" :sm="24" :md="8" :lg="8">
        <div class="card-style">
          <div class="u-f margin-bottom-10">
            <div class="margin-right-5 title-icon"></div>
            <div style="line-height: 25px;">缓存列表</div>
          </div>
          <div>
            <TableList ref="tableListRef" :tableConfig="tableCacheConfig" @row-click="handleTableCacheRowClick">
              <template #operation="row">
                <el-button
                    :size="settingStore.sysSize"
                    type="danger"
                    @click.native.stop="handleDelete(row.row,'first')"
                    v-hasPower="['article:articleColumn:del']"
                >{{$t("btn.delete")}}</el-button>
              </template>
            </TableList>
          </div>
        </div>
      </el-col>
      <el-col class="margin-bottom-10" :span="10" :xs="24" :sm="24" :md="8" :lg="8">
        <div class="card-style">
          <div class="u-f margin-bottom-10">
            <div class="margin-right-5 title-icon"></div>
            <div style="line-height: 25px;">键名列表</div>
          </div>
          <div>

            <TableList ref="tableListRef" :tableConfig="tableKeysNameConfig" @row-click="handleTableKeysRowClick">

              <template #operation="row">
                <el-button
                    :size="settingStore.sysSize"
                    type="danger"
                    @click.native.stop="handleDelete(row.row,'second')"
                    v-hasPower="['article:articleColumn:del']"
                >{{$t("btn.delete")}}</el-button>
              </template>
            </TableList>
          </div>
        </div>
      </el-col>
      <el-col class="margin-bottom-10" :span="10" :xs="24" :sm="24" :md="8" :lg="8">
        <div class="card-style">
          <div class="u-f margin-bottom-10">
            <div class="margin-right-5 title-icon"></div>
            <div style="line-height: 25px;">缓存内容</div>
          </div>
          <div style="padding:10px 20px 10px 0px">
            <FormList v-model="cacheData" ref="formRef" :formConfig="formConfig"/>
          </div>
        </div>
      </el-col>
    </el-row>
  </Loading>
</template>

<script setup lang="ts">

import {formConfig} from "./config/formConfig"
import Loading from "@/components/loading/index.vue"
import {tableCacheConfig,tableKeysNameConfig} from "./config/tableConfig"
import {defineAsyncComponent, inject, onBeforeUnmount, onMounted, ref} from "vue";
import FormList from '@/components/formList'
import {useFunc} from "@/views/systemMonitor/statusMonitor/hooks/useFunc";
const TableList = defineAsyncComponent(()=>import("@/components/tableList"))

let {loading,settingStore,sysInfo,curClickCacheData,cacheData,
  handleTimeComponent,handleDelete,handleTableCacheRowClick,handleTableKeysRowClick} = useFunc()

</script>

<style scoped lang="less">
.title-icon{
  width:5px;
  height:25px;
  background-color: v-bind("settingStore.themeColor.primary");
}
.card-style {
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}
</style>
