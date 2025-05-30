<!--
*- coding = utf-8 -*-
#@Time : 2022-09-08 21:34
#@Author : 沉默小管
#@File : navBar.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div class="navbar">
    <G_Hamburger id="hamburger-container" :is-active="appStore.sidebar.opened" class="hamburger-container" @toggleClick="handleToggleSideBar" />

    <G_Breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="topTitle && appStore.device!=='mobile'" />

    <div class="right-menu">
      <template v-if="appStore.device!=='mobile'">
        <div class="other-item right-menu-item hover-effect u-f u-f-ac u-f-ajc">
          <SvgIcon @click="handleToGitePage" :size="'16px'" :iconClass="'github'" />
        </div>
        <div class="other-item right-menu-item hover-effect u-f u-f-ac u-f-ajc">
          <Notice/>
        </div>
        <div class="other-item right-menu-item hover-effect u-f u-f-ac u-f-ajc">
          <G_ScreenFull />
        </div>

      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" ref="dropdownRef" trigger="click">
        <div class="avatar-wrapper u-f u-f-ac u-f-ajc">
          <el-tag>{{$t("content.curUser")}}:{{computedGetUsername}}
            <el-icon :size="10" class="el-icon--right"><ArrowDown /></el-icon>
          </el-tag>

        </div>

        <template #dropdown>

          <el-dropdown-menu>
            <el-dropdown-item @click="router.push({path:'/common/personalCenter/index'})">
                {{$t("content.personalCenter")}}
            </el-dropdown-item>
            <el-dropdown-item @click="setting = true">
              <span>{{$t("content.basicSettings")}}</span>
            </el-dropdown-item>
            <el-dropdown-item @click="handleLogout">
              <span>{{$t("content.exitLogin")}}</span>
            </el-dropdown-item>
          </el-dropdown-menu>

        </template>

      </el-dropdown>
    </div>

    <div :style="appStore.device=='mobile'?'top:60px;':'top:75px;'+'background:'+settingStore.themeColor.primary" @click.native="setting = true" class="setting-style">
      <el-icon color="white" style="font-size:30px;width:45px;height:45px" class="no-inherit">
        <Setting />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Setting,
} from '@element-plus/icons-vue'
import { ArrowDown } from '@element-plus/icons-vue'
import {getUsername} from "@/utils/storage";
import model from "@/plugins/model";
import {ElDropdown} from "element-plus";
import {computed, defineAsyncComponent, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
import {useRouter} from "vue-router"

const G_Breadcrumb = defineAsyncComponent(()=>import("@/components/breadcrumb/index.vue"))
const G_Hamburger = defineAsyncComponent(()=>import("@/components/hamburger/index.vue"))
const G_ScreenFull = defineAsyncComponent(()=>import("@/components/screenFull/index.vue"))
const Notice = defineAsyncComponent(()=>import("./cpns/notice/index.vue"))

const appStore:any = useStore("useApp")
const settingStore:any = useStore("useSetting")
const userStore:any = useStore("useUser")
const router = useRouter()
const dropdownRef = ref<InstanceType<typeof ElDropdown>>()

const computedGetUsername = computed(()=>{
  return getUsername()
})
const topTitle = computed(()=>{
  return settingStore.topTitle
})

const setting = computed({
  get(){
    return settingStore.showSettings
  },
  set(val:boolean){
    settingStore.changeSetting({
      key: 'showSettings',
      value: val
    })
  }
})

const handleToggleSideBar = ()=>{
  appStore.toggleSideBar()
}
const handleLogout = ()=>{
  model.handleMsgBox('确定要退出？',"",{
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(()=>{
    userStore.LogOut().then((res:any)=>{
      router.push({path:"/login"})
    })
  })
}
const handleToGitePage = ()=>{
  window.open("https://gitee.com/derekgo/vue-cms_xg",'_blank')
}



</script>

<style scoped lang="less">
@media screen and (max-width: 600px) {
  .other-item{
    display: none!important;
  }
  .avatar-container {
    margin-right: 0px!important;
  }
}
.setting-style{
  z-index:99;
  background:v-bind("settingStore.themeColor.primary");
  position:fixed;
  right:0px;
  cursor:pointer;
  border-radius: 10px 0px 0px 10px;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 12px;
      //margin: 0 10px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        height: 100%;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>