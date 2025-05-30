/*- coding = utf-8 -*-
@Time : 2023/4/11 10:27
@Author : CSDN 沉默小管
@File : formConfig.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/


import {formInterface} from "@/components/formList/types";
import {useStore} from "@/store/piniaAutoImport";

let settingStore = useStore("useSetting")
let formConfig: formInterface = {
    size:settingStore.sysSize,
    inline:false,
    isHiddenBtn:true,
    labelWidth: '',
    labelPosition: 'top',
    formItems: [
        {
            type: 'input',
            prop: 'cid',
            label: 'GITEE客户端cid',
            placeholder: '请输入GITEE客户端cid',
            clearable: true,
            width:"250px",
        },
        {
            type: 'input',
            prop: 'secret',
            label: 'GITEE客户端secret',
            placeholder: '请输入GITEE客户端secret',
            clearable: true,
            width:"250px",
        },
        {
            type: 'input',
            prop: 'redirectUrl',
            label: '重定向URL',
            placeholder: '请输入重定向URL',
            clearable: true,
            width:"250px",
        }
    ],

};
let formInit = {
    cid: '',
    secret: '',
    redirectUrl: '',
}

export {
    formInit,formConfig
}
