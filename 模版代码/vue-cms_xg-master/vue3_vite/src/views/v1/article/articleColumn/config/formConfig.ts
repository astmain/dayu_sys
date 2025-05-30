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
    inline:true,
    labelWidth: '',
    labelPosition: 'right',
    formItems: [
        {
            type: 'input',
            prop: 'columnName',
            label: '文章栏目名称',
            placeholder: '请输入文章栏目名称',
            clearable: true,
        }
    ],

};
let formInit = {
    columnName: '',
}

export {
    formInit,formConfig
}