//*- coding = utf-8 -*-
//@Time : 2023-03-31 1:03
//@Author : 沉默小管
//@File : index.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import {formInit,formConfig} from "../config/formConfig";
import {handleGetCurInstance} from "@/utils/utils";
import FormList from "@/components/formList";
import {resInterface} from "@/commonNetwork/index";
import {useClass} from "../../hooks/useClass";
import { ref} from "vue";
import {requestNoticeAdd} from "@/network/system/msgManage/notice/index";
import G_PicListDialog from "@/components/picListDialog/index"

export const useFunc = () =>{
    const formRef = ref<InstanceType<typeof FormList>>()
    const picListDialogRef = ref<InstanceType<typeof G_PicListDialog>>()
    let formModel = ref({
        ...formInit
    })
    let dialogTitle = ref("")
    let key = ref(0)
    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    let {model,dict,i18n} = handleGetCurInstance()
    let {handleDict,dicts} = useClass()
    const handleCancel = ()=>{
        dialogShow.value =false
        key.value = Math.random();
        formModel.value = {...formInit}
    }

    const handleAddSubmit = async (formRef:InstanceType<typeof FormList>,emit:any)=>{
        if(!(await formRef.validate()))return
        loading.value=true;
        let form = {
            ...formModel.value
        }
        await requestNoticeAdd(form).then((res:resInterface)=>{
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
            console.log(err);
            loading.value = false;
        })

    }

    const handleResetForm = (formRef:InstanceType<typeof FormList>)=>{

        formRef.resetFields()
    }

    //初始化弹出框
    const handleOpenDialog = async ()=> {
        await handleInit()
        dialogTitle.value = "添加公告"
        key.value = Math.random()
        dialogShow.value = true
        formModel.value = {...formInit}
        return true;
    }
    //初始化数据
    const handleInit = async ()=>{
        await handleDict(dict);
        await handleDealFormData(dicts)
    }

    //form表单配置赋值
    const handleDealFormData = (dicts)=>{
        for(let i in formConfig.formItems){
            if(formConfig.formItems[i]["prop"] == "noticeType"){
                formConfig.formItems[i]["options"] = dicts.sysNoticeType
            }
            if(formConfig.formItems[i]["prop"] == "status"){
                formConfig.formItems[i]["options"] = dicts.sysNoticeStatus
            }
        }
    }
    return {
        handleOpenDialog,handleResetForm,handleAddSubmit,handleCancel,formRef,picListDialogRef,dialogShow,loading,dialogTitle,key,formModel,model
    }
}