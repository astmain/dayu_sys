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
//缓存列表
let tableCacheConfig = reactive<tableInterface>({
    tableSize:settingStore.sysSize,
    keyId: "id",
    tableData: [],
    showSelectColumn:false,
    tableCol:[{
        isShow: true,
        showType:"col",
        label:"缓存名称",
        prop:"cacheName",
    },{
        isShow: true,
        showType:"col",
        label:"备注",
        prop:"remarks",
    },{
        isShow: true,
        width:"80",
        showType:"slot",
        label:"操作",
        fixed:"right",
        prop:"operation",
    }]
})
//键名列表
let tableKeysNameConfig = reactive<tableInterface>({
    tableSize:settingStore.sysSize,
    keyId: "id",
    tableData: [],
    showSelectColumn:false,
    tableCol:[{
        isShow: true,
        showType:"col",
        label:"缓存键名",
        prop:"cacheKeysName",
    },{
        isShow: true,
        width:"80",
        showType:"slot",
        label:"操作",
        fixed:"right",
        prop:"operation",
    }]
})

export {
    tableCacheConfig,tableKeysNameConfig
}
