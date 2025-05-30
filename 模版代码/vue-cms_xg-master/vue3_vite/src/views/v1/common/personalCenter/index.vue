<!--
*- coding = utf-8 -*-
#@Time : 2023-04-13 22:56
#@Author : CSDN 沉默小管
#@File : index.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
    <Loading :isLoading="loading">
        <el-row :gutter="16">
            <el-col class="margin-bottom-10" style="height:100%" :span="10" :xs="{span:24,offset:0}" :sm="{span:24,offset:0}" :md="{span:8,offset:8}" :lg="{span:6,offset:1}">
                <div class="card-style">
                    <div>
                        <div class="u-f margin-bottom-10">
                            <div class="margin-right-5 title-icon"></div>
                            <div style="line-height: 25px;">个人信息</div>
                        </div>
                        <div>
                                <div class="margin-bottom-10 u-f u-f-ac u-f-ajc" style="height:100px;">
                                  <CommonImage :imgStyle="'max-height: 100px;width: auto;'" :picUrl="vueCms" />
                                </div>
                                <div style="font-size: 15px" class="margin-top-20">
                                    <div class="u-f u-f-ajs margin-bottom-10 user-item">
                                        <div class="u-f">
                                            <div class="u-f u-f-ac u-f-ajc">
                                                <svg style="width:15px;height:15px" aria-hidden="true">
                                                    <use href="#icon-user" />
                                                </svg>
                                            </div>
                                            <div class="margin-left-5">用户名称</div>
                                        </div>
                                        <div>{{ formModel.nickName??"空" }}</div>
                                    </div>
                                    <div class="u-f u-f-ajs margin-bottom-10 user-item">
                                        <div class="u-f">
                                            <div class="u-f u-f-ac u-f-ajc">
                                                <svg style="width:15px;height:15px" aria-hidden="true">
                                                    <use href="#icon-user" />
                                                </svg>
                                            </div>
                                            <div class="margin-left-5">账号</div>
                                        </div>
                                        <div>{{ formModel.username }}</div>
                                    </div>
                                    <div class="u-f u-f-ajs margin-bottom-10 user-item">
                                        <div class="u-f">
                                            <div class="u-f u-f-ac u-f-ajc">
                                                <svg style="width:15px;height:15px" aria-hidden="true">
                                                    <use href="#icon-user" />
                                                </svg>
                                            </div>
                                            <div class="margin-left-5">角色</div>
                                        </div>
                                        <div>{{ formModel.roleName }}</div>
                                    </div>
                                    <div class="u-f u-f-ajs margin-bottom-10 user-item">
                                        <div class="u-f">
                                            <div class="u-f u-f-ac u-f-ajc">
                                                <svg style="width:15px;height:15px" aria-hidden="true">
                                                    <use href="#icon-phone" />
                                                </svg>
                                            </div>
                                            <div class="margin-left-5">手机号</div>
                                        </div>
                                        <div>{{ formModel.phone??"空" }}</div>
                                    </div>
                                    <div class="u-f u-f-ajs margin-bottom-10 user-item">
                                        <div class="u-f">
                                            <div class="u-f u-f-ac u-f-ajc">
                                                <svg style="width:15px;height:15px" aria-hidden="true">
                                                    <use href="#icon-email" />
                                                </svg>
                                            </div>
                                            <div class="margin-left-5">邮箱</div>
                                        </div>
                                        <div>{{ formModel.email??"空" }}</div>
                                    </div>
                                    <div class="u-f u-f-ajs margin-bottom-10 user-item">
                                        <div class="u-f">
                                            <div class="u-f u-f-ac u-f-ajc">
                                                <svg style="width:15px;height:15px" aria-hidden="true">
                                                    <use href="#icon-sex" />
                                                </svg>
                                            </div>
                                            <div class="margin-left-5">性别</div>
                                        </div>
                                        <div><DictTag style="margin-left:0px" :options="dicts.sysSex" :value="formModel.sex" /></div>
                                    </div>
                                    <div class="u-f u-f-ajs margin-bottom-10 user-item">
                                        <div class="u-f">
                                            <div class="u-f u-f-ac u-f-ajc">
                                                <svg style="width:15px;height:15px" aria-hidden="true">
                                                    <use href="#icon-date" />
                                                </svg>
                                            </div>
                                            <div class="margin-left-5">创建日期</div>
                                        </div>
                                        <div class="text-l" style="width: 100%;text-align:right">{{handleParseTime(formModel.addTime,'{y}-{m}-{d}')}}</div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col class="margin-bottom-10" :span="10" :xs="{span:24,offset:0}" :sm="{span:24,offset:0}" :md="{span:16,offset:4}" :lg="{span:16,offset:0}">
                <div class="card-style">
                    <el-tabs v-model="activeComponent" class="tabs-style" style="margin-bottom: 0px" @tab-click="handleClick">
                        <el-tab-pane label="基本信息" name="BaseInfo"></el-tab-pane>
                        <el-tab-pane label="消息通知" name="Notify"></el-tab-pane>
                        <el-tab-pane label="登录日志" name="LoginLog"></el-tab-pane>
                        <el-tab-pane label="操作日志" name="OperationLog"></el-tab-pane>
                    </el-tabs>
                  <component :is="curComponent" ref="componentRef" />
                </div>
            </el-col>
        </el-row>
    </Loading>
</template>

<script setup lang="ts">
    import {handleParseTime} from "@/utils/utils"
    import vueCms from "@/assets/img/vueCms.jpg"
    import Loading from "@/components/loading/index.vue"
    import {useFunc} from "./hooks/useFunc";
    import {defineAsyncComponent, ref, shallowRef} from "vue";
    const DictTag = defineAsyncComponent(() => import("@/components/dictTag/index.vue"))
    const CommonImage = defineAsyncComponent(()=>import("@/components/commonImage/index.vue"))


    let {loading,formModel,dicts,roleOptions,settingStore,activeComponent,curComponent,handleClick} = useFunc()
</script>

<style scoped lang="less">
    .title-icon{
        background:v-bind("settingStore.themeColor.primary");
        width:5px;
        height:25px;
    }
    .card-style {
        border-bottom: 1px solid #d8dce5;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
        height: 100%;
        padding: 20px;
        border-radius: 4px;
        background-color: var(--el-bg-color-overlay);
    }
    .tabs-style{
      :deep(.el-tabs__header){
        margin-bottom:0px!important;
      }
    }
</style>