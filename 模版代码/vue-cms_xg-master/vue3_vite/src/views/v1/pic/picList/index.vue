<!--
*- coding = utf-8 -*-
#@Time : 2022-10-05 23:04
#@Author : 沉默小管
#@File : useClass.ts
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <Loading :isLoading="loading">
    <div class="top-style">
      <div class="form-style">
        <FormList v-model="formSearchModel" ref="formRef" :formConfig="formConfig" @submit="handleSearch" @reset="handleReset"/>
      </div>
      <div class="margin-bottom-10">
        <el-row :gutter="10">
          <el-col :span="1.5">
              <el-button
                  v-if="(appStore.device=='mobile'?true:false) && (route.params.id?true:false)"
                  :size="settingStore.sysSize"
                  @click="handleGoBack"
              ><el-icon><ArrowLeft :style="'color:'+settingStore.themeColor.primary" /></el-icon></el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
                :size="settingStore.sysSize"
                type="primary"
                @click="handleAdd(picAddDialogRef)"
                v-hasPower="['pic:picList:add']"
            >{{$t("btn.add")}}</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="scroll-bar-style" :style="'height:'+contentHeight+'px'">
        <template v-if="dataArr.length>0">
          <virtualList :data="dataArr" class="u-f u-f-spa u-f-aja" :columns="25" :containerHeight="contentHeight+'px'">
            <template #default="row">
              <div
                  :key="row.data.id"
                  style="margin-bottom:10px;margin-left:10px;margin-right:10px;width:150px"
              >
                <el-card :body-style="{ padding: '10px 0px 0px 0px' }">
                  <div class="u-f u-f-ac u-f-ajc" style="height:100px">
                    <CommonImage :lazy="true" :imgStyle="'height: 100px;width: auto'" :picList="[row.data.imgMidUrl]" :picUrl="row.data.imgMidUrl" />
                  </div>
                  <div style="padding: 14px">
                    <div class="margin-top-10 margin-bottom-10 text-l">{{row.data.imgName}}</div>
                    <div class="bottom">
                      <el-button :size="settingStore.sysSize" type="primary" class="button" @click="handleEdit(row.data,picEditDialogRef)"
                                 v-hasPower="['pic:picList:edit']"
                      >{{$t("btn.edit")}}</el-button>
                      <el-button :size="settingStore.sysSize" type="danger" class="button" @click="handleDelete(row.data)"
                                 v-hasPower="['pic:picList:del']"
                      >{{$t("btn.delete")}}</el-button>
                    </div>
                  </div>
                </el-card>
              </div>
            </template>
          </virtualList>
        </template>
        <template v-else>
            <el-empty :image-size="200" >
                <el-button
                        :size="settingStore.sysSize"
                        type="primary"
                        @click="handleAdd(picAddDialogRef)"
                        v-hasPower="['pic:picList:add']"
                >{{$t("btn.addPic")}}</el-button>
            </el-empty>
        </template>
    </div>
<!--    <div style="margin:20px 10px">-->
<!--      <el-pagination-->
<!--          :currentPage="pageConfig.currentPage"-->
<!--          :page-size="pageConfig.pageSize"-->
<!--          :page-sizes="[10,20, 50, 100, 200]"-->
<!--          :small="pageConfig.small"-->
<!--          :disabled="pageConfig.disabled"-->
<!--          :background="pageConfig.background"-->
<!--          layout="total, sizes, prev, pager, next"-->
<!--          :total="pageConfig.total"-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--      />-->
<!--    </div>-->
    <!--        编辑-->
      <G_PicEditDialog ref="picEditDialogRef" @handleCloseDialog="handleCloseDialog"  />
    <!--        添加-->
      <G_PicAddDialog ref="picAddDialogRef" @handleCloseDialog="handleCloseDialog" />
  </Loading>
</template>

<script setup lang="ts">
import {ArrowLeft} from '@element-plus/icons-vue'
import {useFunc} from "@/views/pic/picList/hooks/useFunc";
import FormList from '@/components/formList'
import Loading from "@/components/loading/index.vue"
import {defineAsyncComponent, ref} from "vue";
const CommonImage = defineAsyncComponent(()=>import("@/components/commonImage/index.vue"))
const LoadComponentsAsync = defineAsyncComponent(()=>import("@/components/loadComponentsAsync/index.vue"))
const G_PicEditDialog = defineAsyncComponent(()=>import("./cpns/picEditDialog/index.vue"))
const G_PicAddDialog = defineAsyncComponent(()=>import("./cpns/picAddDialog/index.vue"))


let {handleList,handleSearch,handleReset,handleCloseDialog,handleDelete,handleEdit,handleAdd,
  handleSizeChange,handleCurrentChange,handleGoBack,appStore,route,
  loading,picEditDialogRef,picAddDialogRef,settingStore,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,dataArr,contentHeight} = useFunc()


</script>

<style scoped lang="less">

</style>
