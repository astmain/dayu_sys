//*- coding = utf-8 -*-
//@Time : 2023-03-30 22:20
//@Author : 沉默小管
//@File : useFunc.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import {formInit} from "../config/formConfig";
import {handleGetCurInstance} from "@/utils/utils";
import FormList from "@/components/formList";
import {requestImgAdd} from "@/network/pic/picList/index";
import {resInterface} from "@/commonNetwork/index";
import useClass from "../../hooks/useClass";
import UploadImg from "@/components/uploadImg";
import {useRoute} from "vue-router";
import {ref} from "vue";

export const useFunc = (emit:any) =>{
    let formRef = ref<InstanceType<typeof FormList>>()
    let uploadImgRef = ref<InstanceType<typeof UploadImg>>()
    let formModel = ref<any>({
        ...formInit
    })
    let dialogTitle = ref("")
    let key = ref(0)
    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    let route = useRoute()
    let picSortId = ref<any>(0);//图片分类id
    let {model,i18n} = handleGetCurInstance()
    let {handleImgSortList,imgSortArr} = useClass(model)

    const handleChangeFormModel = (val:any)=>{
        formModel.value = val;
    }
    const handleAddSubmit = async (uploadImgRef:any,formRef:any)=>{
        if(uploadImgRef.fileList[0]?.raw?.name){
            formModel.value.imgUrl = uploadImgRef.fileList[0]?.raw?.name
        }
        if(!(await formRef.validate()))return
        loading.value=true;
        let form = {
            imgName:formModel.value.imgName,
            imgUrl:formModel.value.imgUrl,
            imgSortId:formModel.value.imgSortId,
            sort:formModel.value.sort,
            file:uploadImgRef.fileList[0].raw,
        }
        console.log(form);
        requestImgAdd(form).then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                loading.value=false
                return false;
            }
            loading.value = false;
            key.value = Math.random();
            dialogShow.value =false
            emit('handleCloseDialog');
            handleResetForm(uploadImgRef,formRef)
            model.handleMsg(i18n.t("msg.successfullyAdded"),"success")
        }).catch((err:any)=>{
            loading.value=false
            console.log(err);
        })
    }
    const handleResetForm = (uploadImgRef:InstanceType<typeof UploadImg>,formRef:InstanceType<typeof FormList>)=>{
        formRef.resetFields()
        uploadImgRef.fileList.length = 0;
    }
    const handleCancel = (uploadImgRef:any)=>{
        dialogShow.value =false
        key.value = Math.random();
        formModel.value = {...formInit}
        uploadImgRef.fileList.length = 0;
    }
    //初始化弹出框
    const handleOpenDialog = async ()=> {
        await handleInit()
        dialogTitle.value = "添加图片"
        key.value = Math.random()
        dialogShow.value = true

        if(route.params && route.params.id){
            picSortId.value = route.params && route.params.id?route.params.id:0
            formModel.value={
                ...formInit,
                imgSortId:picSortId.value-0
            }
        }
        return true;
    }
    //图片分类
    const handleInit = async ()=>{
        await handleImgSortList();
    }
    return {
        handleOpenDialog,handleResetForm,handleAddSubmit,handleCancel,handleChangeFormModel,
        formRef,uploadImgRef,dialogShow,loading,dialogTitle,key,formModel,imgSortArr
    }
}
