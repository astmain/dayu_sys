//*- coding = utf-8 -*-
//@Time : 2023-03-24 23:02
//@Author : 沉默小管
//@File : index.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import {formInterface} from "@/components/formList/types/index";
import {useStore} from "@/store/piniaAutoImport";

let settingStore = useStore("useSetting")
let formConfig: formInterface = {
    size:settingStore.sysSize,
    isHiddenBtn:true,
    labelPosition: 'right',
    formItems: [
        {
            type: 'input',
            prop: 'artSortName',
            label: '类型名称',
            placeholder: '请输入类型名称',
            clearable: true,
        },
        {
            type: 'input',
            prop: 'sort',
            label: '排序',
            placeholder: '请输入排序',
            clearable: true,
            otherOptions:{
                type:"number"
            }
        }
    ],
    rules:{
        artSortName:[
            { required: true, message: "请输入类型名称", trigger: "blur" },
        ]
    }
};
let formInit={
    artSortName:'',
    sort:'',
}

export {
    formConfig,formInit
}