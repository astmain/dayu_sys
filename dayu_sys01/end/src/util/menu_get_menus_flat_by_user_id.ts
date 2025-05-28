// 菜单扁平根据用户id
export default function menu_get_menus_flat_by_user_id({tb_menu, role_user, role_menu, user_id}) {
    // 1. 获取用户的所有角色ID
    const userRoles = role_user
        .filter(ru => ru.user_id === user_id)
        .map(ru => ru.role_id);
    // console.log("userRoles-------------------", userRoles)

    // 2. 获取这些角色对应的菜单ID
    const menuIds = role_menu
        .filter(rm => userRoles.includes(rm.role_id))
        .map(rm => rm.menu_id);
    // console.log("menuIds-------------------", menuIds)


    // 3. 获取对应的菜单项
    let menu_flat = tb_menu.filter(menu => menuIds.includes(menu.id));
    // console.log("menus-------------------", menus)

    if (user_id === 1) {
        console.log(`管理员---查看--菜单---user_id:`, user_id)
        menu_flat = tb_menu
    }


    return menu_flat
}