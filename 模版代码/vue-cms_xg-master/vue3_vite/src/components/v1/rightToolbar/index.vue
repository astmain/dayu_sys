<!--
*- coding = utf-8 -*-
#@Time : 2022/10/25 9:36
#@Author : CSDN 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div class="right-tool-bar">
    <el-row>
      <el-tooltip class="item" effect="dark" :content="props.showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
        <el-button :icon="Search" :size="settingStore.sysSize" circle icon="el-icon-search" @click="handleToggleSearch()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <el-button :icon="Refresh" :size="settingStore.sysSize" circle icon="el-icon-refresh" @click="handleRefresh()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="显隐列" placement="top" v-if="props.columns">
        <el-button :size="settingStore.sysSize" circle :icon="Menu" ref="buttonRef" @click="handleShowColumn()" />
      </el-tooltip>

        <el-popover
            ref="popoverRef"
            :virtual-ref="buttonRef"
            placement="bottom"
            width="180"
            virtual-triggering
            trigger="click">
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="item.label" v-for="(item, i) in checkedLabels" :key="i" style="display: block;"></el-checkbox>
          </el-checkbox-group>
          <div class="u-f">
            <el-button v-show="handleCanDo" :icon="Search" :size="settingStore.sysSize" type="primary" @click="handlerFilterFunc('filter')">{{$t("btn.filter")}}</el-button>
            <el-button v-show="!handleCanDo" :icon="Search" :size="settingStore.sysSize" type="primary">{{$t("btn.filter")}}</el-button>
            <el-button v-show="handleCanDo" :icon="CloseBold" :size="settingStore.sysSize" class="filterFuncClass" @click="handlerFilterFunc('cancel')">{{$t("btn.cancel")}}</el-button>
            <el-button v-show="!handleCanDo" :icon="CloseBold" :size="settingStore.sysSize" class="filterFuncClass">{{$t("btn.cancel")}}</el-button>
          </div>
        </el-popover>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {
  Search,
  CloseBold,
  Refresh,
  Menu
} from '@element-plus/icons-vue'
import {ElButton, ElPopover} from "element-plus";
import {useStore} from "@/store/piniaAutoImport";
import {computed, ref, unref} from "vue";
import type {propsInterface} from "@/components/rightToolbar/types";

let props = withDefaults(defineProps<propsInterface>(),{
  showSearch:true,
  columns:()=>{
    return []
  },
})
let settingStore = useStore("useSetting")
const handleCanDo = computed(()=>{
  return checkList.value.length>0
})

// 是否显示弹出层
let checkList = ref([])//显示的table字段
let checkedLabels = ref([])//全部table字段
let popoverRef = ref<InstanceType<typeof ElPopover>>()
let buttonRef = ref<InstanceType<typeof ElButton>>()

// 打开显隐列dialog
const handleShowColumn=()=>{
  checkedLabels.value = JSON.parse(JSON.stringify(props.columns))
  checkList.value = []
  for(let i in checkedLabels.value){
    if(checkedLabels.value[i]["isShow"]){
      checkList.value.push(checkedLabels.value[i]["label"])
    }
  }
  unref(popoverRef.value)?.hide()
}

const handlerFilterFunc = (type:string)=>{
  if (type === 'filter') {
    let columns = JSON.parse(JSON.stringify(props.columns)).map((val:any)=>{
      val.isShow=false
      return val
    })

    for(let q in checkList.value){
      for(let i in columns){
        if(checkList.value[q]==columns[i]["label"]){
          columns[i]["isShow"] = true
          break;
        }
      }
    }
    emit("updateTableColumns",columns)
  } else if (type === 'cancel') {

  }
  unref(popoverRef.value)?.hide()
}

interface PropsEmit{
  (e:"update:showSearch",params?:boolean):void
  (e:"queryTable"):void
  (e:"updateTableColumns",columns:any):void
}
let emit = defineEmits<PropsEmit>()

const handleToggleSearch = ()=>{
  emit("update:showSearch", !props.showSearch);
}
const handleRefresh = ()=>{
  emit("queryTable");
}
</script>

<style scoped lang="less">
.right-tool-bar{
  //position:absolute;
  //right:0px;
  //bottom:0px;
}
</style>