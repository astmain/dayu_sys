// 用户的部门关系
export default  function build_user_depart_opt_val(id, data) {
    const result: any = [];

    function findParents(currentId) {
        const current = data.find(item => item.id === currentId);
        if (current && current.parent_id !== 0) {
            result.push(current.parent_id);
            findParents(current.parent_id);
        }
    }

    findParents(id);
    result.push(id)
    return result.sort();
}