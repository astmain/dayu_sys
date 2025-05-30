/*- coding = utf-8 -*-
@Time : 2023/3/31 8:55
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {handleGetCurInstance} from "@/utils/utils";
import FormList from "@/components/formList";
import {resInterface} from "@/commonNetwork/index";
import {requestRoleAdd} from "@/network/user/userRole";
import {useClass} from "@/views/user/userRole/cpns/hooks/useClass";
import {formInit,formConfig} from "@/views/user/userRole/cpns/userRoleAddDialog/config/formConfig";
import {ref} from "vue";
import {ElTree} from "element-plus";

export const useFunc = () =>{
    let formRef = ref<InstanceType<typeof FormList>>()
    let menuRef = ref<InstanceType<typeof ElTree>>()
    let formModel = ref({
        ...formInit
    })
    let dialogTitle = ref("")
    let key = ref(0)
    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    let {model,dict,i18n} = handleGetCurInstance()
    let {handleMenuList,handleDict,dicts,menuOptions,defaultProps} = useClass(model)
    const handleCancel = ()=>{
        dialogShow.value =false
        key.value = Math.random();
        formModel.value = {...formInit}
    }

    const handleAddSubmit = async (formRef:InstanceType<typeof FormList>,emit:any)=>{
        if(!(await formRef.validate()))return
        loading.value=true;
        let form = {
            ...formModel.value,
            menuIds:formModel.value.menuIds && formModel.value.menuIds+""
        }
        await requestRoleAdd(form).then((res:resInterface)=>{
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
        dialogTitle.value = "添加角色"
        key.value = Math.random()
        dialogShow.value = true
        formModel.value = {...formInit}
        return true;
    }
    //初始化数据
    const handleInit = async ()=>{
        await handleDict(dict);
        await handleMenuList();
        await handleDealFormData(dicts)
    }

    //form表单配置赋值
    const handleDealFormData = (dicts)=>{
        for(let i in formConfig.formItems){
            if(formConfig.formItems[i]["prop"] == "status"){
                formConfig.formItems[i]["options"] = dicts.sysSwitches
            }
        }
    }

    return {
        handleOpenDialog,handleResetForm,handleAddSubmit,handleCancel,formRef,menuRef,dialogShow,loading,dialogTitle,key,formModel,model,menuOptions,defaultProps
    }
}