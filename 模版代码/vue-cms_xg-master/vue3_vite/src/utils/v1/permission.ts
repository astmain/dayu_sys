/*- coding = utf-8 -*-
@Time : 2023/8/25 15:51
@Author : 管茂良
@File : permission.ts
@web  : www.php-china.com
@Software: WebStorm
*/
import {useStore} from "@/store/piniaAutoImport";

/**
 * 字符权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkPermission(value) {
    let userStore = useStore("useUser")
    if (value && value instanceof Array && value.length > 0) {
        const permissions = userStore.permissions
        const permissionDatas = value
        const all_permission = "*:*:*";

        const hasPermission = permissions.some(permission => {
            return all_permission === permission || permissionDatas.includes(permission)
        })
        if (!hasPermission) {
            return false
        }
        return true
    } else {
        return false
    }
}
