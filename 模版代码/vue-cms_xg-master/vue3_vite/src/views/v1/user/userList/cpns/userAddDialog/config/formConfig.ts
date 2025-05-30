//*- coding = utf-8 -*-
//@Time : 2023-03-30 0:42
//@Author : 沉默小管
//@File : index.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {formInterface} from "@/components/formList/types/index";
import {useStore} from "@/store/piniaAutoImport";

let formInit={
    headImgId: '',
    headImg: '',
    username: "",
    nickName: "",
    originalPwd: "",
    sex: "",
    phone: "",
    email: "",
    status:'1',
    roleId: "",
    sort: "",
}
let settingStore = useStore("useSetting")
let formConfig: formInterface = {
    size:settingStore.sysSize,
    isHiddenBtn:true,
    labelPosition: 'right',
    inline:true,
    formItems: [
        {
            type: 'slot',
            prop: 'headImg',
            label: '头像',
            formItemOtherOptions:{
                style:"width:100%"
            }
        },
        {
            type: 'input',
            prop: 'nickName',
            label: '名称',
            placeholder: '请输入名称',
            clearable: true,
            otherOptions: {
                style:"width:100%"
            },
            formItemOtherOptions: {
                style:"width:45%"
            }
        },
        {
            type: 'input',
            prop: 'username',
            label: '账号',
            placeholder: '请输入账号',
            clearable: true,
            otherOptions: {
                style:"width:100%"
            },
            formItemOtherOptions: {
                style:"width:45%"
            }
        },
        {
            type: 'input',
            prop: 'originalPwd',
            label: '密码',
            placeholder: '请输入密码',
            clearable: true,
            otherOptions: {
                type:"password",
                style:"width:100%"
            },
            formItemOtherOptions: {
                style:"width:45%"
            }
        },
        {
            type: 'input',
            prop: 'phone',
            label: '手机号码',
            placeholder: '请输入手机号码',
            clearable: true,
            otherOptions: {
                style:"width:100%"
            },
            formItemOtherOptions: {
                style:"width:45%"
            }
        },
        {
            type: 'input',
            prop: 'email',
            label: '邮箱',
            placeholder: '请输入邮箱',
            clearable: true,
            otherOptions: {
                type:"email",
                style:"width:100%"
            },
            formItemOtherOptions: {
                style:"width:45%"
            }
        },
        {
            type: 'select',
            prop: 'sex',
            label: '性别',
            placeholder: '请选择性别',
            clearable: true,
            options: [],
            otherOptions: {
                style:"width:100%"
            },
            formItemOtherOptions: {
                style:"width:45%"
            }
        },
        {
            type: 'slot',
            prop: 'roleId',
            label: '角色',
            placeholder: '请选择角色',
            clearable: true,
            otherOptions: {
                style:"width:100%"
            },
            formItemOtherOptions: {
                style:"width:45%"
            }
        },
        {
            type: 'input',
            prop: 'sort',
            label: '排序',
            placeholder: '请输入序号',
            clearable: true,
            otherOptions: {
                type:"number",
                style:"width:100%"
            },
            formItemOtherOptions: {
                style:"width:45%"
            }
        },
        {
            type: 'radio',
            prop: 'status',
            label: '状态',
            placeholder: '请选择状态',
            clearable: true,
            options: [],
            otherOptions: {
                style:"width:100%"
            },
            formItemOtherOptions: {
                style:"width:45%"
            }
        },
    ],
    rules:{
        status: [
            { required: true, message: "状态不能为空", trigger: "blur" },
        ],
        roleId: [
            { required: true, message: "角色不能为空", trigger: "blur" },
        ],
        nickName: [
            { required: true, message: "用户名称不能为空", trigger: "blur" },
            { min: 2, max: 20, message: '用户名称长度必须介于 2 和 20 之间', trigger: 'blur' }
        ],
        username: [
            { required: true, message: "账号不能为空", trigger: "blur" },
            { min: 2, max: 20, message: '账号长度必须介于 2 和 20 之间', trigger: 'blur' }
        ],
        originalPwd: [
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
export {
    formInit,formConfig
}