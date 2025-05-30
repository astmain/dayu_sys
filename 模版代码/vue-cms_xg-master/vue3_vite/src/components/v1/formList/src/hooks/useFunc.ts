/*- coding = utf-8 -*-
@Time : 2023/4/2 10:56
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {ref} from "vue";
import {ElForm} from "element-plus";
import {useStore} from "@/store/piniaAutoImport";

export const useFunc = (emit, props)=>{
    const appStore = useStore("useApp")
    const formRef = ref<InstanceType<typeof ElForm>>()
    // v-model 值绑定 props单向数据流
    function handleValueChange(value: any) {
        emit('update:modelValue', { ...value })
    }

    function handleChange(val: any, prop: string) {
        emit('change', val, prop)
    }

// 重置操作
    function handleReset() {
        resetFields()
        emit('reset')
    }

// 搜索操作
    function handleSubmit() {
        emit('submit', props.modelValue)
    }

// 重置数据
    function resetFields() {
        return formRef.value?.resetFields()
    }

// 表单校验
    async function validate() {
        return await formRef.value?.validate((valid: any, fields: any) => {
            return valid
        })
    }
    return {
        formRef,validate,resetFields,handleSubmit,handleReset,handleChange,handleValueChange,appStore
    }
}