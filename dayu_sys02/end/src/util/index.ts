import R from "./R"
import make_menu_tree from "./make_menu_tree"
import menu_get_menus_flat_by_user_id from "./menu_get_menus_flat_by_user_id"
import menu_get_menus_tree from "./menu_get_menus_tree.js"
import {Dec_public} from "./Dec_public";
import get_menus_flat_by_role_id from "./make_menus_flat_by_role_id";

import make_menus_flat_by_role from "./make_menus_flat_by_role";

//     树桩结构
import build_departs_tree from "./build_departs_tree";
import build_user_depart_opt_val from "./build_user_depart_opt_val";
import build_depart_menu_btn from "./build_depart_menu_btn";
let util = {
    R: R,
    make_menu_tree,
    make_menus_flat_by_role,
    menu_get_menus_flat_by_user_id,
    get_menus_flat_by_role_id,
    menu_get_menus_tree,
    Dec_public,

//     树桩结构
    build_departs_tree,
    build_user_depart_opt_val,
    build_depart_menu_btn,
}

export default util