<template>
  <div>
    <h3 style="padding:0;margin: 0">路由:{{ this.$route.name }}</h3>

    <div style="display:flex;gap: 20px">
      <div class="dom_container" @click="goods_order_find_list()">全部订单</div>
      <div class="dom_container">待支付订单</div>
      <div class="dom_container">已完成订单</div>
    </div>


    <el-table :data="goods_order_list" style="width: 100%" size="default" height="400" border highlight-current-row
              show-overflow-tooltip>
      <el-table-column label="序号" type="index" width="60px"/>
      <el-table-column label="创建时间" prop="createdAt"/>
      <el-table-column label="订单状态" prop="status"/>
      <el-table-column label="图片" prop="url" width="70px">
        <template #default="scope">
          <img :src="scope.row?.details[0]?.img_url" alt="" style="width:50px;height: 50px">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <!--          <el-button @click="goods_card_create(scope.row)" type="primary">加入购物车</el-button>-->
          <el-button @click="goods_order_del(scope.row.id)" type="">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


  </div>
</template>

<script>


export default {
  data() {
    return {
      goods_order_list: []
    }


  },

  methods: {
    async goods_order_find_list() {
      this.goods_order_list = (await api.goods_order_find_list()).list
      console.log(`111---goods_order_list:`, JSON.parse(JSON.stringify(this.goods_order_list)))


    },//


    async goods_order_del(id) {
      if (await isok_delete_confirm() === false) return
      await api.goods_order_del(id)
      await this.goods_order_find_list()

    },//

  },////

  async mounted() {
    this.goods_order_find_list()
  },////

}
</script>

<style scoped></style>



