/*- coding = utf-8 -*-
@Time : 2022/10/23 9:19
@Author : 沉默小管
@File : dict.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import storeName from "@/store/storeName";
import {getLocalStorage, removeLocalStorage, setLocalStorage} from "@/utils/storage";
import {defineStore} from "pinia";
import {toRaw} from "vue";

interface dictStoreInterface{
    dict:any[]
}

const useDictStore = defineStore(storeName.dict,{
    //sidebar,device,size解构后就需要.value
    state:():dictStoreInterface=>({
        dict:[]
    }),
    //可以操作异步和同步提交到state
    actions:{
        //获取字典
        getDict(key:string|null):any[]|null|undefined{
            if(key==null || key==""){
                return null
            }
            if(getLocalStorage("dict")){
                this.dict = JSON.parse(getLocalStorage("dict"))
            }

            try{
                for(let i in this.dict){
                    if(this.dict[i].key == key){
                        return this.dict[i].value
                    }
                }
            }catch(e){
                return null
            }
        },
        //设置字典
        setDict(key:string|null,value:any){
            if(key!=null && key!=""){
                for(let i in this.dict){
                    if(this.dict[i]["key"]==key){
                        this.dict[i]["value"] = value
                        return;
                    }
                }
                this.dict.push({
                    key,value
                })
                setLocalStorage("dict",JSON.stringify(toRaw(this.dict)))
            }
        },
        //删除字典
        removeDict(key:string|null){
            for(let i in this.dict){
                if(this.dict[i].key == key){
                    this.dict.splice(parseInt(i),1)
                    removeLocalStorage("dict")
                    return true
                }
            }
            return false;
        },
        //清除字典
        clearDict(){
            this.dict = []
        }
    }
})
export default useDictStore