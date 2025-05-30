//*- coding = utf-8 -*-
//@Time : 2023-03-31 1:03
//@Author : 沉默小管
//@File : index.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {handleGetCurInstance} from "@/utils/utils";
import {resInterface} from "@/commonNetwork/index";
import FormList from "@/components/formList";
import {useClass} from "../../hooks/useClass";
import {requestUserUpdate} from "@/network/user/userList/index";
import {formConfig, formInit} from "../config/formConfig";
import {ImgURLStorage} from "@/commonNetwork/request";
import axios from "axios";
import {ref} from "vue";
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
    let {handleRoleList,handleDict,dicts,roleOptions} = useClass()
    //初始化弹出框
    const handleOpenDialog = async (val: any):Promise<boolean> => {
        if((await handleInit()) != true)return false;
        dialogTitle.value = "修改用户"
        key.value = Math.random()
        dialogShow.value = true
        formModel.value = {...val, picUrl: val.picUrl,status:val.status+"",sex:val.sex+"",
            headImg:val["headImg"]?ImgURLStorage+val["headImg"]:""}
        return true;
    }
    //初始化数据
    const handleInit = async ():Promise<boolean>=>{
        return await axios.all([await handleRoleList(model),await handleDict(dict)]).then(axios.spread((res:boolean, res1:boolean)=>{
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
            if(formConfig.formItems[i]["prop"] == "sex"){
                formConfig.formItems[i]["options"] = dicts.sysSex
            }
            if(formConfig.formItems[i]["prop"] == "status"){
                formConfig.formItems[i]["options"] = dicts.sysSwitches
            }
        }
        return true;
    }

    const handleEditSubmit = async (formRef:InstanceType<typeof FormList>,emit:any)=>{
        if(!(await formRef.validate()))return
        loading.value=true;
        let form = {
            ...formModel.value
        }
        requestUserUpdate(form).then((res:resInterface)=>{
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
    return {
        handleOpenDialog,handleResetForm,handleEditSubmit,handleCancel,picListDialogRef,formRef,dialogShow,loading,dialogTitle,key,formModel,model,roleOptions
    }
}