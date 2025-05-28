<template>
    <!-- com_formcom_formcom_form

    <button @click="check()">check</button> -->
  <el-form
    ref="formRef"
    :model="form_obj.data"
    :rules="form_obj.rules"
    label-position="left"
    @submit.prevent
  >
             <el-form-item v-for="(item,key) in form_obj.desc" :key="key"  :prop="key" :label="item.label"  :label-width="item.width_label || 'auto'">
            <el-input v-model="form_obj.data[key]" />
        </el-form-item>


    <slot>

    </slot>
  </el-form>
</template>

<script>
export default {
  props: {
    // 表单验证规则
    rules: {
      type: Object,
      default: () => ({})
    },
    form_info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form_obj: this.form_info,
      data:{},
    }
  },
  watch: {
    form_info: {
      handler(value_new) {
        this.form_obj = value_new
 
      },
      deep: true
    },


    form_obj: {
      handler(value_new) {
        this.data = JSON.parse(JSON.stringify(value_new.data))
      },
      deep: true
    }
  },
  methods: {

    // 表单验证
    async check() {
      console.log('check---:', JSON.parse(JSON.stringify(this.form_obj.data)))
      if (!this.$refs.formRef) return false
      try {
        await this.$refs.formRef.validate()
        return true 
      } catch (error) {
        return false
      }
    },

    get_data(){
      return  JSON.parse(JSON.stringify(this.form_obj.data))
    }


  }
}
</script>

<style scoped>
.el-form {
  width: 100%;
}
</style>