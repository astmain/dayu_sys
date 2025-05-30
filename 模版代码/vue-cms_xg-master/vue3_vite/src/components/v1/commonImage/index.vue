<!--
*- coding = utf-8 -*-
#@Time : 2023-04-09 23:09
#@Author : CSDN 沉默小管
#@File : index.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
    <div class="image-error">
      <imageLazy
          :lazy="props.lazy"
          :src="props.picUrl"
          :imgList="srcList"
          :isShowImgDialog="props.isShowImg"
          :imgStyle="props.imgStyle!=''?props.imgStyle:'cursor:pointer;height: 50px;width: auto;'"
      >
        <template #error>
            <el-icon  style="width:50px;height:50px;font-size: 30px;"><Picture /></el-icon>
        </template>
      </imageLazy >
    </div>
</template>

<script setup lang="ts">
    import { Picture } from '@element-plus/icons-vue'
    import {isArray} from "@/utils/lodash"
    import {onMounted, ref, useAttrs} from "vue";
    import type {propsInterface} from "@/components/commonImage/types";


    let props = withDefaults(defineProps<propsInterface>(),{
        picUrl:"",
        picList:[],
        imgStyle:"",
        lazy:false,
        isShowImg:true,
    })
    const attrs = useAttrs();
    let initIndex = ref<number>(0)
    let srcList = ref<string[]>([])

    const handleShowImage = ()=>{
      if(!props.isShowImg)return;
      if(props.picList.length>0 && isArray(props.picList)){
        srcList.value = props.picList
      }else{
        srcList.value = [props.picUrl]
      }
      return srcList.value
    }
    onMounted(()=>{
      handleShowImage()
    })
</script>

<style scoped lang="less">
.image-error{
  :deep(.el-image__wrapper){
    position: relative;
    width:100px;
  }
}
.image-error .el-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 200px;
  width: 100%;
  height: 200px;
}

.image-error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.image-error .image-slot .el-icon {
  font-size: 30px;
}
</style>
