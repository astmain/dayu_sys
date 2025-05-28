
async function isok_delete_confirm() {
    try {
        let confirm = await ElMessageBox.confirm('确定删除吗', '删除提示', { cancelButtonText: '取消', confirmButtonText: '删除' })
        if (confirm != 'confirm') return true
        return true
    } catch (error) {
        return false
    }
}


export default function make(app) {
    window.isok_delete_confirm = isok_delete_confirm
}

