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
            prop: 'operName',
            label: '操作人员',
            placeholder: '请输入操作人员名称',
            clearable: true,
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
    operName: '',
    startTime: "",
    endTime: "",
}
export {
    formInit,formConfig
}