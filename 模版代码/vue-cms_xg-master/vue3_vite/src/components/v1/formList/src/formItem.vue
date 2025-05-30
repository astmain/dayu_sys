<!--
*- coding = utf-8 -*-
#@Time : 2023/4/1 10:10
#@Author : 沉默小管
#@File : formItem.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <span>
    <el-form-item :label="appStore.device=='mobile'?'':item.label" :prop="item.prop" v-if="!item.isHidden" v-bind="item.formItemOtherOptions">
      <!-- 输入框 -->
      <template v-if="item.type === 'input'">
        <el-input
            :model-value.trim="props.modelValue[`${item.prop}`]"
            @input="handleValueChange($event, item.prop)"
            :placeholder="item.placeholder"
            :style="{width:item.width ?? '150px'}"
            :clearable="item.clearable ?? true"
            :filterable="item.filterable ?? true"
            v-bind="item.otherOptions"
        />
      </template>
      <!-- 选择器 -->
      <template v-if="item.type === 'select'">
        <el-select
            :model-value="props.modelValue[item.prop]"
            @input="handleValueChange($event, item.prop)"
            :placeholder="item.placeholder"
            :style="{width:item.width ?? '150px'}"
            :clearable="item.clearable ?? true"
            :filterable="item.filterable ?? true"
            @change="handleValueChange($event,item.prop)"
            v-bind="item.otherOptions"
        >
            <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </template>
      <!-- 日期选择 -->
      <template v-if="item.type === 'datePicker'">
        <template v-if="item.dataPickType==='daterange'">
          <el-date-picker
              v-model="props.modelValue[`${item.prop}`]"
              @input="handleValueChange($event, item.prop)"
              :style="{width:item.width ?? '150px'}"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format='YYYY-MM-DD'
              :clearable="item.clearable ?? true"
              @change="handleChange($event,item.prop)"
              v-bind="item.otherOptions"
          />
        </template>
        <template v-else-if="item.dataPickType==='dates'">
          <el-date-picker
              v-model="props.modelValue[`${item.prop}`]"
              @input="handleValueChange($event, item.prop)"
              :placeholder="item.placeholder"
              :style="{width:item.width ?? '150px'}"
              type="dates"
              value-format='YYYY-MM-DD'
              :clearable="item.clearable ?? true"
              @change="handleChange($event,item.prop)"
              v-bind="item.otherOptions"
          />
        </template>
        <template v-else-if="item.dataPickType==='datetimerange'">
          <el-date-picker
              v-model="props.modelValue[`${item.prop}`]"
              @input="handleValueChange($event, item.prop)"
              :style="{width:item.width ?? '150px'}"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              type="datetimerange"
              value-format='YYYY-MM-DD'
              :clearable="item.clearable ?? true"
              @change="handleChange($event,item.prop)"
              v-bind="item.otherOptions"
          />
        </template>
        <template v-else>
          需要填写dataPickType属性
        </template>

      </template>
      <!-- 级联cascader -->
      <template v-if="item.type === 'cascader'">
        <el-cascader
            :model-value="props.modelValue[item.prop]"
            @input="handleValueChange($event, item.prop)"
            :placeholder="item.placeholder"
            :style="{width:item.width ?? '160px'}"
            :options="item.options"
            :props="item.props"
            :clearable="item.clearable ?? true"
            :filterable="item.filterable ?? true"
            @change="handleChange($event,item.prop)"
            v-bind="item.otherOptions"
        />
      </template>
      <!-- 单选 -->
      <template v-if="item.type === 'radio'">
        <el-radio-group
            :model-value="props.modelValue[item.prop]"
            @change="handleValueChange($event, item.prop)"
            v-bind="item.otherOptions"
        >
          <el-radio
              v-for="(option, index) in item.options"
              :key="option.value"
              :label="option.value"
          >
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </template>
      <!-- 文本 -->
      <template v-if="item.type === 'text'">
        <span v-bind="item.otherOptions"> {{ props.modelValue[item.prop] }} </span>
      </template>
      <!-- 插槽 -->
      <template v-if="item.type === 'slot'">
         <el-input :model-value.trim="props.modelValue[`${item.prop}`]"
                   @input="handleValueChange($event, item.prop)"
                   v-show="false"
                   type="text" />
        <slot name="slot"></slot>
      </template>
    </el-form-item>
  </span>

</template>

<script setup lang="ts">
import {formItem} from "@/components/formList/types";
import {PropType} from "vue";
import {useStore} from "@/store/piniaAutoImport";

const emit = defineEmits(['update:modelValue','change'])

const props = defineProps({
  item:{
    type:Object as PropType<formItem>,
    required:true
  },
  modelValue:{
    type:Object as PropType<any>,
    required:true
  }
})

const appStore:any = useStore("useApp")

// v-model 值绑定 props单向数据流
function handleValueChange(value: any, prop: string) {
  emit('update:modelValue', { ...props.modelValue, [prop]: value })
}

function handleChange(val: any, prop: string) {
  emit('change', val, prop)
}
</script>

<style scoped lang="less">

</style>