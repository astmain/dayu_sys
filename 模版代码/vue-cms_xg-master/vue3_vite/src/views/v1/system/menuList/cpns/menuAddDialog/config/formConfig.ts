/*- coding = utf-8 -*-
@Time : 2023/3/31 16:50
@Author : 沉默小管
@File : formConfig.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {formInterface} from "@/components/formList/types";
import {useStore} from "@/store/piniaAutoImport";

let settingStore = useStore("useSetting")
let formConfig: formInterface = {
    size:settingStore.sysSize,
    inline:true,
    isHiddenBtn:true,
    labelPosition: 'right',
    formItems: [
        {
            type: 'slot',
            prop: 'pid',
            label: '上级菜单',
            placeholder: '请输入上级菜单',
            formItemOtherOptions:{
                style:"width:100%"
            }
        },
        {
            type: 'radio',
            prop: 'menuType',
            label: '菜单类型',
            options:[{
                label:"目录",
                value:"1"
            },{
                label:"菜单",
                value:"2"
            },{
                label:"按钮",
                value:"3"
            }],
            formItemOtherOptions:{
                style:"width:100%"
            }
        },
        {
            type: 'slot',
            prop: 'icon',
            label: '菜单图标',
            formItemOtherOptions:{
                style:"width:100%"
            }
        },
        {
            type: 'input',
            prop: 'menuName',
            label: '菜单名称',
            clearable:true,
            width:"100%",
            placeholder:"请输入菜单名称",
            formItemOtherOptions:{
                style:"width:45%"
            }
        },
        {
            type: 'input',
            prop: 'sort',
            label: '显示排序',
            clearable:true,
            width:"100%",
            placeholder:"请输入数字",
            otherOptions:{
                type:"number",
                controlsPosition:"right",
                min:0
            },
            formItemOtherOptions:{
                style:"width:45%"
            }
        },
        {
            type: 'radio',
            prop: 'isFrame',
            label: '是否外链',
            tooltipOptions:{
              content:"选择是外链则路由地址需要以`http(s)://`开头"
            },
            options:[{
                label:"是",
                value:"1"
            },{
                label:"否",
                value:"2"
            }],
            formItemOtherOptions:{
                style:"width:45%"
            }
        },
        {
            type: 'input',
            prop: 'path',
            tooltipOptions:{
                content:"访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头"
            },
            label: '路由地址',
            clearable:true,
            width:"100%",
            placeholder:"请输入路由地址",
            formItemOtherOptions:{
                style:"width:45%"
            }
        },
        {
            type: 'input',
            prop: 'component',
            tooltipOptions:{
                content:"访问的组件路径，如：`system/user/index`，默认在`views`目录下"
            },
            label: '组件路径',
            clearable:true,
            width:"100%",
            placeholder:"请输入组件路径",
            formItemOtherOptions:{
                style:"width:45%"
            }
        },
        {
            type: 'input',
            prop: 'perms',
            tooltipOptions:{
                content:"控制器中定义的权限字符，如：@SaCheckPermission('system:user:list')"
            },
            label: '权限字符',
            clearable:true,
            width:"100%",
            placeholder:"请输入权限标识",
            otherOptions:{
                maxlength:100
            },
            formItemOtherOptions:{
                style:"width:45%"
            }
        },
        {
            type: 'input',
            prop: 'queryParam',
            tooltipOptions:{
                content:'访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`'
            },
            label: '路由参数',
            clearable:true,
            width:"100%",
            placeholder:"请输入路由参数",
            otherOptions:{
                maxlength:255
            },
            formItemOtherOptions:{
                style:"width:45%"
            }
        },
        {
            type: 'radio',
            prop: 'isCache',
            tooltipOptions:{
                content:"选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致"
            },
            label: '是否缓存',
            options:[{
                label:"缓存",
                value:"1"
            },{
                label:"不缓存",
                value:"2"
            }],
            formItemOtherOptions:{
                style:"width:45%"
            }
        },
        {
            type: 'radio',
            prop: 'visible',
            tooltipOptions:{
                content:"选择隐藏则路由将不会出现在侧边栏，但仍然可以访问"
            },
            label: '显示状态',
            options:[],
            formItemOtherOptions:{
                style:"width:45%"
            }
        },
        {
            type: 'radio',
            prop: 'status',
            tooltipOptions:{
                content:"选择停用则路由将不会出现在侧边栏，也不能被访问"
            },
            label: '菜单状态',
            options:[],
            formItemOtherOptions:{
                style:"width:45%"
            }
        }
    ],
    rules:{
        pid: [
            { required: true, message: "上级菜单不能为空", trigger: "blur" }
        ],
        menuType: [
            { required: true, message: "菜单类型不能为空", trigger: "blur" }
        ],
        menuName: [
            { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        path: [
            { required: true, message: "路由地址不能为空", trigger: "blur" }
        ]
    }
};
let formInit={
    menuName:'',
    pid:0,
    icon:'',
    path:'',
    sort:'',
    menuType:"1",
    isFrame:"2",
    perms:'',
    component:'',
    visible:"1",
    isCache:"2",
    status:"1",
}

export {
    formConfig,formInit
}