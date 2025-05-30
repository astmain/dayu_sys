//*- coding = utf-8 -*-
//@Time : 2024-04-29 2:48
//@Author : 管茂良
//@File : index.js
//@web  : www.php-china.com
//@Software: WebStorm
import FormList from "@/components/formList";

export interface propsInterface{
    alignCenter?:boolean//弹出框是否垂直居中
}

export interface exposeInterface{
    handleResetForm:(formRef:InstanceType<typeof FormList>)=>void
    handleOpenDialog:(val: any)=>void
}