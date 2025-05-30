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
            label: '七牛云密钥ID：',
            placeholder: '请输入七牛云密钥ID',
            clearable: true,
            width:"250px",
        },
        {
            type: 'input',
            prop: 'secret',
            label: '七牛云密钥SECRET：',
            placeholder: '请输入七牛云密钥SECRET',
            clearable: true,
            width:"250px",
        },
        {
            type: 'input',
            prop: 'storageBucket',
            label: '七牛云储存桶：',
            placeholder: '请输入七牛云储存桶',
            clearable: true,
            width:"250px",
        },
    ],

};
let formInit = {
    id: '',
    secret: '',
    storageBucket: '',
}

export {
    formInit,formConfig
}
