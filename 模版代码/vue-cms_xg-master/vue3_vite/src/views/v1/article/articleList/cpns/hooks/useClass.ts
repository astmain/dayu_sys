/*- coding = utf-8 -*-
@Time : 2023/3/29 11:06
@Author : CSDN 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

//获取字典
import {requestArtSortList} from "@/network/article/articleSort";
import {resInterface} from "@/commonNetwork/index";
import {requestArtColumnList} from "@/network/article/articleColumn";
import {reactive, ref} from "vue";

export const useClass = () =>{
    let dicts = reactive({
        sysSwitches:""
    })
    let optionsArtColumn = ref<any[]>([]);//文章栏目
    let optionsArtSort = ref<any[]>([]);//文章分类
    const handleDict = async (dict:any)=>{
        let {sys_switches}=await dict("sys_switches")
        dicts.sysSwitches=sys_switches??[]
        return true;
    }

    const handleArtSort = async (model:any)=>{
        optionsArtSort.value.length = 0;
        return await requestArtSortList().then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            for(let i in data.data){
                optionsArtSort.value.push({
                    value:data.data[i]["id"],
                    label:data.data[i]["artSortName"]
                })
            }
            return true;
        }).catch(err=>{
            console.log(err);
            return false;
        })
    }
    const handleArtColumn = async (model:any)=>{
        optionsArtColumn.value.length = 0;
        return await requestArtColumnList().then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            for(let i in data.data){
                optionsArtColumn.value.push({
                    value:data.data[i]["id"],
                    label:data.data[i]["columnName"]
                })
            }
            return true;
        }).catch(err=>{
            console.log(err);
            return true;
        })
    }
    return {
        handleArtColumn,handleArtSort,handleDict,dicts,optionsArtColumn,optionsArtSort
    }
}

