/*- coding = utf-8 -*-
@Time : 2023/4/11 10:17
@Author : CSDN 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/


import FormList from "@/components/formList";
import {resInterface} from "@/commonNetwork/index";
import {handleGetCurInstance} from "@/utils/utils";
import {formConfig, formInit} from "@/views/common/personalCenter/cpns/baseInfo/config/formConfig";
import {useClass} from "@/views/common/personalCenter/cpns/baseInfo/hooks/useClass";
import {requestPersonalInfoUpdate, requestUserInfoDetail} from "@/network/common/personalCenter";
import {ImgURLStorage} from "@/commonNetwork/request";
import {defineAsyncComponent, onMounted, ref} from "vue"
import {useStore} from "@/store/piniaAutoImport";
const G_PicListDialog = defineAsyncComponent(()=>import("@/components/picListDialog/index"))

export const useFunc = ()=>{
    const formRef = ref<InstanceType<typeof FormList>>()
    const picListDialogRef = ref<InstanceType<typeof G_PicListDialog>>()
    let loading = ref(false)
    let formModel = ref({
        ...formInit
    })
    let authLoginDialogRef = ref()
    let userStore:any = useStore("useUser")
    let {handleRoleList,handleDict,dicts,roleOptions} = useClass()
    let {model,i18n,axios,dict} = handleGetCurInstance()
    const handleSubmit = async (formRef:InstanceType<typeof FormList>)=>{
        if(!(await formRef.validate()))return
        loading.value=true;
        let form:any = {
            ...formModel.value
        }
        requestPersonalInfoUpdate(form).then((res:resInterface)=>{
            console.log(res,"resresresresres");
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
            uid:userStore.userInfo.id,
        }
        return requestUserInfoDetail(form).then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            formModel.value = {
                ...data,
                password:data.originalPwd,
                sex:data.sex+"",
                headImg:data["headImg"]?ImgURLStorage+data["headImg"]:""
            }
            // formModel.value = data.data
            return true;
        }).catch((err: any)=>{
            console.log(err);
        })
    }
    //初始化页面数据
    const handleInit = async ()=>{
        await handleRoleList(model);
        await handleDict(dict);
        await handleDealFormData(dicts)
        return true;
    }
    //form表单配置赋值
    const handleDealFormData = (dicts)=>{
        for(let i in formConfig.formItems){
            if(formConfig.formItems[i]["prop"] == "sex"){
                formConfig.formItems[i]["options"] = dicts.sysSex
            }
            if(formConfig.formItems[i]["prop"] == "status"){
                formConfig.formItems[i]["options"] = dicts.sysSwitches
            }
        }
    }
    //绑定/解绑
    const handleBindOrUnbind = ()=>{
        authLoginDialogRef.value.handleOpenDialog()
    }
    onMounted(()=>{
        loading.value = true;
        axios.all([handleList(),handleInit()]).then(axios.spread((res:boolean,res1:boolean)=>{
            if(res && res1){
                loading.value = false
            }else{
                loading.value = false;
            }
        }))
    })
    return {
        handleSubmit,handleResetForm,handleBindOrUnbind,
        loading,formModel,roleOptions,formRef,picListDialogRef,authLoginDialogRef,userStore
    }
}
