/*- coding = utf-8 -*-
@Time : 2023/2/10 11:55
@Author : 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import FormList from "@/components/formList";

export interface propsInterface{
    alignCenter?:boolean//弹出框是否垂直居中
}

export interface exposeInterface{
    handleResetForm:(formRef:InstanceType<typeof FormList>)=>void
    handleOpenDialog:(val: any)=>void
}