//*- coding = utf-8 -*-
//@Time : 2022-09-12 0:10
//@Author : 沉默小管
//@File : hasPermi.jsx
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {useUser} from "@/store/index";
import {App} from "vue";
//权限

export default (app:App)=>{
    app.directive("hasPower", {
        mounted(instance: any, binding:any) {
            const { value } = binding
            const all_permission = "*:*:*";
            const permissions = useUser().permissions
            if (value && value instanceof Array && value.length > 0) {
                const permissionFlag = value

                const hasPermissions = permissions.some((permission: string) => {
                    return all_permission === permission || permissionFlag.includes(permission)
                })

                if (!hasPermissions) {
                    instance.parentNode && instance.parentNode.removeChild(instance);
                }
            } else {
                // throw new error(`请设置操作权限标签值`)
            }
        }
    })
};