/*- coding = utf-8 -*-
@Time : 2023/3/31 8:55
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {handleGetCurInstance} from "@/utils/utils";
import {useClass} from "@/views/user/userRole/cpns/hooks/useClass";
import FormList from "@/components/formList";
import {requestRoleUpdate} from "@/network/user/userRole";
import {resInterface} from "@/commonNetwork/index";
import {formInit,formConfig} from "@/views/user/userRole/cpns/userRoleEditDialog/config/formConfig";
import axios from "axios";
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

    const handleEditSubmit = async (formRef:InstanceType<typeof FormList>,emit:any)=>{
        if(!(await formRef.validate()))return
        loading.value=true;
        let form = {
            ...formModel.value,
            menuIds:formModel.value.menuIds && formModel.value.menuIds+""
        }
        await requestRoleUpdate(form).then((res:resInterface)=>{
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
            console.log(err);
            loading.value = false;
        })

    }

    const handleResetForm = (formRef:InstanceType<typeof FormList>)=>{
        formRef.resetFields()
    }

    //初始化弹出框
    const handleOpenDialog = async (val:any)=> {
        if((await handleInit()) != true)return false;
        dialogTitle.value = "编辑角色"
        key.value = Math.random()
        dialogShow.value = true
        formModel.value = {...val,status:val.status+""}
        formModel.value.menuIds = (val.menuIds && val.menuIds.split(","))??[]
        return true;
    }
    //初始化数据
    const handleInit = async ():Promise<boolean>=>{
        return await axios.all([await handleDict(dict),await handleMenuList()]).then(axios.spread((res:boolean, res1:boolean)=>{
            handleDealFormData(dicts)
            if(res && res1){
                return true;
            }else{
                return false;
            }
        }))
    }

    //form表单配置赋值
    const handleDealFormData = (dicts)=>{
        for(let i in formConfig.formItems){
            if(formConfig.formItems[i]["prop"] == "status"){
                formConfig.formItems[i]["options"] = dicts.sysSwitches
            }
        }
        return true;
    }
    return {
        handleOpenDialog,handleResetForm,handleEditSubmit,handleCancel,formRef,menuRef,dialogShow,loading,dialogTitle,key,formModel,model,menuOptions,defaultProps
    }
}