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
            prop: 'winLocalstorage',
            label: 'WINDOWS存储位置：',
            placeholder: '请输入WINDOWS存储位置',
            clearable: true,
            width:"250px",
        },
        {
            type: 'input',
            prop: 'linuxLocalstorage',
            label: 'LINUX存储位置：',
            placeholder: '请输入LINUX存储位置',
            clearable: true,
            width:"250px",
        },
    ],

};
let formInit = {
    winLocalstorage: '',
    linuxLocalstorage: '',
}

export {
    formInit,formConfig
}
