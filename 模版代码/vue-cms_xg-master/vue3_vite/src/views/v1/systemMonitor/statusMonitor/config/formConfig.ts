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
    isHiddenBtn:true,
    labelPosition: 'top',
    formItems: [
        {
            type: 'input',
            prop: 'cacheName',
            label: '缓存名称:',
            placeholder: '请输入文缓存名称',
            clearable: true,
            width:"100%"
        },
        {
            type: 'input',
            prop: 'cacheKeys',
            label: '缓存键名:',
            placeholder: '请输入缓存键名',
            clearable: true,
            width:"100%"
        },
        {
            type: 'input',
            prop: 'cacheContent',
            label: '缓存内容:',
            placeholder: '请输入缓存内容',
            clearable: true,
            width:"100%",
            otherOptions:{
                type:"textarea",
                autosize:{ minRows:5, maxRows: 10 }
            }
        }
    ],

};
let formInit = {
    cacheName: '',
    cacheKeys: '',
    cacheContent: '',
}

export {
    formInit,formConfig
}
