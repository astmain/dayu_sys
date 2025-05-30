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
            prop: 'menuName',
            label: '菜单名称',
            placeholder: '请输入菜单名称',
            clearable: true,
        },{
            type: 'select',
            prop: 'status',
            label: '状态',
            placeholder: '请输入菜单状态',
            clearable: true,
            options:[]
        },
    ],

};
let formInit = {
    id:"",
    menuName: '',
    status: '',
}

export {
    formInit,formConfig
}