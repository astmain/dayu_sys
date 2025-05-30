//*- coding = utf-8 -*-
//@Time : 2023-03-30 0:37
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
            prop: 'sortName',
            label: '图片分类',
            placeholder: '请输入图片分类名称',
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
        sortName:[
            { required: true, message: "请输入图片分类名称", trigger: "blur" },
        ]
    }
};
let formInit={
    id:'',
    imgName:'',
    sort:'',
}

export {
    formInit,formConfig
}