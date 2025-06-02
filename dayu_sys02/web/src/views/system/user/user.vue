<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
    <el-button @click="find_departs_tree()">find_departs_tree</el-button>
    <el-button @click="create_user_dialog()">create_user_dialog</el-button>
    <div style="display:flex">
      <!-- 部门树 -->
      <el-tree ref="tree_depart_ref2" style="width:300px ;height: 500px; ;overflow: auto;" :data="tree_left_depart.data"
        :props="tree_left_depart.props" :node-key="tree_left_depart.props.nodeKey"
        :current-node-key="tree_left_depart.currentNodeKey" @node-click="tree_left_depart_node_click"
        :expand-on-click-node="false" highlight-current default-expand-all>
      </el-tree>

      <!-- 用户列表 -->
      <el-table :data="table_data_user_list" style="width: 100%" size="default" border highlight-current-row
        show-overflow-tooltip>
        <el-table-column label="序号" type="index" width="60px" />
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="手机" prop="tel" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-popover placement="bottom" width="auto" trigger="click">
              <template #reference>
                <el-button>操作</el-button>
              </template>
              <el-button v-for="(item, i) in dropdown_opt" :key="i" @click="dropdown_opt_click(item.title, scope.row)"
                :type="item.type">{{ item.title }} </el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>

    </div>



    <!--dialog-新增用户 -->
    <el-dialog v-if="show.create" v-model="show.create" title="新增用户" width="500px" draggable>
      <div style="display: flex;">
        <el-tree ref="tree_depart_create_dialog_ref" style="width:300px ;height: 500px; ;overflow: auto;"
          :data="tree_depart_create_dialog.data" show-checkbox :props="tree_depart_create_dialog.props"
          :node-key="tree_depart_create_dialog.props.nodeKey"
          :current-node-key="tree_depart_create_dialog.currentNodeKey" :expand-on-click-node="false" highlight-current
          default-expand-all>
        </el-tree>
        <div>
          <el-button type="primary" @click="form_user_update.submit('create')">新增用户</el-button>
          <com_form_input ref="com_form_ref" :form_info="form_user_update" />
        </div>

      </div>
    </el-dialog>



    <!--dialog-修改 -->
    <el-dialog v-if="show.update" v-model="show.update" title="修改用户" width="500px" draggable>
      <div style="display: flex;">
        <el-tree ref="tree_depart_update_dialog_ref" style="width:300px ;height: 500px; ;overflow: auto;"
          :data="tree_depart_update_dialog.data" show-checkbox :props="tree_depart_update_dialog.props"
          :node-key="tree_depart_update_dialog.props.nodeKey"
          :current-node-key="tree_depart_update_dialog.currentNodeKey" :expand-on-click-node="false" highlight-current
          default-expand-all>
        </el-tree>
        <div>
          <el-button type="primary" @click="form_user_update.submit('update')">修改保存</el-button>
          <com_form_input ref="com_form_ref" :form_info="form_user_update" />
        </div>


      </div>
    </el-dialog>


  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  components: {
  },
  data() {
    return {
      // 表单_用户_更新
      form_user_update: {
        data: { username: '', tel: "", },
        desc: {
          username: { label: "用户名", value: "111", type: "input", width_label: "60px" },
          tel: { label: "电话", value: "111", type: "input", width_label: "60px" },
        },
        rules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          tel: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        },
        submit: async (kind) => {
          // 前置检查参数
          if (await this.$refs.com_form_ref.check() === false) return
          // 更新用户
          if (kind === 'update') {
            let depart_list = this.$refs.tree_depart_update_dialog_ref.getCheckedNodes()
            let depart_ids = depart_list.filter(item => item.is_depart == false).map(item => item.id)
            if (depart_ids.length <= 0) return ElMessage.error('部门角色不能为空')
            console.log('this.$refs.com_form_ref.data---:', this.$refs.com_form_ref.data)
            let {username,tel} = this.$refs.com_form_ref.get_data()
            let res = await api.update_user({ user_id: this.curr_user.id, depart_ids: JSON.stringify(depart_ids), username, tel, })
            console.log('res---:', res)
          }
          // 新增用户
          else if (kind === 'create') {
            let username = this.$refs.com_form_ref.data.username
            let tel = this.$refs.com_form_ref.data.tel
            let depart_list = this.$refs.tree_depart_create_dialog_ref.getCheckedNodes()
            let depart_ids = depart_list.filter(item => item.is_depart == false).map(item => item.id)
            if (depart_ids.length <= 0) return ElMessage.error('部门角色不能为空')
            let res = await api.create_user({ username, tel, depart_ids: JSON.stringify(depart_ids), })
            console.log('res---:', res)
          } else {
            alert(`kind未发现if选项---${kind}`)
          }
          // 刷新部门树
          this.find_departs_tree()
          this.show.create = false
          this.show.update = false
        },
      },
      table_data_user_list: [],
      show: {
        create: false,
        update: false,
      },

      curr_user: {},


      dropdown_opt: [
        { title: "修改", type: "primary" },
        { title: "详情", type: "info" },
        { title: "删除", type: "danger" },
      ],

      form: {
        username: "",
        tel: "",
      },


      // 左侧_部门树
      tree_left_depart: {
        props: {
          children: 'children',
          label: 'name',
          nodeKey: 'id'
        },
        currentNodeKey: null,
        data: [],
        node: {},
      },


      // 弹框_新增_部门树
      tree_depart_create_dialog: {
        props: {
          children: 'children',
          label: 'name',
          nodeKey: 'uuid',
          disabled: "is_depart",
        },
        currentNodeKey: null,
        data: [],
        node: {},
      },



      // 弹框_更新_部门树
      tree_depart_update_dialog: {
        props: {
          children: 'children',
          label: 'name',
          nodeKey: 'id',
          disabled: "is_depart",
        },
        currentNodeKey: null,
        data: [],
        node: {},
      },
    }


  },

  methods: {
    async find_departs_tree() {
      this.tree_left_depart.data = await api.find_departs_tree({ id: 1 })
      console.log('this.tree_left_depart.data---:', this.tree_left_depart.data)
    },//

    // 左侧_部门树_点击
    async tree_left_depart_node_click(node) {
      console.log('111---tree_left_depart_node_click---node:', node)
      let depart_id = node.id
      this.table_data_user_list = await api.find_user_by_depart_id({ depart_id })
    },//


    //下拉操作
    async dropdown_opt_click(title, row) {
      console.log('dropdown_opt_click---title:', title)
      console.log('dropdown_opt_click---row:', row)
      if (title === "删除") {
        if (await isok_delete_confirm() === false) return
        console.log('删除---row:', row)
        await api.delete_user({ user_id: row.id })
        await this.find_departs_tree()
      } else if (title === "修改") {
        this.tree_depart_update_dialog.data = await api.find_depart_role_tree()
        this.show.update = true
        this.curr_user = row
        this.form_user_update.data.username = row.username
        this.form_user_update.data.tel = row.tel
        await new Promise((resolve) => setTimeout(resolve, 100))
        this.$refs.tree_depart_update_dialog_ref.setCheckedKeys(row.depart_ids);
      } else if (title === "详情") {
        alert('详情-等待开发')
      }
    },//



    //新增_用户_弹窗
    async create_user_dialog() {
      this.show.create = true
      let depart_position_tree = await api.find_depart_role_tree()
      console.log('depart_position_tree---:', depart_position_tree)
      this.tree_depart_create_dialog.data = depart_position_tree
    },//
    tree_left_click() {
    },//

    tree_ritht_click() {
    },//  

  },////

  async mounted() {
    await this.find_departs_tree()
  },////

}
</script>

<style scoped>
/* .nnn{

} */
</style>