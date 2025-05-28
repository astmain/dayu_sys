<template>
  <el-tree class="com_tree1" ref="tree_ref" :data="tree_config.data" :node-key="tree_config.id" @node-contextmenu="tree_ritht_click"
    @node-click="tree_left_click" :props="{ children: 'children', label: tree_config.label }"
    :current-node-key="currentNodeKey" :expand-on-click-node="false" highlight-current default-expand-all> </el-tree>
  <el-card v-show="menu_show" :style="{ position: 'fixed', left: menu_left + 'px', top: menu_top + 'px' }"
    :body-style="{ padding: '10px' }">
    <div v-for="(item, i) in menu_config.opt">
      <span @click="opt_click(item, curr_data)">{{ item.title }}</span>
    </div>
  </el-card>
</template>
<script setup>
import { ref, watch, defineProps, defineEmits, nextTick, onMounted, unref } from 'vue'
const props = defineProps({
  menu_config: {
    type: Object, default: { opt: [{ title: '编辑', kind: 'edit' }], opt_click: (item, curr_data) => { } }
  },

  tree_config: {
    type: Object, default: {
      label: "depart",
      id: "id",
      tree_left_click: () => { },
      data: [
        {
          "id": 1,
          "depart": "大宇三维打印",
          "parent_id": 0,
          "children": [
            { "id": 2, "depart": "技术部", "parent_id": 1, "children": [] },
            {
              "id": 2001,
              "depart": "泉州分公司",
              "parent_id": 1,
              "children": [
                { "id": 20011, "depart": "财务部", "parent_id": 2001, "children": [] },
                { "id": 20012, "depart": "业务部", "parent_id": 2001, "children": [] }
              ]
            },
          ]
        },

      ]
    }
  },


})
// console.log('props.tree_config', props.tree_config)

// -----------------------------------------------
let menu_show = $ref(false)
let menu_left = $ref(0)
let menu_top = $ref(0)
let curr_data = $ref({})
let curr_node = $ref({})
let currentNodeKey = ref(null)
let tree_ref = ref(null)


async function tree_ritht_click(event, data, Node, element) {
  // console.log('event', event)
  // console.log('data', data)
  curr_data = data
  curr_node = Node
  menu_show = true
  tree_ref.value.setCurrentKey(data.id)//右键点击时高亮
  menu_left = event.x
  menu_top = event.y
  props.tree_config.tree_left_click(data)
}


function tree_left_click(data) {
  menu_show = false
  props.tree_config.tree_left_click(data)
}


function opt_click(item, curr_data) {
  menu_show = false
  props.menu_config.opt_click(item, curr_data)
}







document.body.addEventListener("click", () => {
  menu_show = false
})

</script>



<style>
.com_tree1 {
  .el-tree-node__content:hover {
    background-color: transparent;
  }
}
</style>
