<template>
  <div>
    <el-button @click="open_draw()">画图截图</el-button>
  </div>
  <canvas v-if="show" class="canvasContainer222" style="width:500px; height: 300px;border:1px solid red;box-sizing: border-box;"/>
</template>

<script>
// 自定义
import three_parse_show from './three_parse_show';

export default {
  props: {
    show: {required: true, default: false}
  },
  data() {
    return {}
  },

  methods: {
    async show222({blobURL}) {
      await three_parse_show({canvas: document.querySelector('.canvasContainer222'), blobURL})
    },//


    async open_draw() {
      console.log(`111---222:`, 333)
      alert("等待开发画图")

    },//

  },////

  async mounted() {

  },////

}
</script>

<style scoped></style>



