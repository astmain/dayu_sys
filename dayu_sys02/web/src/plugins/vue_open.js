import { defineComponent, createVNode, reactive, render, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm, ElMessage, ElFormItem, ElTree, ElDrawer, ElCheckboxGroup, ElCheckbox } from 'element-plus'




function vue_defineComponent(callback) {
    return defineComponent({
        setup: callback
    })
}



function vue_open({ ui_id = 'vue_open', state, that, callback, arg, }) {
    // 删除旧的vn
    document.querySelector(`.${ui_id}`) ? document.querySelector(`.${ui_id}`).remove() : 0
    // 创建新的虚拟dom
    const v_node = createVNode(vue_defineComponent(callback))
    const element_new = document.createElement('div')
    element_new.id = ui_id
    document.body.appendChild((render(v_node, element_new), element_new))
    // 暴露方法
    v_node.component.exposed.open({ state, that, arg })
}

function make(app) {
    window.vue_open = vue_open
}

export default make