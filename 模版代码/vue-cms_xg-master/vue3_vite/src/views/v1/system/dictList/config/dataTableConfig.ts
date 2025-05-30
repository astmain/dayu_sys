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
    tableCol:[{
        width: "150px",
        isShow: true,
        showType:"col",
        label:"字典标签",
        prop:"dictLabel",
    },{
        width: "150px",
        isShow: true,
        showType: "col",
        label: "字典键值",
        prop: "dictValue",
    },{
        width: "100px",
        isShow: true,
        showType:"slot",
        label:"状态",
        prop:"status",
    },{
        isShow: true,
        showType:"col",
        label:"排序",
        prop:"dictSort",
    },{
        isShow: true,
        showType:"col",
        label:"备注",
        prop:"remark",
    },{
        isShow: true,
        showType:"slot",
        width:"160px",
        label:"创建时间",
        prop:"addTime",
    },{
        isShow: true,
        showType:"slot",
        width:"150px",
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