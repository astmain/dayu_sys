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
        sysSwitches:""
    })
    const handleDict = async (dict:any)=>{
        let {sys_switches}=await dict("sys_switches")
        dicts.sysSwitches=sys_switches??[]
        return true;
    }
    return {
        handleDict,dicts
    }
}

