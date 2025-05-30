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
        showType:"col",
        label:"角色名称",
        prop:"roleName",
    },{
        isShow: true,
        showType:"slot",
        label:"状态",
        prop:"status",
    },{
        isShow: true,
        showType:"col",
        label:"备注",
        prop:"remark",
    },{
        isShow: true,
        width:"150",
        showType:"slot",
        label:"操作",
        fixed:"right",
        prop:"operation",
    }],
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