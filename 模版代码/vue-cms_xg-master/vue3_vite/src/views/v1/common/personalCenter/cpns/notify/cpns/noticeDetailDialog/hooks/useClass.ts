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
        sysNoticeType:"",
        sysNotifyStatus:"",
    })
    const handleDict = async (dict:any)=>{
        let {sys_notice_type,sys_notify_status}=await dict("sys_notice_type","sys_notify_status")
        dicts.sysNoticeType=sys_notice_type??[]
        dicts.sysNotifyStatus=sys_notify_status??[]
        return true;
    }
    return {
        handleDict,dicts
    }
}

