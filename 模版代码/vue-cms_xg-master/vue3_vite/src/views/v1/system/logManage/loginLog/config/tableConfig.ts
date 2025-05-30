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
    tableCol: [{
        isShow: true,
        showType: "col",
        width: "100px",
        label: "编号",
        prop: "id",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    }, {
        isShow: true,
        showType: "col",
        width: "150px",
        label: "用户名称",
        prop: "username",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    }, {
        isShow: true,
        showType: "col",
        width: "150px",
        label: "登录地址",
        prop: "ip",
    },{
        isShow: true,
        showType: "slot",
        width: "100px",
        label: "状态",
        prop: "status",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    },{
        isShow: true,
        showType: "col",
        width: "140px",
        label: "操作系统",
        prop: "operationSystem",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    },{
        isShow: true,
        showType: "col",
        width: "140px",
        label: "浏览器",
        prop: "browser",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    },{
        isShow: true,
        showType: "slot",
        width: "100px",
        label: "客户端设备",
        prop: "isPcOrIphone",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    },{
        isShow: true,
        showType: "slot",
        label: "登录日期",
        prop: "addTime",
        otherOptions:{
            "show-overflow-tooltip":true
        },
        sortable: true,
    }],
})
let pageConfig = reactive({
    small: true,
    isPageShow: true,
    currentPage: 1,
    pageSize: 15,
    total: 0,
})

export {
    tableConfig,pageConfig
}