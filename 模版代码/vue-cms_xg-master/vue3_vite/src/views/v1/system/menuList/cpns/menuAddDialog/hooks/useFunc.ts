/*- coding = utf-8 -*-
@Time : 2023/3/31 16:50
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {handleGetCurInstance} from "@/utils/utils";
import FormList from "@/components/formList";
import {resInterface} from "@/commonNetwork/index";
import {formConfig, formInit} from "../config/formConfig"
import {requestMenuAdd} from "@/network/system/menuList";
import {useClass} from "@/views/system/menuList/cpns/hooks/useClass";
import {tableConfig} from "../../../config/tableConfig";
import {ref} from "vue";
import {ElPopover} from "element-plus";

export const useFunc = () =>{
    let formRef = ref<InstanceType<typeof FormList>>()
    const buttonRef = ref<HTMLInputElement|null>()
    const popoverRef = ref<InstanceType<typeof ElPopover>>()
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
    const handleAddSubmit = async (formRef:InstanceType<typeof FormList>,emit:any)=>{
        if(!(await formRef.validate()))return
        loading.value=true;
        let form = {
            ...formModel.value,
        }
        requestMenuAdd(form).then((res:resInterface)=>{
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
    const handleCancel = ()=>{
        dialogShow.value =false
        key.value = Math.random();
        formModel.value = {...formInit}
    }
    //初始化弹出框
    const handleOpenDialog = async (val:any):Promise<boolean> => {
        await handleInit()
        dialogTitle.value = "添加菜单"
        key.value = Math.random()
        dialogShow.value = true
        if(val){
            formModel.value = {...val}
        }else{
            formModel.value.menuType = "1"
        }
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
        handleOpenDialog,handleResetForm,handleAddSubmit,handleCancel,formRef,popoverRef,buttonRef,menuOptions,dialogShow,loading,dialogTitle,key,formModel
    }
}