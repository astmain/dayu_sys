/*- coding = utf-8 -*-
@Time : 2023/4/8 9:11
@Author : CSDN 沉默小管
@File : useArtContentUpload.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {requestArtContentImgUpload} from "@/network/article/articleList";

//文章内容上传文件，图片等钩子
export const useArtContentUpload = (loading:any,artContentImgUploadArr:any)=>{
    // 图片上传
    const handleUploadImg = async (files: FileList, callback: (urls: string[]) => void) => {
        const res = await Promise.all(
            Array.from(files).map((file) => {
                return new Promise((rev, rej) => {
                    let form = {
                        file
                    }
                    requestArtContentImgUpload(form).then((res) => {
                        rev(res)
                        loading.value = false
                    })
                });
            })
        );
        //返回参数到edit编辑器
        callback(res.map((item: any) => {
            let imgUrl = item.data.imgUrl
            let id = item.data.id
            artContentImgUploadArr.push({
                imgUrl,id
            })
            return imgUrl
        }));
    }
    const handleChangeHtml = (v: string):void => {
        // formModel.value.artContent = v;
        // console.log(v,"aaaaaaaaaaaaaaaaaa");
    }
    return {
        handleUploadImg,handleChangeHtml
    }
}