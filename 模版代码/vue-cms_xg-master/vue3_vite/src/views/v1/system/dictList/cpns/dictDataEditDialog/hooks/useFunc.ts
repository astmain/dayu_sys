//*- coding = utf-8 -*-
//@Time : 2023-04-01 22:40
//@Author : 沉默小管
//@File : useFunc.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {handleGetCurInstance} from "@/utils/utils";
import FormList from "@/components/formList";
import {resInterface} from "@/commonNetwork/index";
import {formConfig, formInit} from "../config/formConfig"
import {useClass} from "../../hooks/useClass";
import {requestDictDetail} from "@/network/system/dictList/index";
import {requestDictDataUpdate} from "@/network/system/dictList/data";
import axios from "axios";
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
    let {model,dict,i18n} = handleGetCurInstance()
    let {handleDict,dicts} = useClass()
    const handleEditSubmit = async (formRef:InstanceType<typeof FormList>,emit:any)=>{
        if(!(await formRef.validate()))return
        loading.value=true;
        let form = {
            ...formModel.value,
        }
        requestDictDataUpdate(form).then((res:resInterface)=>{
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
    const handleOpenDialog = async (curDictId:any,val:any):Promise<boolean> => {
        if((await handleInit(curDictId)) != true)return false;
        dialogTitle.value = "修改字典数据"
        key.value = Math.random()
        dialogShow.value = true
        formModel.value = {...formModel.value,...val,status:val.status+""}

        return true
    }
    //初始化数据
    const handleInit = async (curDictId:any):Promise<boolean>=>{
        return await axios.all([await handleGetDetail(curDictId),await handleDict(dict)]).then(axios.spread((res:boolean,res1:boolean)=>{
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
    const handleGetDetail = async (id:number|string)=>{
        return await requestDictDetail({id}).then((res:any) => {
            let {code,data,msg} = res;
            if(code == 200){
                formModel.value = {
                    ...formModel.value,
                    dictId:data.data.id,
                    dictName:data.data.dictType
                }
                return true;
            }
            return false;
        });
    }
    return {
        handleOpenDialog,handleResetForm,handleEditSubmit,handleCancel,dialogShow,loading,dialogTitle,key,formModel,formRef
    }
}