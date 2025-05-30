//*- coding = utf-8 -*-
//@Time : 2023-04-01 22:41
//@Author : 沉默小管
//@File : useClass.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
//获取字典
import {requestArtSortList} from "@/network/article/articleSort";
import {resInterface} from "@/commonNetwork/index";
import {requestArtColumnList} from "@/network/article/articleColumn";
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