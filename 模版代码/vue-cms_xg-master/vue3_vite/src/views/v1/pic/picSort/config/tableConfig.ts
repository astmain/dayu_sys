//*- coding = utf-8 -*-
//@Time : 2023-02-24 22:57
//@Author : 沉默小管
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
    tableCol:[{
        isShow: true,
        showType:"col",
        label:"id",
        width:"50",
        prop:"id",
    },{
        isShow: true,
        showType:"col",
        label:"图片分类名称",
        width:"120",
        prop:"sortName",
    },{
        isShow: true,
        showType:"col",
        label:"排序",
        prop:"sort",
    },{
        isShow: true,
        showType:"slot",
        label:"图片数量",
        prop:"picNum",
    },{
        isShow: true,
        showType:"slot",
        label:"创建时间",
        prop:"addTime",
    },{
        isShow: true,
        width:"200",
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