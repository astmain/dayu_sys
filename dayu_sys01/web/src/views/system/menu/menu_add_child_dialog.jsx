import { defineComponent, createVNode, reactive, render, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm, ElMessage, ElFormItem, ElTree, ElDrawer, ElCheckboxGroup, ElCheckbox } from 'element-plus'

const virtual_node = defineComponent({
  setup(props, ctx) {
    // 基础数据
    let show = $ref(false) //显示隐藏
    let that = () => 0
    let form = $ref({ menu: '', path: '', parent_id: "", parent_menu: "" }) // 表单数据
    // 暴露方法-open
    ctx.expose({
      open: async (item, that_this) => {
        console.log('open---item:', item)
        show = true
        that = that_this
        form.parent_id = item.id
        form.parent_menu = item.menu
      },
    })


    function check_form() {
      if (form.path.length == 0) return ElMessage.error({ message: `菜单名,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      if (form.menu.length == 0) return ElMessage.error({ message: `路径,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      if (form.parent_id.length == 0) return ElMessage.error({ message: `父菜单名,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      // if (form.parent_path.length == 0) return ElMessage.error({ message: `父路径,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      return true
    }


    async function add_menu_parent() {
      if (!check_form()) return
      form.path = form.path[0] === "/" ? form.path : `/${form.path}`
      let config = { method: 'get', url: `/menu/add`, params: form }
      console.log('config   :', config)
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
          <ElDialog v-model={show} title="新增子菜单" width="400px" draggable>
            <ElForm v-model={form} label-width="120px" label-position="left" >
              <ElFormItem label="[父]菜单名称">
                <ElInput v-model={form.parent_menu} disabled />
              </ElFormItem>
              {/* <ElFormItem label="[父]路径">
                <ElInput v-model={form.parent_path} disabled />
              </ElFormItem> */}

              <ElFormItem label="[子]菜单名称">
                <ElInput v-model={form.menu} />
              </ElFormItem>

              <ElFormItem label="[子]路径">
                <ElInput v-model={form.path} />
              </ElFormItem>
            </ElForm>

            <ElButton
              type="primary"
              onclick={async () => {
                add_menu_parent()
              }}
            >
              确定
            </ElButton>
          </ElDialog>
        </>
      )
    }
  },
})

export default function menu_add_child_dialog({ data, that }) {
  dom_open_data({ ui_id: 'menu_add_child_dialog', virtual_node, data, that })
}
