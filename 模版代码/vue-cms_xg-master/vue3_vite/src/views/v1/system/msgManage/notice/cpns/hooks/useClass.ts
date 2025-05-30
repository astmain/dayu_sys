//*- coding = utf-8 -*-
//@Time : 2023-03-30 0:48
//@Author : 沉默小管
//@File : useClass.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import {requestRoleList} from "@/network/user/userRole/index";
import {resInterface} from "@/commonNetwork/index";
import {reactive, ref} from "vue";

export const useClass = ()=>{
    let dicts = reactive({
        sysNoticeType:[],
        sysNoticeStatus:"",
        sysSwitches:[],
    })
    //获取字典
    const handleDict = async (dict:any)=>{
        let {sys_notice_type,sys_switches,sys_notice_status}=await dict("sys_notice_type","sys_switches","sys_notice_status")
        dicts.sysNoticeType=sys_notice_type??[]
        dicts.sysSwitches=sys_switches??[]
        dicts.sysNoticeStatus=sys_notice_status??[]
        return true;
    }
    return {
        handleDict,dicts
    }
}