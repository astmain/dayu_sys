//*- coding = utf-8 -*-
//@Time : 2023-04-01 22:40
//@Author : 沉默小管
//@File : formConfig.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import {formInterface} from "@/components/formList/types";
import {useStore} from "@/store/piniaAutoImport";
import {reactive} from "vue";

let listClassOptions = reactive([
    {
        value: "default",
        label: "默认"
    },
    {
        value: "primary",
        label: "主要"
    },
    {
        value: "success",
        label: "成功"
    },
    {
        value: "info",
        label: "信息"
    },
    {
        value: "warning",
        label: "警告"
    },
    {
        value: "danger",
        label: "危险"
    }
])

let settingStore = useStore("useSetting")
let formConfig: formInterface = {
    size:settingStore.sysSize,
    inline:true,
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
            otherOptions: {
                disabled:true
            },
            formItemOtherOptions:{
                style:"width:100%"
            }
        },
        {
            type: 'input',
            prop: 'dictLabel',
            label: '字典标签',
            clearable:true,
            width:"100%",
            placeholder:"请输入字典标签",
            formItemOtherOptions:{
                style:"width:100%"
            }
        },
        {
            type: 'input',
            prop: 'dictValue',
            label: '数据键值',
            clearable:true,
            width:"100%",
            placeholder:"请输入数据键值",
            formItemOtherOptions:{
                 style:"width:100%"
            }
        },
        {
            type: 'input',
            prop: 'dictSort',
            label: '显示排序',
            clearable:true,
            width:"100%",
            placeholder:"请输入显示排序",
            otherOptions: {
                type:"number",
                min:"0"
            },
            formItemOtherOptions:{
                 style:"width:100%"
            }
        },
        {
            type: 'select',
            prop: 'listClass',
            label: '回显样式',
            clearable:true,
            width:"100%",
            options: listClassOptions,
            formItemOtherOptions:{
                 style:"width:100%"
            }
        },
        {
            type: 'radio',
            prop: 'status',
            label: '状态',
            options:[],
            formItemOtherOptions:{
                 style:"width:100%"
            }
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
            },
            formItemOtherOptions:{
                style:"width:100%"
            }
        },
    ],
    rules:{
        dictName: [
            { required: true, message: "数据标签不能为空", trigger: "blur" },
        ],
        dictValue: [
            { required: true, message: "数据键值不能为空", trigger: "blur" }
        ],
        dictSort: [
            { required: true, message: "数据顺序不能为空", trigger: "blur" }
        ]
    }
};
let formInit={
    dictId: "",
    dictName: "",
    dictLabel: "",
    dictValue: "",
    listClass: "",
    dictSort: "",
    status: "",
    remark: ""
}

export {
    formConfig,formInit
}