//*- coding = utf-8 -*-
//@Time : 2023-03-30 22:47
//@Author : CSDN 沉默小管
//@File : useFunc.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import {UploadFile, UploadProps, UploadUserFile} from "element-plus";
import {handleGetCurInstance} from "@/utils/utils";
import {ref} from "vue"

export const useUpload = (uploadImgLimit:number,emit:any)=>{
    let {model} = handleGetCurInstance()
    let fileList = ref<UploadUserFile[]>([])
    let dialogImageUrl = ref('')
    let dialogVisible = ref(false)
    let disabled = ref(false)
    let isUpload = ref(false);//是否上传


    // 格式大小的限制
    const handleBeforeUpload = (file) => {
        let isJPG = false;
        isUpload.value = false;
        let fileType = file.name.split('.')[1];
        if(fileType === "jpeg" || fileType === "png" || fileType === "jpg") {
            isJPG = true;
        } else {
            isJPG = false;
        }
        if(!isJPG){
            model.handleMsg(`上传图片格式不正确`,"warning")
            fileList.value.length = 0
            return;
        }
        const isLt2M = file.size / 1024 / 1024;
        if (fileType != 'image' || isLt2M > 2) {
            model.handleMsg(`请上传2M以内的图片文件`,"warning")
            fileList.value.length = 0
            return false
        }
        isUpload.value = true;
        return true;
    };

    //点击上传
    const handleClickUpload = ()=>{
        if(fileList.value.length>=uploadImgLimit){
            model.handleMsg(`图片只能上传${uploadImgLimit}张`,"warning")
        }
    }
    //判断格式大小是否符合上传条件
    const handleDetermineFormatSize = (name:string|any,size:number|any):boolean=>{
        let isJPG = false;
        isUpload.value = false;
        let fileType = name.split('.')[1];
        if(fileType === "jpeg" || fileType === "png" || fileType === "jpg") {
            isJPG = true;
        } else {
            isJPG = false;
        }
        if(!isJPG){
            model.handleMsg(`上传图片格式不正确`,"warning")
            fileList.value.length = 0
            return false;
        }
        const isLt2M = size / 1024 / 1024;
        if (isLt2M > 2) {
            model.handleMsg(`请上传2M以内的图片文件`,"warning")
            fileList.value.length = 0
            return false
        }
        isUpload.value = true;
        return true
    }

    //上传文件之前的钩子
    const handleChangeUpload: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
        if(handleDetermineFormatSize(uploadFile?.name,uploadFile?.raw?.size)==true){
            fileList.value.push({
                ...uploadFile
            })
        }
    }
    //删除图片列表
    const handleRemove = (file: UploadFile,formModel:any) => {
        for(let i in fileList.value){
            if(fileList.value[i]["uid"]==file.uid){
                fileList.value.splice(i,1)
                break;
            }
        }
        formModel.imgUrl = ""
        emit("handleChangeFormModel",formModel)
    }
    //查看大图片
    const handlePictureCardPreview = (file: UploadFile,even) => {
        //阻止冒泡事件
        even.stopPropagation()
        dialogImageUrl.value = file.url!
        dialogVisible.value = true
    }

    //下载图片
    const handleDownload = (file: UploadFile,even) => {
        //阻止冒泡事件
        even.stopPropagation()
        window.open(file.url);
    }
    return {
        handleBeforeUpload,handleClickUpload,handleChangeUpload,handleRemove,handlePictureCardPreview,handleDownload,
        dialogImageUrl,dialogVisible,disabled,fileList,isUpload
    }
}