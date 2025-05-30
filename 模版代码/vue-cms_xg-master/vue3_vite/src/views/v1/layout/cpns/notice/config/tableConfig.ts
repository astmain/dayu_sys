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
    tableHeight:"200px",
    tableCol: [ {
        isShow: true,
        showType: "col",
        width: "100px",
        label: "发送人",
        prop: "sendNoticeName",
    },{
        isShow: true,
        showType: "slot",
        label: "内容",
        prop: "content",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    }, {
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
        showType: "slot",
        width: "130px",
        label: "日期",
        prop: "addTime",
    },{
        isShow: true,
        showType:"slot",
        width:"70",
        label:"操作",
        fixed:"right",
        prop:"operation",
    }],
})
let pageConfig = reactive({
    small: true,
    isPageShow: true,
    layout:'total, sizes, prev, pager, next',
    currentPage: 1,
    pageSize: 15,
    total: 0,
})

export {
    tableConfig,pageConfig
}