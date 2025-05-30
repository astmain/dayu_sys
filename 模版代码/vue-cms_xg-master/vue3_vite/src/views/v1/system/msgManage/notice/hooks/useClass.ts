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
        sysSwitches:"",
        sysNoticeStatus:"",
        sysNoticeType:"",
    })
    const handleDict = async (dict:any)=>{
        let {sys_switches,sys_notice_status,sys_notice_type}=await dict("sys_switches","sys_notice_status","sys_notice_type")
        dicts.sysSwitches=sys_switches??[]
        dicts.sysNoticeStatus= sys_notice_status??[]
        dicts.sysNoticeType= sys_notice_type??[]
        return true;
    }
    return {
        handleDict,dicts
    }
}

