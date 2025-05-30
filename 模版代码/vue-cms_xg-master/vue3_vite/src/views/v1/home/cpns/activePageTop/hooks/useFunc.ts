/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/


import {onMounted, ref} from "vue";
import {useFunc as useCommonFunc} from "@/views/home/cpns/common/canvasHooks/useFunc";
import {requestActivePageTop} from "@/network/home";

export const useFunc = (styleId:string) =>{
    const handleGetServerData = async () => {
        requestActivePageTop().then(res=>{
            let {code,data,message} = res;
            data = data.slice(0,10)
            let newArr:any = []
            for(let i in data){
                newArr.push( { ranking: parseInt(i)+1, station:data[i]['pageName'], value:data[i]['num'] })
            }
            handleInitChart(newArr)
        })
    }

    let {handleInitData,handleInitChart,cWidth,cHeight} = useCommonFunc(styleId,handleGetServerData)

    onMounted(()=>{
        handleInitData()
    })
    return {
        cWidth,cHeight
    }
}
