<!--
*- coding = utf-8 -*-
#@Time : 2023/2/25 9:31
#@Author : CSDN 沉默小管
#@File : table.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div>
    <div v-if="appStore.device=='mobile'" class="phoneStyle">
        <div :style="'overflow-y:auto;max-height:'+props.tableConfig.tableHeight+'px'" class="phoneScroll" @scroll="handleScroll">
          <div style="" class="phoneStyle-item" v-for="(item,index) in props.tableConfig.tableData">
            <div :key="index+'-'+index1" v-for="(item1,index1) in props.tableConfig.tableCol">
              <div class="u-f u-f-ajs phoneStyle-item-list" v-if="item1.showType=='slot' && item1.prop!='operation'">
                <div class="phoneStyle-item-label">{{item1.label}}</div>
                <div class="phoneStyle-item-value text-l">
                  <slot :name="item1.prop" :row="item"></slot>
                </div>
              </div>
              <div class="u-f u-f-ajs phoneStyle-item-list" v-else-if="item1.showType=='col'">
                <div class="phoneStyle-item-label">{{item1.label}}</div>
                <div class="phoneStyle-item-value text-l">{{item[item1.prop]}}</div>
              </div>

              <!--        操作-->
              <div class="margin-top-10" v-if="item1.prop=='operation'">
                  <div class="u-f u-f-ajs">
                      <div></div>
                      <div>
                        <slot :name="item1.prop" :row="item"/>
                      </div>
                  </div>
              </div>

            </div>
          </div>
        </div>
    </div>
    <div v-else class="pcStyle">
      <div :class="props.tableClass" :style="props.tableStyle">
        <el-table
            :row-key="props.tableConfig.keyId"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            ref="tableRef"
            :setScrollTop="100"
            :style="props.tableConfig.tableStyle"
            :height="props.tableConfig.tableHeight"
            :data="props.tableConfig.tableData"
            :size="props.tableConfig.tableSize"
            :cell-style="props.tableConfig.tableCellStyle"
            v-bind="attrs"
        >
          <el-table-column v-if="props.tableConfig.showSelectColumn" type="selection" align="center" width="40" />
          <!--    具名插槽-->
          <slot name="tableColumn" />
          <el-table-column
              v-if="props.tableConfig.isExpand?true:false"
              type="expand"
          >
            <el-table-column  type="expand">
              <template #default="props">
                <slot name="expandSlot" :props="props" ></slot>
              </template>
            </el-table-column>
          </el-table-column>

          <template v-for="(item,index) in props.tableConfig.tableCol">
            <el-table-column
                v-if="item.showType == 'col' && item.isShow==true"
                :key="item.index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :fixed="item.fixed"
                :resizable="item.resizable"
                :sortable="item.sortable"
                v-bind="item.otherOptions"
            >
              <template #default="scope">
                <span>{{scope.row[item.prop]}}</span>
              </template>
            </el-table-column>
            <el-table-column
                v-if="item.showType == 'slot' && item.isShow==true"
                :key="item.index"
                :prop="item.prop"
                :label="item.label"
                :width="item.prop=='operation'&& !item.width?'250px':item.width"
                :fixed="item.fixed"
                :resizable="item.resizable"
                :sortable="item.sortable"
                v-bind="item.otherOptions"
            >
              <template #default="scope">
                <slot :name="item.prop" :index="index" :row="scope.row"></slot>
              </template>

            </el-table-column>
          </template>
          <!--    匿名插槽-->
          <!--                <slot name="table-column"/>-->

        </el-table>
      </div>

      <div v-if="props.pageConfig.isPageShow" :class="props.pageClass" :style="props.pageStyle">
        <el-pagination
            :currentPage="props.pageConfig.currentPage"
            :page-size="props.pageConfig.pageSize"
            :page-sizes="[10,20, 50, 100, 200]"
            :small="props.pageConfig.small"
            :disabled="props.pageConfig.disabled"
            :background="props.pageConfig.background"
            :layout="props.pageConfig.layout?props.pageConfig.layout:'total, sizes, prev, pager, next, jumper'"
            :total="props.pageConfig.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ElTable} from "element-plus";
import {useFunc} from "@/components/tableList/src/hooks/useFunc";
import {onMounted, ref, useAttrs} from "vue";
import type {exposeInterface,propsInterface} from "@/components/tableList/src/types";

const attrs = useAttrs();

let props = withDefaults(defineProps<propsInterface>(),{
  //默认值为引用类型的，需要包装一个函数 return 出去
  tableConfig:()=>{
    return {
      tableData: [],
      tableCol: [],
      tableSize: "small",
      keyId:"id",
      showSelectColumn:false,
      tableCellStyle: ()=>"textAlign: 'center';fontWeight: '600';color: 'black'",
    }
  },
  pageConfig:()=>{
    return {
      currentPage: 1,
      pageSize: 10,
      small: true,
      disabled: false,
      background: false,
      total: 0,
      isPageShow: false,
    }
  },
  tableStyle:"",
  tableClass:"",
  pageStyle:"margin:20px 10px",
  pageClass:"",
  topHeight:78,
})
let tableRef = ref<InstanceType<typeof ElTable>>()
interface EmitType {
  (e: "handleSizeChange", params: number): void,
  (e: "handleCurrentChange", params: number): void,
}
const emit = defineEmits<EmitType>();

onMounted(()=>{
  //没有给高度才自动获取table高度
  if(!props.tableConfig.tableHeight){
    handleGetHeight()
  }
})

const {handleSetScrollTop,handleClearSelection,handleSizeChange,handleCurrentChange,toggleRowSelection,handleGetHeight,handleScroll,appStore} = useFunc(tableRef,emit,props)


defineExpose<exposeInterface>({
  handleSetScrollTop,
  toggleRowSelection,
  handleClearSelection,
})

</script>

<style scoped lang="less">
//手机端样式
.phoneStyle{

  //background:white;
  &-item{
    margin:2px 4px 18px 4px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    height: 100%;
    padding: 20px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
    &-list{
      line-height: 36px;
    }
    &-label{
      flex: 1;
      font-size:14px;
    }
    &-value{
      text-align: right;
      flex: 1;
    }
  }
}
//pc端样式
.pcStyle{

}
</style>
