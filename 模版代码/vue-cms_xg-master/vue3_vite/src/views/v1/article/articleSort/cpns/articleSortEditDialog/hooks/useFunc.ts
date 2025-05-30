/*- coding = utf-8 -*-
@Time : 2023/3/30 17:54
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {handleGetCurInstance} from "@/utils/utils";
import FormList from "@/components/formList";
import {resInterface} from "@/commonNetwork/index";
import {requestArtSortUpdate} from "@/network/article/articleSort";
import {formInit} from "@/views/article/articleSort/cpns/articleSortEditDialog/config/formConfig";
import {ref} from "vue";

export const useFunc = () =>{
    let formRef = ref<InstanceType<typeof FormList>>()
    let formModel = ref({
        ...formInit
    })
    let dialogTitle = ref("")
    let key = ref(0)
    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    let {model,i18n} = handleGetCurInstance()
    const handleEditSubmit = async (formRef:InstanceType<typeof FormList>,emit:any)=>{
        if(!(await formRef.validate()))return
        loading.value=true;
        let form = {
            ...formModel.value,
        }
        requestArtSortUpdate(form).then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                loading.value=false;
                return false;
            }
            loading.value = false;
            key.value = Math.random();
            dialogShow.value =false
            formModel.value = {...formInit}
            emit('handleCloseDialog');
            model.handleMsg(i18n.t("msg.successfullyEdited"),"success")
        }).catch((err:any)=>{
            loading.value=false
            console.log(err);
        })
    }
    //表单重置
    const handleResetForm = (formRef:InstanceType<typeof FormList>)=>{
        formRef.resetFields()
    }
    //取消
    const handleCancel = ()=>{
        dialogShow.value =false
        key.value = Math.random();
        formModel.value = {...formInit}
    }
    //初始化弹出框
    const handleOpenDialog = (val:any)=> {
        dialogTitle.value = "编辑文章类型"
        key.value = Math.random()
        dialogShow.value = true
        formModel.value = {...val}
    }
    return {
        handleOpenDialog,handleResetForm,handleEditSubmit,handleCancel,dialogShow,loading,dialogTitle,key,formModel,formRef
    }
}