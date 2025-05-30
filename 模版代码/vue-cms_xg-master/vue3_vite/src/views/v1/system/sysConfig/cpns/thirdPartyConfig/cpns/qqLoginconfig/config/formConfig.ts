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
            prop: 'appId',
            label: 'qq客户端appId',
            placeholder: '请输入qq客户端appId',
            clearable: true,
            width:"250px",
        },
        {
            type: 'input',
            prop: 'appKey',
            label: 'qq客户端appKey',
            placeholder: '请输入qq客户端appKey',
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
    appId: '',
    appKey: '',
    redirectUrl: '',
}

export {
    formInit,formConfig
}
