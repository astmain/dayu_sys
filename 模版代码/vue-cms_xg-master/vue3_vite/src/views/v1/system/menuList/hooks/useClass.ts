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
        sysShowStatus:"",
    })
    const handleDict = async (dict:any)=>{
        let {sys_switches,sys_show_status}=await dict("sys_switches","sys_show_status")
        dicts.sysSwitches=sys_switches??[]
        dicts.sysShowStatus=sys_show_status??[]
        return true;
    }
    return {
        handleDict,dicts
    }
}

