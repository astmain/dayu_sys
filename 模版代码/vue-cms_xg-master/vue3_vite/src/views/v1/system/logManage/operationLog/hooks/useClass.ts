/*- coding = utf-8 -*-
@Time : 2023/4/6 16:17
@Author : CSDN 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {reactive} from "vue";

export const useClass = () =>{
    let dicts = reactive({
        sysCommonStatus:"",
        sysOperType:"",
    })
    const handleDict = async (dict:any)=>{
        let {sys_common_status,sys_oper_type}=await dict("sys_common_status","sys_oper_type")
        dicts.sysCommonStatus=sys_common_status??[]
        dicts.sysOperType=sys_oper_type??[]
        return true;
    }
    return {
        handleDict,dicts
    }
}

