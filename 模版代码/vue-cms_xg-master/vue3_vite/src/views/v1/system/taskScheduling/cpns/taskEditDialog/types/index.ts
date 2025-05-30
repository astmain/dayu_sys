//*- coding = utf-8 -*-
//@Time : 2024-05-20 20:54
//@Author : 管茂良
//@File : index.js
//@web  : www.php-china.com
//@Software: WebStorm

import FormList from "@/components/formList";

export interface exposeInterface{
    handleResetForm:(formRef:InstanceType<typeof FormList>)=>void
    handleOpenDialog:(val: any)=>Promise<boolean>
}