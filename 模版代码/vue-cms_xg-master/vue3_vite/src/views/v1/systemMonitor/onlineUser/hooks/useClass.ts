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
        sysUserLoginStatus:"",
        sysSex:"",
    })
    const handleDict = async (dict:any)=>{
        let {sys_user_login_status,sys_sex}=await dict("sys_user_login_status","sys_sex")
        dicts.sysUserLoginStatus=sys_user_login_status??[]
        dicts.sysSex=sys_sex??[]
        return true;
    }
    return {
        handleDict,dicts
    }
}

