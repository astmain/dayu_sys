<!--
*- coding = utf-8 -*-
#@Time : 2023/3/2 10:34
#@Author : 沉默小管
#@File : picList.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <div class="image-style">
    <el-dialog class="dialog-style" :align-center="props.alignCenter" :key="key" v-model="dialogShow" :title="dialogTitle" draggable>
      <div class="u-f">
        <div class="scroll-bar-style" style="border-right: 1px solid #eee;height:calc(100vh - 250px);width:20%;padding-right:5px">
          <div :class="item.id==checkPicSortIndex?'pic-sort-item-active':''" class="pic-sort-item text-l" @click="handleCheckPicSort(item.id)" v-for="(item,index) in picSortList" :key="index">{{item.sortName}}</div>
        </div>
        <div class="scroll-bar-style" style="height:calc(100vh - 250px);width:80%;padding-right:0px">
          <Loading :isLoading="loading">
            <template v-if="picList.length>0">
          <div class="u-f u-f-aja u-f-spa">
            <div v-for="(item,index) in picList"
                 :key="item.id"
                 @click="handleCheckPic(item.id)"
                 class="pic-card-style">
              <div class="u-f u-f-ac u-f-ajc" v-if="item.id==checkPicIndex" style="position:absolute;left:0px;top:0px;height:100%;width: 100%;background:rgb(0 0 0);z-index: 99;opacity:0.6">
                <el-icon style="color:white;opacity:1" :size="50" class="avatar-uploader-icon"><Select /></el-icon>
              </div>
              <div class="u-f u-f-ac u-f-ajc">
                <CommonImage :imgStyle="'height: 75px;width: auto;padding:5px 5px 0px 5px;'" :lazy="true" :isShowImg="false" :picList="[item.imgMidUrl]" :picUrl="item.imgMidUrl" />
              </div>
              <div>
                <div class="text-l" style="text-align: center;line-height: 30px">{{item.imgName}}</div>
              </div>
            </div>
          </div>
            </template>
            <template v-else>
              <el-empty :image-size="200"/>
            </template>
          </Loading>
        </div>
      </div>

      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" :loading="loading" @click.native.prevent="handleChoosePic">{{$t("btn.edit")}}</el-button>
          <el-button type="primary" @click.native.prevent="handleResetChoosePic">{{$t("btn.reset")}}</el-button>
          <el-button @click.native.prevent="handleCancel">{{$t("btn.cancel")}}</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Select } from '@element-plus/icons-vue'
import {handleGetCurInstance} from "@/utils/utils";
import {resInterface} from "@/commonNetwork/index";
import {requestImgList} from "@/network/pic/picList/index";
import {ImgURLStorage} from "@/commonNetwork/request";
import {requestImgSortList} from "@/network/pic/picSort";
import Loading from "@/components/loading/index.vue"
import {defineAsyncComponent, reactive, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
import type {exposeInterface,choosePicDataInterface,propsInterface} from "@/components/picListDialog/src/types";
const CommonImage = defineAsyncComponent(()=>import("@/components/commonImage/index.vue"))

let props = withDefaults(defineProps<propsInterface>(),{
  alignCenter:true,
})

let {model,i18n} = handleGetCurInstance()

let formInitData={
  sortName:'',
  sort:'',
}
let formModel = ref({
  ...formInitData
})
let checkPicIndex = ref(-1)
let checkPicSortIndex = ref(-1)
let options = ref<any[]>([])
let key = ref(0)
let dialogTitle = ref("")
let dialogShow = ref(false)
let loading = ref<boolean>(false)
let picList = reactive<any>([]);//图片列表
let picSortList = reactive<any>([]);//图片分类
let settingStore = useStore("useSetting")

interface EmitType {
  (e: "handleCloseDialog"): void,
  (e: "handleGetPicId",picData:choosePicDataInterface): choosePicDataInterface,
}

const emit = defineEmits<EmitType>()

//选中图片
const handleCheckPic = (index:number)=>{
  checkPicIndex.value = checkPicIndex.value == index?-1:index;
}
//选中图片分类
const handleCheckPicSort = async (index:number)=>{
  loading.value = true;
  checkPicSortIndex.value = checkPicSortIndex.value == index?-1:index;
  await handlePicList(checkPicSortIndex.value)
}
const handleResetChoosePic = ()=>{
  checkPicIndex.value = -1
}
//图片列表
const handlePicList = async (defaultPicSortId?:number)=>{
  let form = {
    imgSortId :defaultPicSortId
  }
  return await requestImgList(form).then((res:resInterface)=>{
    let {data,code,message} = res;
    if(code!=200){
      model.handleMsg(`${message}`,"warning")
      loading.value = false;
      return false;
    }
    picList.length=0;
    let list = data.data;
    for(let i in list){
      let imgMidUrl = ImgURLStorage+list[i]["imgMidUrl"]
      picList.push({
        ...list[i],
        imgMidUrl,
      })
    }
    loading.value = false;
    return true;
  }).catch((err: any)=>{
    loading.value = false;
    console.log(err);
    return false;
  })
}
//选择图片
const handleChoosePic= ()=>{
  let picData:choosePicDataInterface = {
    id: -1,
    picUrl: ""
  }
  if(checkPicIndex.value>0){
    for(let i in picList){
      if(picList[i]["id"] == checkPicIndex.value){
        picData.id = checkPicIndex.value
        picData.picUrl = picList[i]["imgMidUrl"]
        break;
      }
    }
    key.value = Math.random();
    dialogShow.value = false;
      emit("handleGetPicId",picData)
    return
  }else{
    key.value = Math.random();
    dialogShow.value = false;
    emit("handleGetPicId",picData)
  }
}
//图片分类列表
const handlePicSortList = async ()=>{
  return await requestImgSortList().then((res:resInterface)=>{
    let {data,code,message} = res;
    if(code!=200){
      model.handleMsg(`${message}`,"warning")
      return false;
    }
    picSortList.length=0;
    let list = data.data;
    let defaultPicSortId = 0;
    for(let i in list){
      picSortList.push({
        ...list[i],
      })
      if(list[i]["sortName"] == "默认"){
        defaultPicSortId = list[i]["id"];
        checkPicSortIndex.value = defaultPicSortId;
      }
    }

    return defaultPicSortId;
  }).catch((err: any)=>{
    console.log(err);
    return false;
  })
}
//初始化弹出框
const handleOpenDialog = async (picId?:any)=> {
  dialogTitle.value = "选择图片"
  key.value = Math.random()
  dialogShow.value = true
  loading.value = true
  let defaultPicSortId = await handlePicSortList();
  await handlePicList(defaultPicSortId);
  checkPicIndex.value = picId??-1
}
const handleCancel = ()=>{
  dialogShow.value =false
  key.value = Math.random();
  formModel.value = {...formInitData}
}
defineExpose<exposeInterface>({
  handleOpenDialog
})
let color = ref("red")
</script>

<style scoped lang="less">
.pic-card-style{
  position: relative;
  cursor:pointer;
  margin-bottom:10px;margin-right:10px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  border-radius: 10px;
  overflow: hidden;
  width:100px;
}
.pic-sort-item{
  cursor:pointer;
  padding:10px;
  margin-bottom: 10px;
  text-align: left;
  border-radius: 4px;
  &-active{
    color:v-bind("settingStore.themeColor.primary");
    border-left:3px solid v-bind("settingStore.themeColor.primary");
    border-radius: 0px 4px 4px 0px;
  }
  &:hover{
    background:#f5f5f5;
  }
}
</style>
