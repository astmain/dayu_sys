//*- coding = utf-8 -*-
//@Time : 2023-03-31 1:03
//@Author : 沉默小管
//@File : index.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {handleGetCurInstance} from "@/utils/utils";
import {formConfig, formInit} from "../config/formConfig";
import axios from "axios";
import {ref} from "vue";
import {useClass} from "./useClass";
import {requestChangeNoticeStatus} from "@/network/system/msgManage/notify/index";

export const useFunc = (emit:any) =>{
    let formModel = ref<any>({
        ...formInit
    })
    let dialogTitle = ref("")
    let key = ref(0)
    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    let {model,dict,i18n} = handleGetCurInstance()
    let {handleDict,dicts} = useClass()
    //初始化弹出框
    const handleOpenDialog = async (val: any):Promise<boolean> => {
        if((await handleInit(val)) != true)return false;
        dialogTitle.value = ""
        key.value = Math.random()
        dialogShow.value = true
        formModel.value = {
            ...formInit,
            title:val.title,
            sendNoticeName:val.sendNoticeName,
            content:val.content,
            status:val.status,
            addTime:val.addTime,
            noticeType:val.noticeType+"",
            sendNoticeUid:formInit.sendNoticeUid,
            noticeId:val.id
        }
        return true;
    }
    //初始化数据
    const handleInit = async (val):Promise<boolean>=>{
        return await axios.all([await handleDict(dict)]).then(axios.spread((res:boolean)=>{
            handleDealFormData(dicts)

            if(res){
                return true;
            }else{
                return false;
            }
        }))
    }
    /**
     * 修改消息通知状态
     */
    const handleChangeNoticeStatus = async (notifyId?:number)=>{
        let form = {
            id:notifyId?notifyId:formModel.value.noticeId
        }
        await requestChangeNoticeStatus(form)
        dialogShow.value = false
        model.handleMsg(`修改状态成功`,"success")
        emit("handleCloseDialog")
        return true;
    }

    //form表单配置赋值
    const handleDealFormData = (dicts)=>{
        for(let i in formConfig.formItems){
            if(formConfig.formItems[i]["prop"] == "status"){
                formConfig.formItems[i]["options"] = dicts.sysSwitches
            }
            if(formConfig.formItems[i]["prop"] == "noticeType"){
                formConfig.formItems[i]["options"] = dicts.sysNoticeType
            }
        }
        return true;
    }

    const handleCancel = ()=>{
        dialogShow.value =false
        key.value = Math.random();
        formModel.value = {...formInit}
    }
    return {
        handleOpenDialog,handleCancel,handleChangeNoticeStatus,model,dialogShow,loading,dialogTitle,key,formModel
    }
}