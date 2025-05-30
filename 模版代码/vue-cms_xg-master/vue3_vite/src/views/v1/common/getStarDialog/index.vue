<!--
*- coding = utf-8 -*-
#@Time : 2023-02-07 23:43
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
    <div>
        <el-dialog class="dialog-style" :align-center="props.alignCenter" :key="key" v-model="dialogShow" width="650" :show-close="false">
          <template #header="{ close, titleId, titleClass }">
            <div class="u-f u-f-ajs" style="height: 30px">
              <div class="u-f">
                <div style="margin-right:10px;" class="u-f u-f-ac u-f-ajc">
                  <SvgIcon :size="'18px'" :iconClass="'notify'" />
                </div>
                <div style="line-height: 30px;">
                  {{dialogTitle}}
                </div>
              </div>
              <div class="u-f u-f-ac u-f-ajc" style="cursor:pointer" @click="close">
                <div class="margin-left-10"><el-icon><Close /></el-icon></div>
              </div>
            </div>
          </template>
          <div style="margin-top: 0;margin-bottom: 10px;font-weight: 500;">
            感谢各位新老铁子的关注，欢迎体验我的开源项目与工具！
          </div>
          <TableList ref="tableListRef" :tableConfig="tableConfig">

            <template #warehouseAddress="row">
              <template v-if="row.row.warehouseAddress">
                <a :href="row.row.warehouseAddress" target="_blank">{{ row.row.warehouseAddress }}</a>
              </template>
            </template>
            <template #isOpen="row">
              <template v-if="row.row.isOpen">
                <span style="color: rgb(0, 187, 0);">是</span>
              </template>
            </template>
          </TableList>
          <div style="margin-top:20px;">
            <div style="color:rgba(0, 0, 0, .85);margin-bottom:.5em;font-weight: 500;">
              如果想要更高级的产品功能，可以进入我的<a style="margin-left:2px;margin-right:2px;" href="https://gitee.com/derekgo/vue-cms_xg" target="_blank">gitee</a>仓库给我留言
            </div>
            <div style="color:rgba(0, 0, 0, .85);margin-bottom:.5em;font-weight: 500;">
              点击右下角（去点star支持我），star后不再弹出！
            </div>

          </div>
            <template #footer>
      <span class="dialog-footer">
          <el-button @click.native.prevent="handleCancel">{{$t("btn.cancel")}}</el-button>
         <el-button type="primary" :loading="loading" @click.native.prevent="handleGetStar()">{{$t("btn.getStar")}}</el-button>
      </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import { Plus,Close,FullScreen } from '@element-plus/icons-vue'
    import {tableConfig} from "./config/tableConfig"
    import {defineAsyncComponent} from "vue";
    const TableList = defineAsyncComponent(()=>import("@/components/tableList"))
    import {useFunc} from "./hooks/useFunc";
    import type {propsInterface,exposeInterface} from "@/views/common/getStarDialog/types";

    let props = withDefaults(defineProps<propsInterface>(),{
        alignCenter:true,
    })

    interface EmitType {
        (e: "handleCloseDialog"): void,
    }
    const emit = defineEmits<EmitType>()

    let {handleOpenDialog,handleCancel,handleGetStar,dialogShow,loading,key,dialogTitle} = useFunc()

    defineExpose<exposeInterface>({
        handleOpenDialog
    })
</script>

<style scoped lang="less">
  :deep(.el-dialog__body){
    padding:10px 16px;
  }
  :deep(.dialog-style){
    z-index:999;
  }
</style>
