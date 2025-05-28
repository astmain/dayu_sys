import { h, render, reactive, ref, defineComponent, createVNode } from 'vue'


function vue_dialog(v_node, props) {
    document.querySelector(`.aaa`) ? document.querySelector(`.aaa`).remove() : 0
    let container = document.createElement('div')
    container.className = 'aaa'
    document.body.appendChild(container)
    render(h(v_node, props), container)
}



function make(app) {
    window.vue_dialog = vue_dialog
}

export default make