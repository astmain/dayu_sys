import { defineComponent, createVNode, reactive, render, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElForm, ElFormItem, ElTree, ElDrawer, ElCheckboxGroup, ElCheckbox } from 'element-plus'
import dom_open from './dom_open_data.js'

const virtual_node = defineComponent({
  props: { data: { default: {}, required: false }, that: { default: null, required: false } },
  setup(props, ctx) {
    // 基础数据
    let show = $ref(false) //显示隐藏
    let form = $ref({ menu: '', path: '', parent_menu: props.data.menu, parent_path: props.data.path }) // 表单数据

    ctx.expose({
      open: async () => {
        show = true
      },
    })

    let user_list = $ref([])

    async function get_user_list() {
      let res = await axios_api({ method: 'get', url: '/auth/admin_super', })
      console.log('res:', res)
      user_list = res.result
    }

    async function select_user(item) {
      console.log('select_user---item:', JSON.parse(JSON.stringify(item)))
      let config = { method: 'get', url: '/auth/login', params: item}
      let res = await axios_api(config)
      console.log('res:', res)
      localStorage.setItem('token', res.result.token)
      BUS.user = res.result
    }

    get_user_list()


    return () => {
      return <ElDialog v-model={show} title="超级管理员-切换账号" width="400px" draggable>
        <h3>新增子菜单</h3>
        <ul>
          {user_list.map(item => {
            return <li style="display: flex;align-items: center;justify-content: space-between; margin-bottom: 10px;">
              <span>{item.username}</span>
              <ElButton type="primary" onClick={() => { select_user(item) }}>切换</ElButton>
            </li>
          })}
        </ul>

      </ElDialog>


    }





  },
})

export default function menu_add_child_dialog({ data, that }) {
  dom_open({ ui_id: 'menu_add_child_dialog', virtual_node, data, that })
}
