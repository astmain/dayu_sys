//*- coding = utf-8 -*-
//@Time : 2023-03-30 0:48
//@Author : CSDN 沉默小管
//@File : useClass.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import {requestRoleList} from "@/network/user/userRole/index";
import {resInterface} from "@/commonNetwork/index";
import {reactive, ref} from "vue";

export const useClass = ()=>{
    let dicts = reactive({
        sysSex:[],
        sysSwitches:[],
    })
    let roleOptions = ref<any[]>([])
    //获取角色列表
    const handleRoleList = async (model:any)=>{
        return await requestRoleList().then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            roleOptions.value.length = 0;
            let list = data.data;
            for(let i in list){
                roleOptions.value.push({
                    ...list[i]
                })
            }
            return true;
        }).catch((err: any)=>{
            console.log(err);
            return false;
        })
    }
    //获取字典
    const handleDict = async (dict:any)=>{
        let {sys_sex,sys_switches}=await dict("sys_sex","sys_switches")
        dicts.sysSex=sys_sex??[]
        dicts.sysSwitches=sys_switches??[]
        return true;
    }
    return {
        handleRoleList,handleDict,dicts,roleOptions
    }
}
