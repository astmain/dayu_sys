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
    isExpand:true,
    showSelectColumn:true,
    tableCol: [ {
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
        showType: "slot",
        width: "130px",
        label: "操作人员账号",
        prop: "operName",
    },{
        isShow: true,
        showType: "slot",
        label: "请求Url",
        prop: "requestUrl",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    },{
        isShow: true,
        showType: "col",
        width: "100px",
        label: "操作系统",
        prop: "operationSystem",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    },{
        isShow: true,
        showType: "col",
        width: "100px",
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
    }, {
        isShow: true,
        showType: "slot",
        label: "操作时间",
        width: "180px",
        prop: "addTime",
        otherOptions:{
            "show-overflow-tooltip":true
        }
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