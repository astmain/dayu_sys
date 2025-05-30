<!--
*- coding = utf-8 -*-
#@Time : 2022/9/7 9:53
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div class="login" :style="`background: url(${loginBgm});background-size:cover;`">
    <div class="">
      <section class="login-box animate__animated animate__slideInDown">
        <!-- 左侧 -->
        <div class="login-left">
          <img class="login-img" src="@/assets/icons/svg/login-img1.svg" />
        </div>
        <!-- 右侧 -->
        <div class="login-right u-f u-f-ac u-f-ajc">
          <el-form
              ref="formRef"
              v-show="isShowLogin === true"
              :model="formModel"
              :rules="formRules"
              class="login-form"
              status-icon
          >
            <h3 class="login-form-title u-f u-f-ac u-f-ajc">
              VueCms
            </h3>
            <el-form-item prop="username">
              <el-input
                  v-model.trim="formModel.username"
                  type="text"
                  auto-complete="off"
                  placeholder="账号"
                  @input="formModel.username = $event"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                  v-model.trim="formModel.password"
                  type="password"
                  auto-complete="off"
                  placeholder="密码"
                  @keyup.enter.native="handleSubmitLoginForm(formRef)"
                  @input="formModel.password = $event"
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="code" v-if="captchaOnOff">
              <div class="u-f u-f-ajs" style="width:100%">
                <div>
                  <el-input
                      v-model.trim="formModel.code"
                      auto-complete="off"
                      placeholder="验证码"
                      style="width: 120px"
                      @keyup.enter.native="handleSubmitLoginForm(formRef)"
                  />
                </div>
                <div class="login-code">
                  <PicCode ref="picCodeRef" :width="100" :height="38" v-model:code="code" />
                </div>
              </div>
            </el-form-item>
            <div class="u-f u-f-ajs u-f-ac margin-bottom-15">
              <el-checkbox :checked="formModel.rememberMe" v-model="formModel.rememberMe" >记住密码</el-checkbox>
              <!--                        <el-link-->
              <!--                                @click="isShowLogin = false"-->
              <!--                                types="primary"-->
              <!--                        >没有账号,前往注册</el-link>-->
            </div>

            <el-form-item style="width: 100%">
              <el-button
                  class="margin-bottom-10"
                  :loading="globalLoading"
                  type="primary"
                  style="width: 100%"
                  @click.native.prevent="handleSubmitLoginForm(formRef)"
              >
                <span v-if="!globalLoading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
              <el-button
                  class="margin-bottom-10"
                  type="primary"
                  style="width: 100%;margin-left:0px;"
                  @click.native.prevent="resetForm(formRef)"
              >
                重 置
              </el-button>
              <el-button
                        :loading="globalLoading"
                        type="success"
                        style="width: 100%;margin-left:0px;"
                        @click.native.prevent="handleRandomAccountLogin()"
                >
                    <span>随机账号登录</span>
                </el-button>
            </el-form-item>
            <el-form-item style="width: 100%">
                <ThirdLogin/>
            </el-form-item>
          </el-form>

          <el-form
              v-show="isShowLogin === false"
              :model="registryForm"
              :rules="registryRules"
              class="login-form"
              ref="formRegisterRef"
              status-icon
          >
            <h3 class="title">VueCms</h3>
            <el-form-item>
              <el-input
                  v-model.trim="registryForm.userName"
                  type="text"
                  auto-complete="off"
                  placeholder="请输入账号注册">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                  v-model.trim="registryForm.password"
                  type="password"
                  auto-complete="off"
                  placeholder="请输入密码注册"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-col :span="10">
                <el-input
                    :size="settingStore.sysSize"
                    v-if="isShowSendSms === true"
                    v-model.trim="registryForm.phoneNumber"
                    placeholder="请输入手机号"
                >
                </el-input>
                <el-input
                    v-else
                    v-model.trim="handleSendSms"
                    placeholder="请输入短信验证码"
                    style="width: 50px"
                >
                </el-input>
              </el-col>
              <el-col :span="12">
                <el-button
                    v-if="isShowSendSms === true"
                    @click="handleSendSms"
                    style="margin-left: 5px"
                    effect="dark">获取手机验证码</el-button>
                <el-button
                    v-if="isShowPutSms === true"
                    style="margin-left: 5px"
                    effect="dark">请 {{ countNum }} 秒后再获取</el-button>
                <el-button
                    v-if="isShowReSend"
                    @click="handleSendSms"
                    style="margin-left: 5px"
                    effect="dark"
                >重新获取验证码</el-button>
              </el-col>
            </el-form-item>
            <div class="u-f u-f-ajs u-f-ac margin-bottom-15">
              <el-checkbox v-model="registryForm.rememberMe" >记住密码</el-checkbox>
              <el-link @click="isShowLogin = true" type="primary">已有账号,前往登录</el-link>
            </div>

            <el-form-item style="width: 100%">
              <el-button
                  :loading="globalLoading"
                  type="success"
                  style="width: 100%"
                  @click.native.prevent="handleSubmitRegisterForm"
              >
                <span v-if="!globalLoading">注册</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </section>
      <div class="footer text-style u-f u-f-ajc u-f-ac">
        Copyright © 2023, vueCms_xg
        <a rel="noreferrer" target="_blank" href="https://beian.miit.gov.cn/#/Integrated/index" class="text-style u-f u-f-ac u-f-ajc margin-left-10">
          <img
              :src="ghs"
              alt="vueCms"
          />
          粤ICP备18157153号
        </a>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import loginBgm from "@/assets/img/loginBgm.png"
