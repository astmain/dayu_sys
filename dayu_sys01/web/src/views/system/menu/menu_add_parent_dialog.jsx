import { defineComponent, createVNode, reactive, render, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm, ElMessage, ElFormItem, ElTree, ElDrawer, ElCheckboxGroup, ElCheckbox } from 'element-plus'

const virtual_node = defineComponent({
  props: { data: { default: {}, required: false }, that: { default: null, required: false } },
  setup(props, ctx) {
    // 基础数据
    let show = $ref(false) //显示隐藏
    let form = $ref({ menu: '', path: '', parent_id: 0 }) // 表单数据
    let that = () => 0

    ctx.expose({
      open: async (data, that_this) => {
        show = true
        that = that_this
      },
    }) // 暴露方法-open


    function check_form() {
      if (form.path.length == 0) return ElMessage.error({ message: `菜单名称,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      if (form.menu.length == 0) return ElMessage.error({ message: `路径,不能为空!`, duration: 3 * 1000, showClose: true }) //检查表单
      if (form.parent_id != 0) return ElMessage.error({ message: `父菜单名parent_id必须为0`, duration: 3 * 1000, showClose: true }) //检查表单
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
          <ElDialog v-model={show} title="新增父菜单" width="400px" draggable>
            <ElForm v-model={form} label-width="120px" label-position="left">
              <ElFormItem label="[父]菜单名称">
                <ElInput v-model={form.menu} />
              </ElFormItem>

              <ElFormItem label="[父]路径">
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

export default function menu_add_parent_dialog({ data, that }) {
  dom_open_data({ ui_id: 'menu_add_parent_dialog', virtual_node, data, that })
}
