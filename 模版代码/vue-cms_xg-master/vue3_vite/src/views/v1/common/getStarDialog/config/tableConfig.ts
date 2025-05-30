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
    tableData: [
        {
            number:1,
            itemName:"vue-cms_xg",
            itemIntro:"单体前后分离",
            warehouseAddress:"https://gitee.com/derekgo/vue-cms_xg",
            isOpen:true,
        },
        {
            number:2,
            itemName:"tool-collection",
            itemIntro:"前端插件工具",
            warehouseAddress:"https://gitee.com/derekgo/tool-collection",
            isOpen:true,
        }
    ],
    showSelectColumn:false,
    tableHeight:"100%",
    tableCol:[{
        isShow: true,
        width:"50",
        showType:"col",
        label:"序号",
        prop:"number",
    },{
        isShow: true,
        width:"100",
        showType:"col",
        label:"名称",
        prop:"itemName",
    },{
        isShow: true,
        width:"100",
        showType:"col",
        label:"项目简介",
        prop:"itemIntro",
    },{
        isShow: true,
        showType:"slot",
        label:"仓库地址",
        prop:"warehouseAddress",
    },{
        isShow: true,
        showType:"slot",
        width:"80",
        label:"是否开源",
        prop:"isOpen",
    }]
})

export {
    tableConfig
}
