<!--
*- coding = utf-8 -*-
#@Time : 2022/9/18 10:10
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<!--element-plus 表单组件-->
<template>
  <div class="">
    <el-form
        ref="formRef"
        :inline="props.formConfig.inline??false"
        :model="props.modelValue"
        :label-position="props.formConfig.labelPosition??'right'"
        :label-width="!!props.formConfig.labelWidth ?props.formConfig.labelWidth:'auto'"
        :style="props.formConfig.style"
        :rules="props.formConfig.rules"
        :size="props.formConfig.size"
        v-bind="attrs"
    >
        <template v-for="item in props.formConfig.formItems" :key="item.prop">
          <template v-if="item.tooltipOptions">
            <el-tooltip :content="item.tooltipOptions.content" :placement="item.tooltipOptions.placement??'left'" v-bind="item.tooltipOptions.otherOptions">
              <FormItem :modelValue="props.modelValue" @update:modelValue="handleValueChange" :item="item" @change="handleChange" >
                <template #slot>
                  <template v-if="item.type === 'slot'">
                    <slot :name="item.prop" :row="item"></slot>
                  </template>
                </template>
              </FormItem>
            </el-tooltip>
          </template>
          <template v-else>
            <FormItem :modelValue="props.modelValue" @update:modelValue="handleValueChange" :item="item" @change="handleChange" >
              <template #slot>
                <template v-if="item.type === 'slot'">
                  <slot :name="item.prop" :row="item"></slot>
                </template>
              </template>
            </FormItem>
          </template>
        </template>
          <el-form-item v-if="!props.formConfig.isHiddenBtn">
            <el-button type="primary" @click="handleSubmit">{{$t("btn.search")}}</el-button>
            <el-button v-if="appStore.device=='mobile'?false:true" @click="handleReset">{{$t("btn.reset")}}</el-button>
            <slot name="formBtn"> </slot>
          </el-form-item>
          <el-form-item v-else>
            <slot name="formCustomBtn"> </slot>
          </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">

import {formInterface} from "@/components/formList/types";
import FormItem from "./formItem.vue"
import {useAttrs} from "vue";
import {useFunc} from "@/components/formList/src/hooks/useFunc";

interface propsFormInterface {
  formConfig:formInterface
  modelValue:any
}
const attrs = useAttrs()
const emit = defineEmits(['update:modelValue', 'submit', 'reset','change'])
const props = withDefaults(defineProps<propsFormInterface>(),{
  formConfig:()=>{
    return {}
  },
  modelValue:()=>{}
})

let {formRef,validate,resetFields,handleSubmit,handleReset,handleChange,handleValueChange,appStore} = useFunc(emit, props)
defineExpose({validate,resetFields})


</script>

<style scoped lang="less">

</style>
