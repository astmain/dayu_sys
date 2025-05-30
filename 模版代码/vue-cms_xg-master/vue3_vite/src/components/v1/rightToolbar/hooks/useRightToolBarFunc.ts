/*- coding = utf-8 -*-
@Time : 2023/4/6 14:11
@Author : 沉默小管
@File : useRightToolBarFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {tableInterface} from "@/components/tableList";
import {ref} from "vue";

export const useRightToolBarFunc = (tableConfig:tableInterface,loading:any)=>{
    let showSearch = ref<boolean>(true)
    //更新table上列显示
    const handleUpdateTableColumns = (params:any)=>{
        tableConfig.tableCol = params
    }
    //刷新table数据
    const handleRefreshTable = (handleList:Function)=>{
        loading.value=true;
        handleList().then(res=>{
            loading.value=false
        })
    }
    return {
        handleUpdateTableColumns,handleRefreshTable,showSearch
    }
}