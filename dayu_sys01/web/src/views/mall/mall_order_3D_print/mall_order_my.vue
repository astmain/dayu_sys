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
          <el-button @click="show_unpaid_pay_dialog(scope.row)" type="">待支付</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="BUS.bus_unpaid_pay.show">
      <el-dialog v-model="BUS.bus_unpaid_pay.show" title="待支付" width="800px" draggable>
        <el-button @click="met1()">met1</el-button>

        <img v-img="{src:'https://gitee.com/astmain/static/raw/master/pay/unpaid_qr_code.jpg'}"/>


        <div>https://img2.baidu.com/it/u=1067594889,3904550527&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500</div>
        <div> https://gitee.com/astmain/static/raw/master/avatar/woman_01.jpg</div>
        <div> https://gitee.com/astmain/static/raw/master/avatar/pikaqiu_01.jpg</div>

        <pre style="font-size: 10px">
        {{ BUS.bus_unpaid_pay.data }}
      </pre>
      </el-dialog>
    </div>


  </div>
</template>

<script>


import axios from "axios";


export default {
  data() {
    return {
      goods_order_list: [],
      curr: {
        show: false,
      },
      src: ""
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


    async met1() {
      let res = await api.img_url_to_base64('https://gitee.com/astmain/static/raw/master/pay/unpaid_qr_code.jpg')
      console.log(`111---222:`, res)
      this.src = res
      // this.src = this.src
    },//

    //显示待支付弹框
    async show_unpaid_pay_dialog(row) {
      BUS.bus_unpaid_pay.show = true
      BUS.bus_unpaid_pay.data = row


    },//

  },////

  async mounted() {
    this.goods_order_find_list()


    console.log(`111---222:`, axios)
    this.axios = axios

    axios({
      method: 'post',
      url: 'http://127.0.0.1:10001/file_upload/img_url_to_base64',
      data: {
        img_url: 'https://gitee.com/astmain/static/raw/master/pay/unpaid_qr_code.jpg'
      },
    })
  },////

}
</script>

<style scoped></style>



