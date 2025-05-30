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


    <el-dialog v-if="BUS.bus_unpaid_pay.show" v-model="BUS.bus_unpaid_pay.show" title="待支付" width="800px" draggable>
      <el-button @click="met1()">met1</el-button>
      <!--            <img style="width: 100px;height: 100px" :src="" alt="">-->
      <img style="width: 100px;height: 100px" :src="src"/>

      <pre style="font-size: 10px">
        {{ BUS.bus_unpaid_pay.data }}
      </pre>
    </el-dialog>


  </div>
</template>

<script>


export default {
  data() {
    return {
      goods_order_list: [],
      curr: {
        show: false,
      },
      src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAFA3PEY8MlBGQUZaVVBfeMiCeG5uePWvuZHI////////////////////////////////////////////////////2wBDAVVaWnhpeOuCguv/////////////////////////////////////////////////////////////////////////wAARCAAyADEDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAlEAACAgIBAwMFAAAAAAAAAAAAAREhMUECIlGRYXGBEjJiobH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAVEQEBAAAAAAAAAAAAAAAAAAAAEf/aAAwDAQACEQMRAD8A9CX21Pc16agNKXSoYsoSoyXlOsmeyllyomLAVM7wYi10ytm8P0IkncLwBygHaOHb9AtQ5YY8B020ip3oyqcm/qhJGVya5Q0rHUmmkXqbXTEMo086IviA1bqR6R7gPhAR+LAF8ifcytVJr+QQTahibzsLOStwsgR5eQnpyW3slyrQCQXwABQACwGAAJGAAEIAAf/Z"
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


      console.log(`111---222:`, fs_img_url_to_base64('https://img2.baidu.com/it/u=1067594889,3904550527&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'))


      function fs_img_url_to_base64(url) {
        let axios = require("axios").default
        return new Promise((res, rej) => {
          axios.get(url, {responseType: "blob",}).then((response) => {
            let reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
              res(e.target.result)
            }
          })
        })
      }


    },//

  },////

  async mounted() {
    this.goods_order_find_list()
  },////

}
</script>

<style scoped></style>



