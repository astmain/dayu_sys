//*- coding = utf-8 -*-
//@Time : 2022-09-12 0:10
//@Author : 沉默小管
//@File : hasRole.jsx
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {useUser} from "@/store/index";
import {App} from "vue";
import {permsEnum} from "@/utils/enum";
//角色
export default (app:App)=>{
    app.directive("hasRole", {
        created(el: any, binding:any) {
            const { value } = binding
            const super_admin = permsEnum.adminPerms;
            const roles = useUser().roles

            if (value && value instanceof Array && value.length > 0) {
                const roleFlag = value

                const hasRole = roles.some((role: string) => {
                    return super_admin === role || roleFlag.includes(role)
                })

                if (!hasRole) {
                    el.parentNode && el.parentNode.removeChild(el)
                }
            } else {
                // throw new error(`请设置角色权限标签值"`)
            }
        }
    })
};
