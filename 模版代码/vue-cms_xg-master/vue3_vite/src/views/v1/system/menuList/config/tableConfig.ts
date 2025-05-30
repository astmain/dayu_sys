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
        width:"150px",
        isShow: true,
        showType:"slot",
        label:"模块名称",
        prop:"menuName",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    },{
        isShow: true,
        showType:"col",
        label:"模块路径",
        prop:"path",
    },{
        width:"100px",
        isShow: true,
        showType:"slot",
        label:"菜单状态",
        prop:"status",
    },{
        width:"100px",
        isShow: true,
        showType:"slot",
        label:"显示状态",
        prop:"visible",
    },{
        isShow: true,
        showType: "slot",
        label: "权限字符",
        prop: "perms",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    },{
        isShow: true,
        showType:"slot",
        label:"图标",
        prop:"icon",
    },{
        isShow: true,
        showType:"col",
        label:"排序",
        prop:"sort",
    },{
        isShow: true,
        showType:"slot",
        width:"140px",
        label:"添加时间",
        prop:"addTime",
    },{
        isShow: true,
        showType:"slot",
        width:"190",
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
