/*- coding = utf-8 -*-
@Time : 2022/10/16 8:57
@Author : CSDN 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {requestDictData} from "@/network/common/dicts/index";
import {useDict} from "@/store/index";
import {ref} from "vue";

/**
 * 获取字典数据
 */
export default function handleGetDictData(...args:any){
    let dictData = ref<any>({})
    return new Promise(async (resolve,reject)=>{
        for(let i in args){
            let data = useDict().getDict(args[i])
            // useDict().removeDict(args[i])
            if(!data || data.length<=0){
                dictData.value = await requestDictData(args[i]).then((res:any)=>{
                    let {data,code,message} = res;
                    dictData.value[args[i]] = data.map((item:any)=>{
                        return {label:item.dictLabel,value:item.dictValue,type:item.dictType,listClass:item?.listClass}
                    })
                    useDict().setDict(args[i],dictData.value[args[i]])
                    return dictData.value
                })
            }else{
                dictData.value[args[i]] = data
            }
        }
        resolve(dictData.value)
    })
}