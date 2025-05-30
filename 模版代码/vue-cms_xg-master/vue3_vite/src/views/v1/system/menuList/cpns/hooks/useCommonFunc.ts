/*- coding = utf-8 -*-
@Time : 2023/4/1 16:34
@Author : 沉默小管
@File : useRightToolBarFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

export const useCommonFunc = (formModel:any,popoverRef:any)=>{
    // 选择图标
    const handleSelected = (name:string) =>{
        formModel.value.icon = name;
        unref(popoverRef)?.hide()
    }

    /** 转换菜单数据结构 */
    const normalizer = (node:any) => {
        if (node.children && !node.children.length) {
            delete node.children;
        }
        return {
            id: node.id,
            label: node.menuName,
            children: node.children
        };
    }
    return {
        handleSelected,normalizer
    }
}