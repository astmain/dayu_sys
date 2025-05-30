<!--
*- coding = utf-8 -*-
#@Time : 2022/9/11 17:00
#@Author : 沉默小管
#@File : 401.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div class="errPage-container">
    <el-button icon="arrow-left" class="pan-back-btn" @click="back">
      {{$t("content.back")}}
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          401Error!
        </h1>
        <h2>{{$t("content.error401Content1")}}</h2>
        <h6>{{$t("content.error401Content2")}}</h6>
        <ul class="list-unstyled">
          <li class="link-type">
            <router-link to="/">
              {{$t("content.returnToHomepage")}}
            </router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import errGif from '@/assets/img/401Images/401.gif'
import {useRouter} from "vue-router";

let router = useRouter();
const back =()=>{
  if (router.currentRoute.value.query.noGoBack) {
    router.push({ path: '/' })
  } else {
    router.go(-1)
  }
}

</script>

<style scoped lang="less">
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none!important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>