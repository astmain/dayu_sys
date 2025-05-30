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
            type: 'slot',
            prop: 'dictId',
            label: '字典名称',
            placeholder: '请选择字典名称',
            clearable: true,
            options:[]
        },{
            type: 'select',
            prop: 'status',
            label: '字典状态',
            placeholder: '请选择字典状态',
            clearable: true,
            options:[]
        }
    ],

};
let formInit = {
    dictId: "",
    status: "",
}

export {
    formInit,formConfig
}