//*- coding = utf-8 -*-
//@Time : 2023-02-24 22:59
//@Author : CSDN 沉默小管
//@File : formConfig.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm


import {formInterface} from "@/components/formList/types/index";
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
            prop: 'title',
            label: '公告标题',
            placeholder: '请输入公告标题',
            clearable: true,
        }
    ],

};
let formInit = {
    title: '',
}
export {
    formInit,formConfig
}