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
            prop: 'fromEmail',
            label: '发送方邮箱',
            placeholder: '请输入你的邮箱',
            clearable: true,
            width:"250px",
            otherOptions:{
                type: 'email',
            },
        },
        {
            type: 'input',
            prop: 'smtp',
            label: 'smtp验证码',
            placeholder: '请输入你邮箱的smtp验证码',
            clearable: true,
            width:"250px",
            formItemOtherOptions:{
                style:"width:100%"
            }
        },

    ],
    rules:{
        fromEmail: [
            {
                type: "email",
                message: "请输入正确的邮箱地址",
                trigger: ["blur", "change"]
            }
        ],
    }
};
let formInit = {
    fromEmail: '',
    smtp: '',
}

export {
    formInit,formConfig
}
