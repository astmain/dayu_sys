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
        isShow: true,
        showType:"col",
        label:"用户名称",
        width:"120",
        prop:"nickName",
    },{
        isShow: true,
        showType:"col",
        width:"120",
        label:"用户角色",
        prop:"roleName",
    },{
        isShow: true,
        showType:"slot",
        width:"100",
        label:"状态",
        prop:"isOnline",
    },{
        isShow: true,
        showType:"col",
        label:"主机",
        width:"120",
        prop:"loginIp",
    },{
        isShow: true,
        showType:"col",
        label:"浏览器",
        prop:"loginBrowser",
    },{
        isShow: true,
        showType:"col",
        label:"操作系统",
        prop:"loginSystem",
    },{
        isShow: true,
        showType:"slot",
        label:"登录时间",
        prop:"loginTime",
    },{
        isShow: true,
        showType:"slot",
        width:"80",
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