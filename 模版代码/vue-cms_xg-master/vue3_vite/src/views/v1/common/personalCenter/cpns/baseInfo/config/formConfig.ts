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
            prop: 'headImg',
            label: '头像',
        },
        {
            type: 'input',
            prop: 'nickName',
            label: '名称',
            placeholder: '请输入名称',
            clearable: true,
        },
        {
            type: 'input',
            prop: 'username',
            label: '账号',
            placeholder: '请输入账号',
            clearable: true,
            otherOptions:{
                disabled:true
            }
        },
        {
            type: 'input',
            prop: 'password',
            label: '密码',
            placeholder: '请输入密码',
            clearable: true,
            otherOptions:{
                type: 'password',
            }
        },
        {
            type: 'input',
            prop: 'email',
            label: '邮箱',
            placeholder: '请输入邮箱',
            clearable: true,
            otherOptions:{
                type: 'email',
            }
        },
        {
            label: '账号关联',
            type: 'slot',
            prop: 'authLogin',
        },
        {
            type: 'input',
            prop: 'phone',
            label: '手机号',
            placeholder: '请输入手机号',
            clearable: true,
        },
        {
            type: 'radio',
            prop: 'sex',
            label: '性别',
            options:[],
        },
        {
            type: 'slot',
            prop: 'roleId',
            label: '角色',
            placeholder: '请选择角色',
        },
    ],
    rules:{
        username: [
            { required: true, message: "用户名称不能为空", trigger: "blur" },
            { min: 2, max: 20, message: '用户名称长度必须介于 2 和 20 之间', trigger: 'blur' }
        ],
        password: [
            { required: true, message: "用户密码不能为空", trigger: "blur" },
            { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' }
        ],
        email: [
            {
                type: "email",
                message: "请输入正确的邮箱地址",
                trigger: ["blur", "change"]
            }
        ],
        phone: [
            {
                pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                message: "请输入正确的手机号码",
                trigger: "blur"
            }
        ]
    }
};
let formInit = {
    headImgId: '',
    headImg: '',
    email: '',
    nickName: '',
    password: '',
    phone: '',
    roleId: '',
    sex: '',
    username: '',
}

export {
    formInit,formConfig
}