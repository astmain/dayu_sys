/*- coding = utf-8 -*-
@Time : 2023/3/30 14:49
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {formConfig, formInit} from "@/views/article/articleList/cpns/artAddDialog/config/formConfig";
import {handleGetCurInstance} from "@/utils/utils";
import {useClass} from "@/views/article/articleList/cpns/hooks/useClass";
import FormList from "@/components/formList";
import {requestArtAdd,requestArtContentImgUpload} from "@/network/article/articleList";
import {resInterface} from "@/commonNetwork/index";
import {defineAsyncComponent, reactive, ref} from "vue";
const G_PicListDialog = defineAsyncComponent(()=>import("@/components/picListDialog/index"))

export const useFunc = () =>{
    let dialogFullscreen = ref(false)
    let formRef = ref<InstanceType<typeof FormList>>()
    let picListDialogRef = ref<InstanceType<typeof G_PicListDialog>>()
    let formModel = ref<any>({
        ...formInit
    })
    interface artContentImgUploadArrInterface{
        id:number|string
        imgUrl:string
    }
    let artContentImgUploadArr = reactive<artContentImgUploadArrInterface[]>([]);//文章内容图片上传
    let dialogTitle = ref("")
    let key = ref(0)
    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    let {model,dict,i18n} = handleGetCurInstance()
    let {handleArtSort,handleArtColumn,handleDict,optionsArtSort,optionsArtColumn,dicts} = useClass()
    //初始化弹出框
    const handleOpenDialog = async (val: any):Promise<boolean> => {
        await handleInit()
        dialogTitle.value = "添加文章"
        key.value = Math.random()
        dialogShow.value = true
        formModel.value = {...formInit}
        return true;
    }
    //初始化数据
    const handleInit = async ()=>{
        await handleArtSort(model);
        await handleArtColumn(model);
        await handleDict(dict);
        handleDealFormData(optionsArtSort.value,optionsArtColumn.value,dicts)
    }

    //form表单配置赋值
    const handleDealFormData = (optionsArtSort,optionsArtColumn,dicts)=>{
        for(let i in formConfig.formItems){
            if(formConfig.formItems[i]["prop"] == "status"){
                formConfig.formItems[i]["options"] = dicts.sysSwitches
            }
            if(formConfig.formItems[i]["prop"] == "artColumnId"){
                formConfig.formItems[i]["options"] = optionsArtColumn
            }
            if(formConfig.formItems[i]["prop"] == "artSortId"){
                formConfig.formItems[i]["options"] = optionsArtSort
            }
        }
    }
    const handleAddSubmit = async (formRef:InstanceType<typeof FormList>,emit:any)=>{
        if(!(await formRef.validate()))return
        loading.value=true;
        if(artContentImgUploadArr.length>0){
            let artContentIdArr:any[] = []
            for(let i in artContentImgUploadArr){
                if(formModel.value.artContent?.indexOf(artContentImgUploadArr[i]["imgUrl"])>0){
                    artContentIdArr.push(artContentImgUploadArr[i]["id"])
                }
            }
            formModel.value.artContentId = artContentIdArr.toString()
        }
        let form = {
            ...formModel.value
        }
        requestArtAdd(form).then((res:resInterface)=>{
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
    return {
        handleOpenDialog,handleResetForm,handleAddSubmit,handleCancel,dialogFullscreen,formRef,picListDialogRef,model,dialogShow,loading,dialogTitle,key,formModel,artContentImgUploadArr
    }
}
