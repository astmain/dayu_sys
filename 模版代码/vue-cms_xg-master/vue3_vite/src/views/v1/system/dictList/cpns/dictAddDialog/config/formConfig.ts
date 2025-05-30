//*- coding = utf-8 -*-
//@Time : 2023-04-01 22:40
//@Author : 沉默小管
//@File : formConfig.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {formInterface} from "@/components/formList/types";
import {useStore} from "@/store/piniaAutoImport";

let settingStore = useStore("useSetting")
let formConfig: formInterface = {
    size:settingStore.sysSize,
    isHiddenBtn:true,
    labelPosition: 'right',
    formItems: [
        {
            type: 'input',
            prop: 'dictName',
            label: '字典名称',
            clearable:true,
            width:"100%",
            placeholder:"请输入字典名称",
        },
        {
            type: 'input',
            prop: 'dictType',
            label: '字典类型',
            clearable:true,
            width:"100%",
            placeholder:"请输入字典类型",
        },
        {
            type: 'radio',
            prop: 'statue',
            label: '状态',
            options:[],
        },
        {
            type: 'input',
            prop: 'remark',
            label: '备注',
            clearable:true,
            width:"100%",
            placeholder:"请输入备注",
           otherOptions: {
                type:"textarea"
           }
        },
    ],
    rules:{
        dictName: [
            { required: true, message: "字典名称不能为空", trigger: "blur" },
        ],
        dictType: [
            { required: true, message: "字典类型不能为空", trigger: "blur" }
        ]
    }
};
let formInit={
    dictName: "",
    dictType: "",
    status: "1",
    remark: "",
    dictId: "",
}

export {
    formConfig,formInit
}