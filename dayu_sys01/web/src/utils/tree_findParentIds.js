// 根据 id 20021 得到所有父级 id   返回一个数组         tree_findParentIds(data, 20021);
export default  function tree_findParentIds(data, targetId) {
    data = JSON.parse(JSON.stringify(data))
    const result = [];

    function search(items, targetId, parentIds = []) {
        for (const item of items) {
            if (item.id === targetId) {
                result.push(...parentIds);
                return true;
            }
            if (item.children && item.children.length > 0) {
                if (search(item.children, targetId, [...parentIds, item.id])) {
                    return true;
                }
            }
        }
        return false;
    }

    search(data, targetId);
    return result;
}