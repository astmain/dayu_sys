<template>
  <div class="parent">
    <el-card style="width: 400px;border-radius: 8px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);">
      <!-- <el-card style="width: 400px;border-radius: 8px"> -->
      <template #header>
        <h2 style="text-align: center">系统登录</h2>
      </template>


      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" @submit.prevent="handleLogin">
        <el-form-item prop="tel">
          <el-input v-model="loginForm.tel" placeholder="请输入-手机">
            <template #prepend>手机</template>

          </el-input>
        </el-form-item>


        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入-密码" show-password>
            <template #prepend>密码</template>
          </el-input>
        </el-form-item>






        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading" style="  width: 100%;  margin-top: 10px;">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Search, Edit } from '@element-plus/icons-vue'
export default {
  components: {
    // Search, Edit
  },
  data() {
    return {
      loading: false,
      loginForm: {
        tel: '111',
        password: '123456'
      },
      rules: {
        tel: [
          { required: true, message: '请输入-手机', trigger: 'blur' },
          { min: 3, max: 20, message: '手机-长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入-密码', trigger: 'blur' },
          { min: 3, max: 20, message: '密码-长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 这里添加登录逻辑
    async handleLogin() {
      try {
        await this.$refs.loginFormRef.validate()
        this.loading = true
        let config = { method: 'get', url: '/auth/login', params: this.loginForm }
        let res = await axios_api(config)
        console.log(res)
        if (res?.code === 200) {
          localStorage.setItem('token', res.result.token)
          BUS.user = res.result
          this.$router.push('/home')
        } else {
          this.$message.error('用户名或密码错误')
        }
      } catch (error) {
        console.error('表单验证失败:', error)
      } finally {
        this.loading = false
      }
    },




  }
}
</script>

<style scoped>
.parent {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #9fcdfc 0%, #70a1ff 100%);
}
</style>