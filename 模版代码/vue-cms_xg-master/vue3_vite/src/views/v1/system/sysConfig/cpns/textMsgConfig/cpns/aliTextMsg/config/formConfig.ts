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
            prop: 'id',
            label: '阿里云密钥ID：',
            placeholder: '请输入阿里云密钥ID',
            clearable: true,
            width:"250px",
        },
        {
            type: 'input',
            prop: 'secret',
            label: '阿里云密钥SECRET：',
            placeholder: '请输入阿里云密钥SECRET',
            clearable: true,
            width:"250px",
        },
        {
            type: 'input',
            prop: 'signName',
            label: '阿里云签名名称：',
            placeholder: '请输入阿里云签名名称',
            clearable: true,
            width:"250px",
        },
    ],

};
let formInit = {
    id: '',
    secret: '',
    signName: '',
}

export {
    formInit,formConfig
}
