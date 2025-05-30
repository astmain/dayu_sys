//*- coding = utf-8 -*-
//@Time : 2023-03-30 0:42
//@Author : 沉默小管
//@File : index.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import {formInterface} from "@/components/formList/types/index";
import {useStore} from "@/store/piniaAutoImport";

const userStore:any = useStore("useUser")
let formInit={
    title: '',
    noticeType: '',//公告通知类型
    content: "",
    noticeId: "",//公告通知id
    notifyUid: [],//通知人的id
    sendNoticeUid: userStore.userInfo.id,//发送通知人uid
}
let settingStore = useStore("useSetting")
let formConfig: formInterface = {
    size:settingStore.sysSize,
    isHiddenBtn:true,
    labelPosition: 'right',
    inline:true,
    formItems: [
        {
            type: 'input',
            prop: 'title',
            label: '公告标题',
            placeholder: '请输入公告标题',
            clearable: true,
            otherOptions: {
                style:"width:100%"
            },
            formItemOtherOptions: {
                style:"width:45%"
            }
        },
        {
            type: 'select',
            prop: 'noticeType',
            label: '公告类型',
            placeholder: '请选择公告类型',
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
            prop: 'content',
            label: '公告内容',
            placeholder: '请选择角色',
            clearable: true,
            otherOptions: {
                style:"width:100%"
            },
            formItemOtherOptions: {
                style:"width:100%"
            }
        },
        {
            type: 'slot',
            prop: 'notifyUid',
            label: '接收通知者',
            clearable: true,
            otherOptions: {
                style:"width:100%"
            },
            formItemOtherOptions: {
                style:"width:100%"
            }
        },
    ],
    rules:{
        title: [
            { required: true, message: "公告标题不能为空", trigger: "blur" },
        ],
        content: [
            { required: true, message: "公告内容不能为空", trigger: "blur" },
        ],
        noticeType: [
            { required: true, message: "公告类型不能为空", trigger: "blur" },
        ],
        notifyUid: [
            { required: true, message: "接收通知者不能为空", trigger: "blur" },
        ],
    }
};
export {
    formInit,formConfig
}