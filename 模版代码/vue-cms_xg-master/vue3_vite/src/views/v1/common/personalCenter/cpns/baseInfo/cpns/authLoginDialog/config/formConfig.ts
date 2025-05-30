/*- coding = utf-8 -*-
@Time : 2023/3/24 14:55
@Author : 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {formInterface} from "@/components/formList/types";
import {useStore} from "@/store/piniaAutoImport";

let settingStore = useStore("useSetting")
let formConfig: formInterface = {
    size:settingStore.sysSize,
    isHiddenBtn:true,
    labelPosition: 'right',
    formItems: [
        {
            type: 'input',
            prop: 'columnName',
            label: '文章栏目名称',
            placeholder: '请输入文章栏目名称',
            clearable: true,
        },
        {
            type: 'input',
            prop: 'sort',
            label: '排序',
            placeholder: '请输入排序',
            clearable: true,
            otherOptions:{
                type:"number"
            }
        }
    ],
    rules:{
        columnName:[
            { required: true, message: "请填写文章栏目名称", trigger: "blur" },
        ]
    }
};
let formInit={
    columnName:'',
    sort:'',
}

export {
    formConfig,formInit
}