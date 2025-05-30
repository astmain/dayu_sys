//*- coding = utf-8 -*-
//@Time : 2023-03-30 0:32
//@Author : 沉默小管
//@File : index.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {formInterface} from "@/components/formList/types";
import {useStore} from "@/store/piniaAutoImport";

let formInit={
    id:'',
    imgName:'',
    imgUrl:'',
    imgSortId:"",
    sort:'',
}
let settingStore = useStore("useSetting")
let formConfig: formInterface = {
    size:settingStore.sysSize,
    isHiddenBtn:true,
    labelPosition: 'right',
    formItems: [
        {
            type: 'slot',
            prop: 'imgUrl',
            label: '图片',
        },
        {
            type: 'input',
            prop: 'imgName',
            label: '图片名称',
            placeholder: '请输入图片名称',
            clearable: true,
        },
        {
            type: 'slot',
            prop: 'imgSortId',
            label: '图片分类',
            placeholder: '请选择图片分类',
            clearable: true,
            options:[]
        },
        {
            type: 'input',
            prop: 'sort',
            label: '排序',
            placeholder: '请输入排序',
            clearable: true,
            otherOptions: {
                type:"number"
            }
        },
    ],
    rules:{
        imgUrl: [
            { required: true, message: "图片不能为空", trigger: "blur" }
        ],
        imgName: [
            { required: true, message: "图片名称不能为空", trigger: "blur" }
        ]
    }
};


export {
    formInit,formConfig
}