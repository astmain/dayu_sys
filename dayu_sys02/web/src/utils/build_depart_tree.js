// build_depart_tree(tb_depart)
export default  function build_depart_tree(departments) {
    // 创建一个映射来存储所有部门
    const departMap = new Map();
    const tree = [];

    // 首先将所有部门放入映射中
    departments.forEach(dept => {
        departMap.set(dept.id, {
            ...dept,
            children: []
        });
    });

    // 构建树结构
    departments.forEach(dept => {
        const node = departMap.get(dept.id);
        if (dept.parent_id === 0) {
            // 如果是根节点，直接添加到树中
            tree.push(node);
        } else {
            // 如果不是根节点，添加到父节点的children中
            const parent = departMap.get(dept.parent_id);
            if (parent) {
                parent.children.push(node);
            }
        }
    });

    return tree;
}
