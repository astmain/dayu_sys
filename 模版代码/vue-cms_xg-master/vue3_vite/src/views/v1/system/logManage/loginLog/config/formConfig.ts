//*- coding = utf-8 -*-
//@Time : 2023-02-24 22:59
//@Author : CSDN 沉默小管
//@File : formConfig.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import {formInterface} from "@/components/formList/types";
import {useStore} from "@/store/piniaAutoImport";

let settingStore = useStore("useSetting")
let formConfig: formInterface = {
    size:settingStore.sysSize,
    labelWidth: '',
    inline:true,
    labelPosition: 'right',
    formItems: [
        {
            type: 'input',
            prop: 'username',
            label: '用户名称',
            placeholder: '请输入用户名称',
            clearable: true,
        },{
            type: 'select',
            prop: 'status',
            label: '登录状态',
            placeholder: '请输入登录状态',
            clearable: true,
            options:[]
        },{
            width:"250px",
            type: 'datePicker',
            dataPickType: 'daterange',
            prop: 'createTime',
            clearable: true,
        },
    ],

};
let formInit = {
    username: '',
    status: "",
    startTime: "",
    endTime: "",
}

export {
    formInit,formConfig
}