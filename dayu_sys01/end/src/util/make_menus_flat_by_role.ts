// get_menu_tree({role_id: 1, role_menu, tb_menu})
// 根据角色id获取菜单扁平数据
export default function make_menus_flat_by_role({role, role_menu, tb_menu}) {
    let menu_ids = role_menu.filter(rm => rm.role == role).map(rm => rm.menu_id)
    console.log("menu_ids-------------------", menu_ids)


    // 3. 获取对应的菜单项
    let menus_flat = tb_menu.filter(menu => menu_ids.includes(menu.id));
    console.log("menus_flat-------------------", menus_flat)
    return menus_flat
}
