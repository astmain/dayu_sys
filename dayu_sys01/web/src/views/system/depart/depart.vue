<template>
  <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>

  <div style="display: flex;">

    <!-- 部门树 -->
    <div>
      <el-button @click="find_depart_role_tree()">find_depart_role_tree</el-button>
      <el-tree ref="tree_depart_ref" style="width:300px ;height: 500px; ;overflow: auto;" :data="tree_depart.data"
        :props="tree_depart.props" :node-key="tree_depart.props.nodeKey" :current-node-key="currentNodeKey"
        @node-click="tree_left_click" @node-contextmenu="tree_ritht_click" :expand-on-click-node="false"
        highlight-current default-expand-all>
      </el-tree>
    </div>






    <el-card v-show="menu_show" :style="{ position: 'fixed', left: menu_left + 'px', top: menu_top + 'px' }"
      :body-style="{ padding: '12px' }">
      <div v-for="(item, i) in menu_opt">
        <div style="margin-top: 8px;" @click="menu_opt_click(item)">{{ item.title }}</div>
      </div>
    </el-card>
  </div>


  <!-- 权限-编辑-职位 -->
  <!-- <el-drawer v-model="tree_permiss.show" size="600px" title="权限-编辑-职位" :modal="false" direction="rtl"> -->
  <el-dialog v-model="tree_permiss.show" width="600px" height="600px" title="权限-编辑-职位" draggable>
    <div style="display: flex; gap: 20px;">
      <el-input v-model="tree_permiss.name"></el-input>
      <el-button type="primary" @click="role_save()">保存</el-button>
    </div>
    <el-tree style="width:500px" :data="tree_permiss.data" :props="tree_permiss.props" :node-key="tree_permiss.props.id"
      :expand-on-click-node="false" highlight-current default-expand-all>
      <template #default="{ node, data }">
        <div
          style="flex:1;display: flex;align-items: center;justify-content: space-between;font-size: 14px;padding-right: 8px;">
          <span style="margin-right: 20px">{{ node.label }}</span>
          <div style="display: flex;gap:20px">
            <div :class="{ btn_isactive: data.view }" @click="btn_click(data, 'view')">显示</div>
            <div :class="{ btn_isactive: data.create }" @click="btn_click(data, 'create')">添加</div>
            <div :class="{ btn_isactive: data.delete }" @click="btn_click(data, 'delete')">删除</div>
            <div :class="{ btn_isactive: data.update }" @click="btn_click(data, 'update')">修改</div>
            <div :class="{ btn_isactive: data.find }" @click="btn_click(data, 'find')">查询</div>
          </div>
        </div>
      </template>
    </el-tree>
  </el-dialog>
  <!-- </el-drawer> -->








</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      currentNodeKey: null,
      // 数据_部门树
      tree_depart: {
        props: {
          children: 'children',
          label: 'name',
          nodeKey: 'uuid'
        },

        data: [],
        node: {},
        user_list: [],
      },


      // 数据_权限树
      tree_permiss: {
        show: false,
        props: {
          children: 'children',
          label: 'name',
          nodeKey: 'id'
        },
        data: [],
        node: {},
        name: "",
      },




      // 数据_右键菜单
      menu_show: false,
      menu_left: 0,
      menu_top: 0,
      menu_original: [
        // 组织
        { is_depart: true, title: "修改-组织" },
        { is_depart: true, title: "新增-组织" },
        { is_depart: true, title: "删除-组织" },
        { is_depart: true, title: "新增-职位" },
        // 职位

        { is_depart: false, title: "修改-角色-权限" },
        { is_depart: false, title: "删除-角色" },

      ],
      menu_opt: [
      ],
    }
  },
  methods: {
    //查询_部门职位树
    async find_depart_role_tree() {
      let depart_position_tree = await api.find_depart_role_tree()
      console.log('depart_position_tree---:', depart_position_tree)
      this.tree_depart.data = depart_position_tree
    },//


    // 菜单左键点击
    async tree_left_click(node) {
      console.log('tree_left_click---node:', JSON.parse(JSON.stringify(node)))
      this.menu_show = false
      this.tree_permiss.name = node.name
      // 组织情况

      this.tree_depart.node = node


      // 职位情况
      if (node.is_depart === false) {
        this.tree_permiss.data = await api.find_permiss_menu_tree({ depart_id: node.id })
        this.tree_depart.node = node
      } else {
      }




      console.log('tree_depart.node.name---:', this.tree_depart.node)


    },//


    // 菜单右键点击
    async tree_ritht_click(event, data, Node, element) {
      this.tree_permiss.name = data.name
      this.tree_left_click(data)
      this.menu_show = true
      this.menu_left = event.x
      this.menu_top = event.y
      console.log('   this.$refs---:', this.$refs)
      this.$refs.tree_depart_ref.setCurrentKey(data.id)//右键点击时高亮
      this.tree_depart.node = data
      this.menu_opt = this.menu_original.filter(item => item.is_depart === data.is_depart)
    },//


    // 菜单-选项-点击
    async menu_opt_click(item) {
      console.log('menu_opt_click:', JSON.parse(JSON.stringify(item)))
      // 组织=================================================================
      //组织:修改-组织
      if (item.is_depart && item.title === "修改-组织") {
        require('./depart_update_dialog.jsx')({ title: item.title, state: { id: this.tree_depart.node.id, name: this.tree_depart.node.name }, that: this, })
      }

      //组织:新增-职位
      else if (item.is_depart && item.title === "新增-职位") {
        require('./position_create_dialog.jsx')({ title: "新增-职位", state: { id: this.tree_depart.node.id }, that: this, })
      }

      // 组织:新增-组织
      else if (item.is_depart && item.title === "新增-组织") {
        require('./depart_create_dialog.jsx')({ title: "新增-组织", state: { parent_id: this.tree_depart.node.id }, that: this, })
      }
      //组织:删除-组织
      else if (item.is_depart && item.title === "删除-组织") {
        let confirm = await ElMessageBox.confirm('确定删除吗', '删除提示', { cancelButtonText: '取消', confirmButtonText: '删除' })
        if (confirm != 'confirm') return
        await api.depart_delete({ id: this.tree_depart.node.id })
        await this.find_depart_role_tree()
      }
      // 角色=================================================================
      //角色:修改-角色-权限
      else if (!item.is_depart && item.title === "修改-角色-权限") {
        this.tree_permiss.show = true
        await this.find_depart_role_tree()
      }
      // 角色:删除-角色
      else if (!item.is_depart && item.title === "删除-角色") {
        if (await isok_delete_confirm() === false) return
        await api.role_delete({ id: this.tree_depart.node.id })
        await this.find_depart_role_tree()
      } else {
        alert("等待开发!或者item.title有改动")
      }
    },



    //保存_职位_权限_数据
    async role_save() {
      console.error('111---tree_permiss.data:', JSON.parse(JSON.stringify(this.tree_permiss.data)))
      let depart_id = this.tree_depart.node.id//其实就是部门职位id
      let name = this.tree_permiss.name
      let res = await api.role_save({ depart_id, name, tree_data: this.tree_permiss.data })
      this.tree_permiss.show = false
      await this.find_depart_role_tree()
    },//


    async btn_click(data, kind) {
      console.log('btn_click:', data, kind)
      if (data[kind]) {
        data[kind] = !data[kind]
      } else {
        data[kind] = true
      }
    },

  },////

  async mounted() {
    this.find_depart_role_tree()
    document.body.addEventListener("click", () => {
      this.menu_show = false
    })
  },////

}
</script>
<style scoped>
.btn_isactive {
  color: green;
}
</style>