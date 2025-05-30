//*- coding = utf-8 -*-
//@Time : 2023-03-30 22:20
//@Author : 沉默小管
//@File : useFunc.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import {handleGetCurInstance} from "@/utils/utils";
import FormList from "@/components/formList";
import {requestImgUpdate} from "@/network/pic/picList/index";
import {resInterface} from "@/commonNetwork/index";
import useClass from "../../hooks/useClass";
import {formInit} from "@/views/pic/picList/cpns/picEditDialog/config/formConfig";
import UploadImg from "@/components/uploadImg";
import axios from "axios";
import {nextTick, ref, watch} from "vue";

/**
 *
 * @param emit
 */
export const useFunc = (emit) =>{
    let formRef = ref<InstanceType<typeof FormList>>()
    let uploadImgRef = ref<InstanceType<typeof UploadImg>>()
    let formModel = ref({
        ...formInit
    })
    let dialogTitle = ref("")
    let key = ref(0)
    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    let {model,i18n} = handleGetCurInstance()
    let {handleImgSortList,imgSortArr} = useClass(model)
    const handleEditSubmit = async (uploadImgRef:InstanceType<typeof UploadImg>,formRef:InstanceType<typeof FormList>)=>{
        if(uploadImgRef.isUpload){
            formModel.value.imgUrl = uploadImgRef.fileList[0]?.raw?.name
        }
        if(!(await formRef.validate()))return
        loading.value=true;
        let form:any = {
            id:formModel.value.id,
            imgName:formModel.value.imgName,
            imgSortId:formModel.value.imgSortId,
            sort:formModel.value.sort,
            isUpload:uploadImgRef.isUpload?1:2,
        }
        if(uploadImgRef.isUpload){
            form.file = uploadImgRef.fileList[0].raw
        }
        requestImgUpdate(form).then((res:resInterface)=>{
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
            model.handleMsg(i18n.t("msg.successfullyEdited"),"success")
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
    const handleOpenDialog = async (val:any)=> {
        if((await handleInit()) != true)return false;
        dialogTitle.value = "编辑图片"
        key.value = Math.random()
        dialogShow.value = true
        formModel.value = {...val}

        return true;
    }
    watch(()=>formModel.value,(value:any)=>{
        nextTick(() => {
            if(uploadImgRef.value?.fileList[0]?.url != formModel.value?.imgMidUrl){
                uploadImgRef.value.fileList.length = 0;
                uploadImgRef.value.fileList.push({
                    name: value.imgName,
                    url: value.imgMidUrl,
                })
            }
        }).then(r =>r)
    })
    const  handleChangeFormModel = (val:any)=>{
        formModel.value = val;
    }
    //图片分类
    const handleInit = async ():Promise<boolean>=>{
        return await axios.all([await handleImgSortList()]).then(axios.spread((res:boolean)=>{
            if(res){
                return true;
            }else{
                return false;
            }
        }))
    }
    return {
        handleOpenDialog,handleResetForm,handleEditSubmit,handleCancel,handleChangeFormModel,
        formRef,uploadImgRef,dialogShow,loading,dialogTitle,key,formModel,imgSortArr
    }
}