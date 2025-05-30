/*- coding = utf-8 -*-
@Time : 2023/4/11 10:27
@Author : CSDN 沉默小管
@File : formConfig.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/


import {formInterface} from "@/components/formList/types";
import {useStore} from "@/store/piniaAutoImport";

let settingStore = useStore("useSetting")
let formConfig: formInterface = {
    size:settingStore.sysSize,
    inline:false,
    isHiddenBtn:true,
    labelWidth: '',
    labelPosition: 'right',
    formItems: [
        {
            type: 'slot',
            prop: 'sysLogo',
            label: '系统图标',
        },
        {
            type: 'input',
            prop: 'sysName',
            label: '系统名称',
            placeholder: '请输入系统名称',
            clearable: true,
        },
        {
            type: 'radio',
            prop: 'sysStatus',
            label: '系统状态',
            options:[{
                label:"开启",
                value:"1"
            },{
                label:"关闭",
                value:"2"
            }],
        },
        {
            type: 'radio',
            prop: 'multipleLoginAccountsStatus',
            label: '账号多地登陆',
            options:[{
                label:"开启",
                value:"1"
            },{
                label:"关闭",
                value:"2"
            }],
        },
        {
            type: 'input',
            prop: 'copyrightLinkInfo',
            label: '版权链接URL',
            placeholder:"请填写版权链接URL",
            clearable:true,
            width:"250px",
        },
        {
            type: 'input',
            prop: 'copyrightInfo',
            label: '版权链接URL',
            placeholder:"请填写版权信息",
            clearable:true,
            width:"250px",
        },
        {
            type: 'input',
            prop: 'sysIntro',
            label: '系统简介',
            placeholder:"请填写系统简介",
            clearable:true,
            width:"250px",
            otherOptions:{
                type:"textarea",
                autosize:{ minRows: 2, maxRows:10 },
            }

        },
    ],

};
let formInit = {
    sysLogoId: '',
    sysLogo: '',
    sysName: '',
    sysStatus: '1',
    sysIntro: '',
}

export {
    formInit,formConfig
}
