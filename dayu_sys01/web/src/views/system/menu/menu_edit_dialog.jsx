import { defineComponent, createVNode, reactive, render, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm,ElMessage, ElFormItem, ElTree, ElDrawer, ElCheckboxGroup, ElCheckbox } from 'element-plus'

const virtual_node = defineComponent({
  setup(props, ctx) {
    // 基本数据
    let show = $ref(false)
    let form = $ref({ id: 0, menu: "", path: "" })
    let that = () => 0


    // 暴露方法-open
    ctx.expose({
      open: async (item, that_this) => {
        show = true
        that = that_this
        form.id = item.id
        form.menu = item.menu
        form.path = item.path
      },
    })

    function check_form() {
      if (form.menu.length == 0) return ElMessage.error({ message: `菜单名称,不能为空!`, duration: 3 * 1000, showClose: true })
      if (form.path.length == 0) return ElMessage.error({ message: `路径,不能为空!`, duration: 3 * 1000, showClose: true })
      if (form.id <= 0) return ElMessage.error({ message: `id,必须大于0!`, duration: 3 * 1000, showClose: true })
      return true
    }

    async function save_menu() {
      if (!check_form()) return
      form.path = form.path[0] === "/" ? form.path : `/${form.path}`
      let config = { method: 'get', url: `/menu/update`, params: form }
      console.log('config:', config)
      let res = await axios_api(config)
      console.log('res:', res)
      if (res.code == 200) {
        ElMessage.success({ message: `添加成功`, duration: 3 * 1000, showClose: true })
        await that.find_list()
        show = false // 关闭弹窗
      }
    }

    return () => {
      return (
        <>
          <ElDialog v-model={show} title="编辑菜单" width="400px" draggable>
            <ElForm ref="form" v-model={form} label-position="left" label-width="120px">
              <ElFormItem prop="menu" label="菜单名称">
                <ElInput v-model={form.menu} />
              </ElFormItem>
              <ElFormItem prop="path" label="路径">
                <ElInput v-model={form.path} />
              </ElFormItem>
            </ElForm>
            <ElButton type="primary" onclick={async () => { save_menu() }} > 确定 </ElButton>
          </ElDialog>
        </>
      )
    }
  },
})

export default function menu_edit_dialog({ data, that }) {
  dom_open_data({ ui_id: 'menu_edit_dialog', virtual_node, data, that })
}


