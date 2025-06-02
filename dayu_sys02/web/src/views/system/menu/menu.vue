<template>
  <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>
  <!-- 搜索工具栏 -->
  <ul class="css_toolbar1">
    <li>
      <title style="width: 50px;">菜单</title>
      <el-input style="width: 120px;" v-model="form.menu" />
    </li>
    <li>
      <title style="width: 50px;">路径</title>
      <el-input style="width: 120px;" v-model="form.path" />
    </li>

    <el-button type='primary' @click='find_list()'>搜索</el-button>
    <el-button type='' @click="; (form = { menu: '', path: '' }), find_list()">清空</el-button>
    <el-button type="primary" plain @click="menu_add_parent_dialog()">添加</el-button>
  </ul>


  <!-- 菜单树状结构 -->
  <el-tree :data="tree.data" show-checkbox node-key="menu" default-expand-all :expand-on-click-node="false">
    <template #default="{ node, data }">
      <div style="width: 100%;" @contextmenu.prevent.stop="menu_target_click($event, data, node)"> {{ data.menu }}
      </div>
    </template>
  </el-tree>


  <!-- 右键菜单 -->
  <VueSimpleContextMenu elementId="VueSimpleContextMenu" :options="ContextMenu.opt" ref="VueSimpleContextMenu_ref"
    @option-clicked="menu_opt_click" />
</template>
<script>
export default {
  data() {
    return {
      name: "数据1",
      form: { menu: "", path: "" },
      tree: {
        data: [{ menu: '1111', children: [{ menu: '222' }] }],
        data_chooseed: [],
      },
      ContextMenu: {
        opt: [{ name: '编辑' }, { name: '添加子菜单' }, { name: '', type: 'divider' }, { name: '删除' }],
      },
    }
  },

  methods: {
    async menu_add_parent_dialog() {
      require('./menu_add_parent_dialog.jsx')({ data: '空', that: this })
    },//

    async find_list() {
      // let config = { method: 'get', url: '/menu/find_list', data: { menu: this.form.menu } }
      // let res = await axios_api(config)
      // console.log('res      :', res)
      // this.tree.data = res.result.menus_tree
    },//


    async menu_opt_click({ option, item, }) {
      if (option.name == '删除') {
        console.log(' item   :', item)
        let confirm = await ElMessageBox.confirm('确定删除吗', '删除提示', { cancelButtonText: '取消', confirmButtonText: '删除' })
        if (confirm != 'confirm') return
        let config = { method: 'get', url: `/menu/delete?`, params: { id: item.id } }
        let res = await axios_api(config)
        console.log('res:', res)
        res.code == 200 && await this.find_list()
      }
      if (option.name == '编辑') {
        require('./menu_edit_dialog.jsx')({ data: item, that: this })
      }

      if (option.name == '添加子菜单') {
        require('./menu_add_child_dialog.jsx')({ data: item, that: this })
      }

    },

    async menu_target_click(event, data, node) {
      console.log('menu_target_click---data:', JSON.parse(JSON.stringify(data)))
      this.$refs.VueSimpleContextMenu_ref.showMenu(event, data)
    },

    async reset_form() {
      this.form.menu = ''
      await this.find_list()
    },


  },////

  async mounted() {


    await this.find_list()

  },////

}
</script>

<style></style>