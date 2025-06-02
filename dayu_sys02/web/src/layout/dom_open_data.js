import { createVNode, render } from 'vue'

export default function dom_open({ ui_id, virtual_node, data }) {
  //   console.log('open---', { ui_id, virtual_node, data })
  // 删除旧的vn
  document.querySelector(`.${ui_id}`) ? document.querySelector(`.${ui_id}`).remove() : 0

  // 创建新的虚拟dom
  const v_node = createVNode(virtual_node)
  const element_new = document.createElement('div')
  element_new.id = ui_id
  document.body.appendChild((render(v_node, element_new), element_new))

  // 调用vn暴露的方法
  v_node.component.exposed.open(data)
}