import ghs from "@/assets/img/ghs.png"
import {useFunc} from "@/views/login/hooks/useFunc";
import PicCode from "@/components/picCode/index";
import {defineAsyncComponent} from "vue";
const ThirdLogin = defineAsyncComponent(() => import("./cpns/thirdLogin/index.vue"))

let {globalLoading,settingStore,formRef,formRegisterRef,countNum,isShowLogin,isShowSendSms,isShowReSend,captchaOnOff,isShowPutSms,loading,formModel,
  code,picCodeRef,formRules,registryForm,registryRules,handleSubmitLoginForm,resetForm,handleSendSms,handleSubmitRegisterForm,handleRandomAccountLogin} = useFunc();


</script>

<style scoped lang="less">
.footer{
  margin:auto;
  width: 100%;
  position: absolute;
  bottom:20px;
  left: 0px;
}
.text-style{
  font-size: 12px;
  color: #ffffff;
  line-height: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.login-form-title {
  font-weight: 700;
  overflow:hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow:ellipsis;
  position:relative;
}
.login-form-title:before{
  content: "";
  position: absolute;
  left: -665px;
  top: -460px;
  width: 200px;
  height: 15px;
  background-color: rgba(255,255,255,.5);
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: searchLights 4s ease-in 0s infinite;
  -o-animation: searchLights 4s ease-in 0s infinite;
  animation: searchLights 4s ease-in 0s infinite;
}
@-webkit-keyframes searchLights {
  0% { left: -90px; top: 0; }
  to { left: 90px; top: 0; }
}
.login {
  height: 100vh;
  background-size: cover;
  position:relative;
  overflow:hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #2e3d4e, #001528);
  &-box {
    width: 820px;
    height: 525px;
    display: flex;
    z-index: 999;
    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.08);
  }
}

.login-left {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(60deg,rgb(39, 91, 214),rgb(16, 54, 171));
  .login-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transition: all 0.3s;
    object-fit: cover;
  }
}

.login-right {
  width: 320px;
  height: 100%;
  box-sizing: border-box;
  background:white;
}

.login-form {
  width:84%;
  border-radius: 10px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  height: 38px;
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
@media screen and (max-width:760px) {
    .login{
        &-box{
            width:100% !important;
        }
        &-left{
            display: none;
        }
    }
}
</style>
