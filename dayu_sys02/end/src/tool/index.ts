import Dec_public from "./Dec_public"
import {Get_form} from "./Get_form"
import R from "./R"
import build_tree from "./build_tree"
import build_tree_ids from "./build_tree_ids"
import build_tree_arr_flat from "./build_tree_arr_flat";
import crypt_encode_md5 from "./crypt_encode_md5";
import build_tree_depart_role from "./build_tree_depart_role";

import * as _ from "lodash";

//     树桩结构

let tool = {

    R,
    // 装饰圈========================
    Dec_public,
    Get_form: Get_form,
    // 数据处理=========================
    build_tree,
    build_tree_ids,
    build_tree_arr_flat,
    build_tree_depart_role,

    // 加解密=========================
    crypt_encode_md5,


    //好用的函数
    _,//lodash


}

export default tool