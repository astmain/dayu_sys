/*- coding = utf-8 -*-
@Time : 2022/10/10 18:02
@Author : CSDN 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {request} from "@/commonNetwork/request"

// 根据字典类型查询字典数据信息
export function requestDictData(dictType:string){
    return request({
        url: 'dict/dictData/type',
        method: 'post',
        data:{dictType}
    })
}