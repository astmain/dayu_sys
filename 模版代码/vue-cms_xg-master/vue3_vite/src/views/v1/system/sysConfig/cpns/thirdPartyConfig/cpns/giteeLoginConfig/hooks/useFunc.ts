/*- coding = utf-8 -*-
@Time : 2023/4/11 10:17
@Author : CSDN 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/


import {formInit} from "@/views/system/sysConfig/cpns/thirdPartyConfig/cpns/giteeLoginConfig/config/formConfig";
import FormList from "@/components/formList";
import {requestSysConfig, requestSysConfigUpdate} from "@/network/system/sysConfig";
import {resInterface} from "@/commonNetwork/index";
import {handleGetCurInstance} from "@/utils/utils";
import {onMounted, ref} from "vue"
import G_PicListDialog from "@/components/picListDialog/index"
import {sysConfigEnum} from "@/utils/enum";

export const useFunc = ()=>{
    const formRef = ref<InstanceType<typeof FormList>>()
    const picListDialogRef = ref<InstanceType<typeof G_PicListDialog>>()
    let loading = ref(false)
    let formModel = ref({
        ...formInit
    })
    let {model,i18n,axios} = handleGetCurInstance()
    const handleSubmit = async (formRef:InstanceType<typeof FormList>)=>{
        if(!(await formRef.validate()))return
        loading.value=true;
        let form:any = {
            key:sysConfigEnum.giteeLoginConfig,
            value:JSON.stringify(formModel.value)
        }
        requestSysConfigUpdate(form).then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                loading.value=false
                return false;
            }
            loading.value = false;
            model.handleMsg(i18n.t("msg.successfullyEdited"),"success")
        }).catch((err:any)=>{
            loading.value=false
            console.log(err);
        })
    }
    const handleResetForm = (formRef:InstanceType<typeof FormList>)=>{
        formRef.resetFields()
    }
    const handleList = ()=>{
        let form:any = {
            key:sysConfigEnum.giteeLoginConfig,
        }
        return requestSysConfig(form).then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            if(data.value){
                formModel.value = JSON.parse(data.value)
            }
            return true;
        }).catch((err: any)=>{
            console.log(err);
        })
    }
    onMounted(()=>{
        loading.value = true;
        axios.all([handleList()]).then(axios.spread((res:boolean)=>{
            if(res){
                loading.value = false
            }else{
                loading.value = false;
            }
        }))
    })
    return {
        handleSubmit,handleResetForm,
        loading,formModel,formRef,picListDialogRef
    }
}
