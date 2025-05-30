//*- coding = utf-8 -*-
//@Time : 2023-04-03 10:58
//@Author : 沉默小管
//@File : useTreeFunc.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
//tree 功能钩子
export const useTreeFunc = (formModel)=>{
    //el-tree 选中的节点的key数组
    const handleCurrentChecked = (nodeObj, SelectedObj) => {
        formModel.value.menuIds=SelectedObj.checkedKeys
    }
    return {
        handleCurrentChecked
    }
}