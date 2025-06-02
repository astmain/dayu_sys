// 扁平化数据-部门权限按钮
export default function build_departs_permiss_btn_flat({ arr, user_id = 0, is_del_id = true }) {
    arr = JSON.parse(JSON.stringify(arr))
    let result = []
    for (let index = 0; index < arr.length; index++) {
        const brr = arr[index];
        let list = brr.list
        result = [...result, ...list]

    }
    // console.log('result---:', result)
    return result.map(o => {
        if (is_del_id) delete o.id//删除字段id
        o['user_id'] = user_id
        return o
    })
}