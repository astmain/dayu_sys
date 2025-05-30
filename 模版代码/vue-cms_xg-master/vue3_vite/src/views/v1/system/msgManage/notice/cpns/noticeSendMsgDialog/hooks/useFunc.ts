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
import {requestUserList} from "@/network/user/userList/index";
import {formConfig, formInit} from "../config/formConfig";
import axios from "axios";
import {inject, ref} from "vue";
import {requestSendNotice} from "@/network/system/msgManage/notify";
import {socketClient} from "@/plugins/socketClient";
import {reject} from "lodash";
import {socketEnum} from "@/utils/enum";

export const useFunc = () =>{
    const formRef = ref<InstanceType<typeof FormList>>(null)
    let formModel = ref({
        ...formInit
    })

    let dialogTitle = ref("")
    let key = ref(0)
    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    const transferData = ref<any[]>([])
    let {model,dict,i18n} = handleGetCurInstance()
    let {handleDict,dicts} = useClass()
    let client = inject<any>(socketEnum.socket);
    //初始化弹出框
    const handleOpenDialog = async (val: any):Promise<boolean> => {
        if((await handleInit()) != true)return false;
        dialogTitle.value = "发送通告"
        key.value = Math.random()
        dialogShow.value = true
        formModel.value = val?{
            ...formInit,
            title:val.title,
            content:val.content,
            noticeType:val.noticeType+"",
            sendNoticeUid:formInit.sendNoticeUid,
            noticeId:val.id}:{...formInit}
        return true;
    }
    //用户列表
    const handleUserList = async ()=>{
        return requestUserList().then((res: resInterface) => {
            let {data, code, message} = res;
            if (code != 200) {
                model.handleMsg(`${message}`, "warning")
                return false;
            }
            transferData.value = []
            let list = data.data;
            for (let i in list) {
                transferData.value.push({
                    label: list[i]["nickName"]?list[i]["nickName"]:list[i]["username"],
                    key: list[i]["id"],
                    initial:list[i]["nickName"]?list[i]["nickName"]:list[i]["username"],
                })
            }
            return true;
        }).catch((err: any) => {
            console.log(err);
            return false;
        });
    }
    //初始化数据
    const handleInit = async ():Promise<boolean>=>{
        return await axios.all([await handleUserList(),await handleDict(dict)]).then(axios.spread((res:boolean, res1:boolean)=>{
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
            if(formConfig.formItems[i]["prop"] == "noticeType"){
                formConfig.formItems[i]["options"] = dicts.sysNoticeType
            }
        }
        return true;
    }
    /**
     * 监听通知公告
     * @param res 接收者uid
     */
    const handleMsg = (res: string) => {
        client.value.handleSocketEmit("message",res)
    }
    const handleEditSubmit = async (formRef:InstanceType<typeof FormList>,emit:any)=>{
        if(!(await formRef.validate()))return
        loading.value=true;
        let form = {
            ...formModel.value,
            notifyUid:formModel.value.notifyUid+""
        }
        requestSendNotice(form).then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                loading.value=false
                return false;
            }
            loading.value = false;
            key.value = Math.random();
            dialogShow.value =false
            handleMsg(formModel.value.notifyUid + "")
            formModel.value = {...formInit}
            emit('handleCloseDialog');
            model.handleMsg(i18n.t("msg.SuccessfullySent"),"success")
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
    const handleFilterMethod = (query, item) => {
        return item.initial.toLowerCase().includes(query.toLowerCase())
    }
    return {transferData,formRef,
        handleFilterMethod,handleOpenDialog,handleResetForm,handleEditSubmit,handleCancel,dialogShow,loading,dialogTitle,key,formModel,model
    }
}
