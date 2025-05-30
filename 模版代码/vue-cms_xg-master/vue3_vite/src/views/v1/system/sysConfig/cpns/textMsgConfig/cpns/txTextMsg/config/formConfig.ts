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
            prop: 'appid',
            label: '腾讯云appid：',
            placeholder: '请输入腾讯云appid',
            clearable: true,
            width:"250px",
        },
        {
            type: 'input',
            prop: 'appkey',
            label: '腾讯云appkey：',
            placeholder: '请输入腾讯云appkey',
            clearable: true,
            width:"250px",
        },
        {
            type: 'input',
            prop: 'smsSign',
            label: '腾讯云短信签名：',
            placeholder: '请输入腾讯云短信签名',
            clearable: true,
            width:"250px",
        },
    ],

};
let formInit = {
    appid: '',
    appkey: '',
    smsSign: '',
}

export {
    formInit,formConfig
}
