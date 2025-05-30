/*- coding = utf-8 -*-
@Time : 2023/4/1 16:32
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {handleGetCurInstance} from "@/utils/utils";
import FormList from "@/components/formList";
import {resInterface} from "@/commonNetwork/index";
import {formConfig, formInit} from "../config/formConfig"
import {requestMenuUpdate} from "@/network/system/menuList";
import {useClass} from "@/views/system/menuList/cpns/hooks/useClass";
import {tableConfig} from "../../../config/tableConfig";
import {ref} from "vue";
import {ElPopover} from "element-plus";

export const useFunc = () =>{
    let formRef = ref<InstanceType<typeof FormList>>()
    const popoverRef = ref<InstanceType<typeof ElPopover>>()
    const buttonRef = ref<HTMLInputElement|null>(null)
    let formModel = ref({
        ...formInit
    })
    let dialogTitle = ref("")
    let key = ref(0)
    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    let menuOptions = ref([{
        id:0,
        menuName:"主类目",
        children:tableConfig.tableData
    }])
    let {model,dict,i18n} = handleGetCurInstance()
    let {handleDict,dicts} = useClass()
    const handleEditSubmit = async (formRef:InstanceType<typeof FormList>,emit:any)=>{
        if(!(await formRef.validate()))return
        loading.value=true;
        let form = {
            ...formModel.value,
        }
        requestMenuUpdate(form).then((res:resInterface)=>{
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
            model.handleMsg(i18n.t("msg.successfullyEdited"),"success")
        }).catch((err:any)=>{
            loading.value=false
            console.log(err);
        })
    }
    const handleResetForm = (formRef:InstanceType<typeof FormList>)=>{
        formRef.resetFields()
    }
    const handleCancel = ()=>{
        dialogShow.value =false
        key.value = Math.random();
        formModel.value = {...formInit}
    }
    //初始化弹出框
    const handleOpenDialog = async (val:any):Promise<boolean> => {
        await handleInit()
        dialogTitle.value = "编辑菜单"
        key.value = Math.random()
        dialogShow.value = true
        formModel.value = {...val}
        return true
    }
    //初始化数据
    const handleInit = async ()=>{
        await handleDict(dict);
        await handleDealFormData(dicts)
    }

    //form表单配置赋值
    const handleDealFormData = (dicts)=>{
        for(let i in formConfig.formItems){
            if(formConfig.formItems[i]["prop"] == "visible"){
                formConfig.formItems[i]["options"] = dicts.sysShowStatus
            }
            if(formConfig.formItems[i]["prop"] == "status"){
                formConfig.formItems[i]["options"] = dicts.sysSwitches
            }
        }
    }

    return {
        formRef,popoverRef,buttonRef,
        handleOpenDialog,handleResetForm,handleEditSubmit,handleCancel,menuOptions,dialogShow,loading,dialogTitle,key,formModel
    }
}