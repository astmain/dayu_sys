//*- coding = utf-8 -*-
//@Time : 2023-03-30 23:59
//@Author : 沉默小管
//@File : useFunc.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import {formInit} from "../config/formConfig";
import {handleGetCurInstance} from "@/utils/utils";
import FormList from "@/components/formList";
import {requestImgSortAdd} from "@/network/pic/picSort/index";
import {resInterface} from "@/commonNetwork/index";
import {ref} from "vue";

export const useFunc = ()=>{
    let formRef = ref<InstanceType<typeof FormList>>()
    let formModel = ref({
        ...formInit
    })
    let dialogTitle = ref("")
    let key = ref(0)
    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    let {model,i18n} = handleGetCurInstance()
    const handleAddSubmit = async (formRef:InstanceType<typeof FormList>,emit:any)=>{
        if(!(await formRef.validate()))return
        loading.value=true;
        let form = {
            ...formModel.value,
        }
        requestImgSortAdd(form).then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                loading.value=false
                return false;
            }
            loading.value = false;
            key.value = Math.random();
            dialogShow.value =false
            formModel.value = {...formInit}
            emit('handleCloseDialog');
            model.handleMsg(i18n.t("msg.successfullyAdded"),"success")
        }).catch((err:any)=>{
            loading.value=false
            console.log(err);
        })

    }
    const handleResetForm = (formRef:InstanceType<typeof FormList>)=>{
        formRef.resetFields()
    }
    //初始化弹出框
    const handleOpenDialog = ()=> {
        dialogTitle.value = "添加图片分类"
        key.value = Math.random()
        dialogShow.value = true
    }
    const handleCancel = ()=>{
        dialogShow.value =false
        key.value = Math.random();
        formModel.value = {...formInit}
    }
    return {
        handleOpenDialog,handleResetForm,handleAddSubmit,handleCancel,dialogShow,loading,dialogTitle,key,formModel,formRef
    }
}