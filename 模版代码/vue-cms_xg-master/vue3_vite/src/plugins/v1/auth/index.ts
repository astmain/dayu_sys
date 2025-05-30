/*- coding = utf-8 -*-
@Time : 2022/9/25 17:30
@Author : CSDN 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
// 鉴权

import {useUser} from "@/store/index";
import {permsEnum} from "@/utils/enum";

function authPermission(permission:any) {
    const userStore = useUser()
    const all_permission = "*:*:*";
    const permissions = userStore.permissions

    if (permission && permission.length > 0) {
        if(userStore.roles.includes(permsEnum.testPerms)){
            return true;
        }else{
            return permissions.some(v => {
                return all_permission === v || v === permission
            })
        }
    } else {
        return false
    }
}

function authRole(role:any) {
    const userStore:any = useUser()
    const super_admin = permsEnum.adminPerms;
    const roles = userStore.roles
    if (role && role.length > 0) {
        return roles.some((v:any) => {
            return super_admin === v || v === role
        })
    } else {
        return false
    }
}

export default {
    // 验证用户是否具备某权限
    hasPermi(permission:any) {
        return authPermission(permission);
    },
    // 验证用户是否含有指定权限，只需包含其中一个
    hasPermiOr(permissions:any) {
        return permissions.some((item:any) => {
            return authPermission(item)
        })
    },
    // 验证用户是否含有指定权限，必须全部拥有
    hasPermiAnd(permissions:any) {
        return permissions.every((item:any) => {
            return authPermission(item)
        })
    },
    // 验证用户是否具备某角色
    hasRole(role:any) {
        return authRole(role);
    },
    // 验证用户是否含有指定角色，只需包含其中一个
    hasRoleOr(roles:any) {
        return roles.some((item:any) => {
            return authRole(item)
        })
    },
    // 验证用户是否含有指定角色，必须全部拥有
    hasRoleAnd(roles:any) {
        return roles.every((item:any) => {
            return authRole(item)
        })
    }
}
