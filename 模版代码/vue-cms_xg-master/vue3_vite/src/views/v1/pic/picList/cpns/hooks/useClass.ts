//*- coding = utf-8 -*-
//@Time : 2023-03-30 0:21
//@Author : 沉默小管
//@File : useClass.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
//图片分类
import {requestImgSortList} from "@/network/pic/picSort/index";
import {resInterface} from "@/commonNetwork/index";
import {ref} from "vue";

export default function(model:any){
    let imgSortArr = ref([])
    const handleImgSortList = async ()=>{
        return await requestImgSortList().then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            imgSortArr.value =  data.data;
            return true;
        }).catch((err: any)=>{
            console.log(err);
            return false;
        })
    }
    return {
        handleImgSortList,imgSortArr
    }
}



