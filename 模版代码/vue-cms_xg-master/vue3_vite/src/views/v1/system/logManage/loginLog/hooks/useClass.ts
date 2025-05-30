/*- coding = utf-8 -*-
@Time : 2023/4/6 16:17
@Author : 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {reactive} from "vue";

export const useClass = () =>{
    let dicts = reactive({
        sysCommonStatus:""
    })
    const handleDict = async (dict:any)=>{
        let {sys_common_status}=await dict("sys_common_status")
        dicts.sysCommonStatus=sys_common_status??[]
        return true;
    }
    return {
        handleDict,dicts
    }
}

