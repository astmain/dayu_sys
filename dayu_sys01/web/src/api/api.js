import {ElMessage} from "element-plus";

async function file_upload_one({file}) {
    let tag = "file_upload_one"
    const data = new FormData();
    data.append('file', file); // 'file' 是后端接收字段名，根据实际情况修改
    let config = {method: "post", url: "/file_upload/file_upload_one", data, headers: {'Content-Type': 'multipart/form-data',}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return res.result
}

async function file_delete({id}) {
    let tag = "file_delete"
    let config = {method: "post", url: "/file_upload/file_delete", data: {id}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return res.result
}


async function file_upload_one_3d({file}) {
    let tag = "file_upload_one_3d"
    const data = new FormData();
    data.append('file', file); // 'file' 是后端接收字段名，根据实际情况修改
    let config = {method: "post", url: "/file_upload/file_upload_one_3d", data, headers: {'Content-Type': 'multipart/form-data',}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return res.result
}


async function file_upload_find_list() {
    let tag = "file_upload_find_list"
    let config = {method: "post", url: "/file_upload/file_upload_find_list",}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return res.result.list
}


//查询_部门职位树
async function find_depart_role_tree() {
    let tag = "find_depart_role_tree"
    let config = {method: "get", url: "/auth/find_depart_role_tree"}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return res.result.depart_position_tree
}

//查询_菜单树权限
async function find_permiss_menu_tree({depart_id = 0}) {
    let tag = "find_permiss_menu_tree"
    let config = {method: "get", url: "/auth/find_permiss_menu_tree", params: {depart_id}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return res.result.menu_tree_permiss
}


//保存_职位_权限_数据
async function role_save({depart_id, name, tree_data}) {
    let tag = "role_save"
    let config = {method: "post", url: "/auth/role_save", data: {depart_id, name, tree_data}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return res.result.menu_tree_permiss
}


//删除_职位
async function role_delete({id}) {
    let tag = "role_delete"
    let config = {method: "get", url: "/auth/role_delete", params: {id}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return
}

//新增_职位
async function role_create({name, id}) {
    let tag = "role_create"
    let config = {method: "get", url: "/auth/role_create", params: {name, id}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return
}

//组织=================================================================================

//新增_组织
async function depart_create({depart, parent_id}) {
    let tag = "depart_create"
    let config = {method: "get", url: "/auth/depart_create", params: {depart, parent_id}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return
}


//删除_组织
async function depart_delete({id}) {
    let tag = "depart_delete"
    let config = {method: "get", url: "/auth/depart_delete", params: {id}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return
}


//更新_组织
async function depart_update({id, name}) {
    let tag = "depart_update"
    let config = {method: "get", url: "/auth/depart_update", params: {id, name}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return
}

//用户==================================================================

// 用户部门树
async function find_departs_tree({id}) {
    let tag = "depart_update"
    let config = {method: "get", url: "/depart/find_departs_tree", params: {id}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return res.result.departs_tree
}


//查询_用户_根据部门id
async function find_user_by_depart_id({depart_id}) {
    let tag = "find_user_by_depart_id"
    let config = {method: "get", url: "/user/find_user_by_depart_id", params: {depart_id}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return res.result.user_list
}


//新增_用户
async function create_user({depart_ids, username, tel}) {
    let tag = "create_user"
    let config = {method: "get", url: "/user/create_user", params: {depart_ids, username, tel}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return
}

//修改_用户
async function update_user({user_id, depart_ids, username, tel}) {
    let tag = "update_user"
    let config = {method: "get", url: "/user/update_user", params: {user_id, depart_ids, username, tel}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return
}


//删除_用户
async function delete_user({user_id}) {
    let tag = "delete_user"
    let config = {method: "get", url: "/user/delete_user", params: {user_id}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return
}

// 购物车=================================================
export async function goods_car_create({name, img_url, num}) {
    let tag = "goods_car_create"
    let config = {method: "post", url: "/goods_car/goods_car_create", data: {name, img_url, num}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return
}

async function goods_car_find_list(callback) {
    let tag = "goods_car_find_list"
    let config = {method: "post", url: "/goods_car/goods_car_find_list", data: {}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    // if (callback)     callback(res)
    return res
}

// 删除-购物车
async function goods_car_del({id}) {
    let tag = "goods_car_del"
    let config = {method: "post", url: "/goods_car/goods_car_del", data: {id}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return
}

// 更新-购物车
async function goods_car_update({name, img_url, num, id}) {
    let tag = "goods_car_update"
    let config = {method: "post", url: "/goods_car/goods_car_update", data: {name, img_url, num, id}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return
}

async function goods_order_create({price, details}) {
    let tag = "goods_car_del"
    let config = {method: "post", url: "/goods_order/goods_order_create", data: {price, details}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return res
}

async function goods_order_find_list() {
    let tag = "goods_order_find_list"
    let config = {method: "post", url: "/goods_order/goods_order_find_list", data: {}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return res
}

async function goods_order_del(id) {
    let tag = "goods_order_del"
    let config = {method: "post", url: "/goods_order/goods_order_del", data: {id}}
    console.log(tag, 'config:', config)
    const res = await axios_api(config)
    console.log(tag, 'res:', res)
    res.code === 200 ? ElMessage.success({message: res.msg, duration: 1000, showClose: true}) : 0
    return res
}


async function img_url_to_base64(img_url) {
    let config = {method: "post", url: `/file_upload/img_url_to_base64` ,data:{img_url:img_url}}
    const res = await axios_api(config)
    console.log(`111---img_url_to_base64:`,     333        )
    return res

}


let api = {
    // tb_depart: require("./tb_depart"),
    // tb_user: require("./tb_user"),
    // tb_menu: require("./tb_menu"),
    // tb_role: require("./tb_role"),
    // 上传文件=====================================
    file_upload_one, file_delete, file_upload_one_3d, file_upload_find_list,
    img_url_to_base64,
    // 扁平化api=====================================
    find_depart_role_tree, find_permiss_menu_tree,
    //角色
    role_create, role_delete, role_save,
    //组织
    depart_create, depart_delete, depart_update,
    //组织
    find_departs_tree,
    // 用户
    create_user, update_user, find_user_by_depart_id, delete_user,
    //购物车
    goods_car_create, goods_car_find_list, goods_car_update, goods_car_del,
    //订单
    goods_order_create,
    goods_order_find_list,
    goods_order_del,


}

window.api = api
export default api