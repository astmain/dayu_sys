// 生成菜单树

//调用方式 const menuTree = menu_get_menus_tree({menus:menus_flat});
export default function menu_get_menus_tree({menus, key_id = "menu_id", parentId = 0, parentPath = ''}) {


    menus = JSON.parse(JSON.stringify(menus))
    const menu_tree: any = []
    for (const o of menus) {
        if (o.parent_id === parentId) {
            const children = menu_get_menus_tree({menus, parentId: o[key_id], parentPath: o.path});
            if (children.length > 0) {
                o.children = children;
                o.children.forEach(child => {
                    //自定义children中的字段
                    child.parent_id = o[key_id];
                    child.parent_menu = o.menu;
                    child.parent_name = o.name;
                    child.parent_path = o.path;
                    child.path_full = o.path + child.path

                });
            }
            //自定义children中的字段
            o.name = o.menu;
            o.path_full = o.path;
            menu_tree.push(o);
        }
    }
    return menu_tree;
}

