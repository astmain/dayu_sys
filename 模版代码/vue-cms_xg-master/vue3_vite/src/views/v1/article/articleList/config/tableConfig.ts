//*- coding = utf-8 -*-
//@Time : 2023-02-24 22:57
//@Author : CSDN 沉默小管
//@File : tableConfig.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {tableInterface} from "@/components/tableList/types/index";
import {reactive} from "vue";
import {useStore} from "@/store/piniaAutoImport";
let settingStore = useStore("useSetting")
let tableConfig = reactive<tableInterface>({
    tableSize:settingStore.sysSize,
    keyId: "id",
    tableData: [],
    showSelectColumn:true,
    tableCol:[{
        isShow: true,
        width:"125",
        showType:"slot",
        label:"文章图片",
        prop:"picUrl",
    },{
        isShow: true,
        showType:"col",
        label:"文章名称",
        prop:"artName",
    },{
        isShow: true,
        showType:"col",
        label:"简短介绍",
        prop:"artDesc",
    },{
        isShow: true,
        showType:"col",
        label:"访问量",
        prop:"visitNum",
    },{
        isShow: true,
        showType:"slot",
        label:"显示状态",
        prop:"status",
    },{
        isShow: true,
        width:"160px",
        showType:"slot",
        label:"创建时间",
        prop:"addTime",
    },{
        isShow: true,
        width:"150",
        showType:"slot",
        label:"操作",
        fixed:"right",
        prop:"operation",
    }]
})
let pageConfig = reactive({
    small: true,
    isPageShow: true,
    currentPage: 1,
    pageSize: 10,
    total: 0,
})

export {
    tableConfig,pageConfig
}