import { defineComponent, createVNode, reactive, render, ref, onMounted } from "vue";
import { ElButton, ElInput, ElForm, ElMessage, ElFormItem } from "element-plus";
import { ElTree } from "element-plus";
import { ElDrawer, ElDialog } from "element-plus";
import { ElCheckboxGroup, ElCheckbox } from "element-plus";
import { ElSelect, ElOption } from "element-plus";
import { ElCascader } from "element-plus";


let show = $ref(false)
const menu_dialog = defineComponent({
  props: {
    title: { type: String, default: '' },
    state: { type: Object, default: { parent_id: ""} },
    that: { type: Object, default: () => ({}) }
  },
  setup(props, ctx) {
    let form = $ref({parent_id:props.state.parent_id,depart:"", })
    console.error('form:', form)
    console.error('state:', props.state)


    function check_form() {
      let isok = true
      if (form.depart.length == 0) ( isok= false, ElMessage.error({ message: props.title+`不能为空!`, duration: 3 * 1000, showClose: true })) //检查表单
      return isok
    }



    async function submit() {
      if (!check_form()) return
      console.log('111---:', form)
      await api.depart_create(form)
      await props.that.find_depart_role_tree()
    }



    return () => (
      <ElDialog v-model={show} title={props.title} width="500px" draggable>
        <ElForm model={form} >
          <ElFormItem label="新增-组织" prop='position'>
            <ElInput v-model={form.depart} />
          </ElFormItem>
        </ElForm>
        <ElButton type="primary" onclick={async () => { submit() }}  >确定</ElButton>
      </ElDialog>
    )
  }
})

export default function open(props) {
  vue_dialog(menu_dialog, props)
  show = true
}


