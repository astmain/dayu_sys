/*- coding = utf-8 -*-
@Time : 2023/3/28 17:08
@Author : 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {formInterface} from "@/components/formList/types/index";
import {useStore} from "@/store/piniaAutoImport";

let formInit={
    artName:'',
    sort:'',
    picId:0,
    picUrl:'',
    status:'1',
    artColumnId:"",
    artSortId:"",
    artDesc:'',
    artContent:'',
    artContentId:"",
    artKey:'',
    originalUrl:'',
}
let settingStore = useStore("useSetting")
let formConfig: formInterface = {
    size:settingStore.sysSize,
    isHiddenBtn:true,
    labelPosition: 'right',
    formItems: [
        {
            type: 'input',
            prop: 'artName',
            label: '文章标题',
            placeholder: '请输入文章标题',
            clearable: true,
        },
        {
            type: 'slot',
            prop: 'picId',
            label: '文章图片',
            placeholder: '请输入文章图片',
            clearable: true
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
        },
        {
            type: 'radio',
            prop: 'status',
            label: '显示状态',
            options:[]
        },
        {
            type: 'select',
            prop: 'artColumnId',
            label: '文章栏目',
            placeholder: '请输入文章栏目',
            clearable: true,
            options:[]
        },
        {
            type: 'select',
            prop: 'artSortId',
            label: '文章分类',
            placeholder: '请输入文章分类',
            clearable: true,
            options:[]
        },
        {
            width:"300px",
            type: 'input',
            prop: 'artDesc',
            label: '简短介绍',
            placeholder: '请输入简短介绍',
            clearable: true,
            otherOptions:{
                type:"textarea",
                autosize:{ minRows: 2, maxRows: 4 }
            }
        },
        {
            type: 'slot',
            prop: 'artContent',
            label: '文章内容',
            placeholder: '请输入文章内容',
            clearable: true
        },
        {
            width:"300px",
            type: 'input',
            prop: 'artKey',
            label: '关键词',
            placeholder: '请输入关键词，以逗号隔开',
            clearable: true
        },
        {
            type: 'input',
            prop: 'originalUrl',
            label: '原创路径',
            placeholder: '请输入原创路径',
            clearable: true
        }
    ],
    rules:{
        artName: [
            { required: true, message: "文章名称不能为空", trigger: "blur" }
        ],
        artContent: [
            { required: true, message: "文章内容不能为空", trigger: "blur" }
        ]
    }
};

export {
    formInit,formConfig
}
