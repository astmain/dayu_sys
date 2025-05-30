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
    tableCol: [ {
        isShow: true,
        showType: "col",
        width: "100px",
        label: "公告标题",
        prop: "title",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    }, {
        isShow: true,
        showType: "slot",
        width: "100px",
        label: "公告类型",
        prop: "noticeType",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    }, {
        isShow: true,
        showType: "slot",
        width: "150px",
        label: "公告内容",
        prop: "content",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    },{
        isShow: true,
        showType: "slot",
        width: "130px",
        label: "状态",
        prop: "status",
    },{
        isShow: true,
        showType: "col",
        label: "创建者名称",
        prop: "createName",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    },{
        isShow: true,
        showType: "slot",
        label: "操作时间",
        width: "180px",
        prop: "addTime",
        otherOptions:{
            "show-overflow-tooltip":true
        }
    },{
        isShow: true,
        showType:"slot",
        width:"150",
        label:"操作",
        fixed:"right",
        prop:"operation",
    }]
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