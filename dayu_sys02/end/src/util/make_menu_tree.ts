export default function make_menu_tree({tel, tb_role, tb_menu, role_user, role_menu,}) {
    let userRoles = role_user.filter(ru => ru.username === tel).map(ru => ru.role)
    // console.log(`111---userRoles:`, userRoles)
    let userMenus = role_menu.filter(rm => userRoles.includes(rm.role)).map(rm => rm.menu)
    // console.log(`222---userMenus:`, userMenus)
    let menus = tb_menu.filter(m => userMenus.includes(m.menu))

    // 如果是超级管理查看全部菜单
    if (tel === "15160315110") menus = tb_menu


    function buildMenuTree(menus, parent = "") {
        return menus.filter(item => item.parent === parent)
            .map(item => ({
                id: item.id,
                menu: item.menu,
                path: item.path,
                children: buildMenuTree(menus, item.menu)
            }))
            .filter(item => item !== null);
    }

    return buildMenuTree(menus)
}