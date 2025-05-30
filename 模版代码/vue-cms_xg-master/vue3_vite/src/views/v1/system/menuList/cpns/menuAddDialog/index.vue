<!--
*- coding = utf-8 -*-
#@Time : 2022/10/12 10:24
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div>
    <el-dialog class="dialog-style" :align-center="props.alignCenter" :key="key" v-model="dialogShow" :title="dialogTitle">
      <FormList v-model="formModel" ref="formRef" :formConfig="formConfig">
        <template #pid>
          <TreeSelect :key="Math.random().toFixed(6)" v-model="formModel.pid" :options="menuOptions" :normalizer="normalizer" :show-count="true"
                      placeholder="选择上级菜单" />
        </template>
        <template #icon>
            <el-input style="width:100%" ref="buttonRef" @focus="(event)=>event.target.blur()" v-model.trim="formModel.icon" placeholder="点击选择图标" :readonly="true">
              <template #prefix><SvgIcon style="margin-right:5px" :iconClass="formModel.icon" /></template>
            </el-input>
            <el-popover :virtual-ref="buttonRef" ref="popoverRef" virtual-triggering :width="460" trigger="click" >
              <IconSelect ref="iconSelect" @selected="handleSelected" />
            </el-popover>
        </template>
      </FormList>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" :loading="loading" @click.native.prevent="handleAddSubmit(formRef,emit)">{{$t("btn.add")}}</el-button>
          <el-button type="primary" @click.native.prevent="handleResetForm(formRef)">重置</el-button>
          <el-button @click.native.prevent="handleCancel">取消</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {ElPopover} from "element-plus";
import {formConfig} from "./config/formConfig"
import FormList from '@/components/formList'
import {useFunc} from "@/views/system/menuList/cpns/menuAddDialog/hooks/useFunc";
import {useCommonFunc} from "@/views/system/menuList/cpns/hooks/useCommonFunc";
import {defineAsyncComponent, ref, watch} from "vue";
import type {propsInterface,exposeInterface} from "@/views/system/menuList/cpns/menuAddDialog/types";

const IconSelect = defineAsyncComponent(()=>import("@/components/iconSelect/index.vue"))


let props = withDefaults(defineProps<propsInterface>(),{
  alignCenter:true,
})

interface EmitType {
  (e: "handleCloseDialog"): void,
}
const emit = defineEmits<EmitType>()


let {handleOpenDialog,handleResetForm,handleAddSubmit,handleCancel,formRef,popoverRef,buttonRef,menuOptions,dialogShow,loading,dialogTitle,key,formModel} = useFunc()
let {handleSelected,normalizer} = useCommonFunc(formModel,popoverRef)

let listArr = ["perms"]//目录
let menuArr = ["component","queryParam","isCache"]//菜单
let buttonArr = ["icon","isFrame","path","visible","status"]//按钮
let commonArr = ["pid","menuType","menuName","sort"]//公共
watch(()=>formModel.value.menuType,(value:any)=>{
  for(let i in formConfig.formItems){
     if(value!='3' && buttonArr.includes(formConfig.formItems[i]["prop"])){
       formConfig.formItems[i]["isHidden"] = false;
     }else if(value=='2' && menuArr.includes(formConfig.formItems[i]["prop"])){
       formConfig.formItems[i]["isHidden"] = false;
     }else if(value!='1' && listArr.includes(formConfig.formItems[i]["prop"])){
       formConfig.formItems[i]["isHidden"] = false;
     }else if(commonArr.includes(formConfig.formItems[i]["prop"])){
       formConfig.formItems[i]["isHidden"] = false;
     }else{
       formConfig.formItems[i]["isHidden"] = true;
     }
 }
},{immediate:true})


defineExpose<exposeInterface>({
  handleResetForm,
  handleOpenDialog
})
</script>

<style scoped lang="less">

</style>