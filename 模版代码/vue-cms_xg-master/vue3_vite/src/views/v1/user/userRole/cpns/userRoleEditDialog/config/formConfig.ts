//*- coding = utf-8 -*-
//@Time : 2023-03-30 0:49
//@Author : 沉默小管
//@File : index.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {formInterface} from "@/components/formList/types";
import {useStore} from "@/store/piniaAutoImport";

let formInit = {
    id:0,
    roleName: "",
    perms: "",
    status: "",
    remark: "",
    menuIds: [],
}
let settingStore = useStore("useSetting")
let formConfig: formInterface = {
    size:settingStore.sysSize,
    isHiddenBtn:true,
    labelPosition: 'right',
    formItems: [
        {
            type: 'input',
            prop: 'roleName',
            label: '角色名称',
            placeholder: '请输入角色名称',
            clearable: true,
        },
        {
            type: 'input',
            prop: 'perms',
            label: '权限字符',
            placeholder: '请输入权限字符',
            tooltipOptions:{
                content:"控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)"
            },
            clearable: true,
        },
        {
            type: 'select',
            prop: 'status',
            label: '状态',
            placeholder: '请选择状态',
            clearable: true,
            options:[]
        },
        {
            type: 'slot',
            prop: 'menuIds',
            label: '菜单权限',
        },
        {
            type: 'input',
            prop: 'remark',
            label: '备注',
            placeholder: '请输入备注',
            clearable: true,
        },
    ],
    rules:{
        roleName: [
            { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        perms: [
            { required: true, message: "权限字符不能为空", trigger: "blur" }
        ],
        menuIds: [
            { required: true, message: "菜单栏不能为空", trigger: "blur" }
        ]
    }
};
export {
    formInit,formConfig
}