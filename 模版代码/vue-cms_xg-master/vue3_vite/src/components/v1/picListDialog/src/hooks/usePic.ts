/*- coding = utf-8 -*-
@Time : 2023/3/30 17:22
@Author : 沉默小管
@File : usePic.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import G_PicListDialog, {choosePicDataInterface} from "@/components/picListDialog"
import {ref} from "vue";

export const usePic = (formModel,formModelKey:Array<string>)=>{
    let picListDialogRef = ref<InstanceType<typeof G_PicListDialog>>()
    //显示图片列表弹出框
    const handleShowPicListDialog = (picListDialogRef:InstanceType<typeof G_PicListDialog>,picId?:string|number)=>{
        picListDialogRef.handleOpenDialog(picId?picId:"")
    }
    const handleGetPicId = (val:choosePicDataInterface)=>{
        formModel.value[formModelKey[0]] = val.id;
        formModel.value[formModelKey[1]] = val.picUrl;
    }
    return {
        handleShowPicListDialog,handleGetPicId,picListDialogRef
    }
}