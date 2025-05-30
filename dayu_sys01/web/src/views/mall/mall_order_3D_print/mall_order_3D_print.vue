<template>
  <div class="parent" style="display: flex;flex-direction: row; gap: 20px;">
    <el-card class="col" style="flex:1">
      <nav style="display: flex; flex-direction: column;position: relative">
        <span>上传3d文件</span>
        <div class="file_area" @click="file_area_click()"
             style="position: absolute;bottom: 10px;left: 50%; transform: translateX(-50%);">
          <div>拖拽文件到这里上传</div>
          <input class="file_input" type="file" @change="on_change_file_111" accept=".stl,.png" style="display: none"/>
        </div>
        <canvas class="canvasContainer" style="width:100%; height: 300px;border:1px solid red;box-sizing: border-box;"/>
      </nav>
      <nav>
        <span @click="file_upload_find_list()">历史上传记录</span>
        <el-table :data="file_upload_list" style="width: 100%" size="default" height="400" border highlight-current-row
                  show-overflow-tooltip>
          <el-table-column label="序号" type="index" width="60px"/>
          <el-table-column label="文件名" prop="name"/>
          <el-table-column label="创建时间" prop="createdAt"/>
          <el-table-column label="图片" prop="url" width="70px">
            <template #default="scope">
              <img :src="scope.row.url" alt="" style="width:50px;height: 50px">
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button @click="goods_card_create(scope.row)" type="primary">加入购物车</el-button>
              <el-button @click="file_delete(scope.row.id)" type="">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </nav>


    </el-card>


    <el-card class="col" style="flex:1">
      <nav class="aaa000">
        <span @click="goods_car_find_list()">购物车</span>
        <div class="aaa111" style="display: flex;flex-direction: column ;gap: 4px ;  width:100% ; font-size: 14px">
          <div v-for="(item, i) in goods_car_list" style="">
            <div style="display: flex;flex-direction: column ;gap: 4px ;padding: 4px"
                 @click="goods_car_curr.highlight=item.id" :class="{'highlight':goods_car_curr.highlight===item.id}">
              <div style="display: flex;gap: 2px;">
                <img :src="item.img_url" alt="" style="width:50px;height: 50px">
                <div style="display: flex;gap: 2px; flex-direction: column;width:100%;">
                  <div style=" display: flex;flex-direction: row; justify-content: space-between;">
                    <span>
                      <span style="font-weight: bolder"> 商品:</span>
                      <span> {{ item.name }}</span>
                    </span>
                    <div>
                      <el-button @click="()=>(goods_car_curr.show=true,goods_car_curr.data=item)" plain type="">修改规格</el-button>
                      <el-button @click="open_edit_3d_img()" plain type="">添加打孔位置</el-button>
                      <el-button @click="goods_car_del(item.id)" plain type="">删除</el-button>
                    </div>

                  </div>
                  <div style=" display: flex;flex-direction: row; justify-content: space-between">
                    <span>
                      <span style="font-weight: bolder">数量:</span>
                      <!--                      <span>{{ item.num }}</span>-->
                       <el-input-number v-model="item.num" :min="0" :max="99999" @change="num_change(item)"/>
                    </span>
                    <span>
                      <span style="font-weight: bolder"> 价格:</span>
                      <span> {{ item.price }}</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>


          </div>
        </div>


      </nav>


      <nav style="display: flex; flex-direction: column;gap: 8px;">
        <span>交货日期</span>
        <div v-for="(item ,i) in goods_car_price_list">
          <div style="display: flex; justify-content: space-between" @click="click_highlight_1111(item ,i)" :class="{'highlight':goods_car_price_curr.highlight===i}">
            <span> {{ item.name }}</span>
            <span> ￥{{ item.price }}</span>
          </div>
        </div>

        <div>
          <span>零件数量</span>
          <span>{{ goods_car_total }}</span>
        </div>

        <div>
          <span>总计(含税)</span>
          <span>{{ goods_car_price_curr.price }}</span>
        </div>
        <el-button type="primary" @click="goods_order_create(item)">提交订单</el-button>
      </nav>
    </el-card>


    <el-dialog v-model="goods_car_curr.show" title="修改规格" width="500px" draggable>
      <el-form :model="goods_car_curr.data" label-width="80px">
        <el-form-item label="数量">
          <el-input-number v-model="goods_car_curr.data.num" :min="0" :max="99999" @change="num_change(goods_car_curr.data)"/>
        </el-form-item>
      </el-form>
    </el-dialog>


    <el-dialog v-model="edit_3d_img.show" title="添加打孔位置" width="800px" draggable>
      <div style="display: flex ;flex-direction: column">
        <com_edit_3d_img ref="com_edit_3d_img" :show="edit_3d_img.show"></com_edit_3d_img>
      </div>
    </el-dialog>

  </div>


</template>

<script>
// 自定义
import three_parse_show from './three_parse_show';
import com_edit_3d_img from './com_edit_3d_img.vue';

export default {
  components: {
    com_edit_3d_img,
  },
  data() {
    return {
      file_upload_list: [],
      // 111
      goods_car_list: [],
      goods_car_price_list: [],
      goods_car_total: 0,
      goods_car_price_curr: {
        highlight: null,
        info: {},
        price: 0,
      },
      // 222
      goods_car_curr: {
        show: false,
        highlight: null,
        data: {},
      },

      edit_3d_img: {
        show: false,
      },


    };
  },

  methods: {

    async open_edit_3d_img() {
      this.edit_3d_img.show = true
      // console.log(`111---$refs:`, this.$parent.$parent.$refs)
      console.log(`111---this:`, this)
      console.log(`111---$refs:`, this.$refs)
      window.that = this
      console.log(`111---$refs:`, this.$refs.com_edit_3d_img)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await this.$refs.com_edit_3d_img.show222({blobURL: 'blob:http://localhost:10002/8513c09a-7488-4367-a3d7-64efb244631e'})
    },//


    async on_change_file_111(event) {
      // 上传文件
      // let file = event.target.files[0]
      // let result = await api.file_upload_one_3d({file})
      // console.log(`上传文件---result:`, result)
      // // 本地文件blobURL
      // let blobURL = URL.createObjectURL(event.target.files[0])//得到blobURL
      let blobURL = await this.make_file_one({files: event.target.files})
      window.blobURL = blobURL
      event.target.value = ''; // 清空input的值
    },


    async file_upload_find_list() {
      this.file_upload_list = await api.file_upload_find_list()
    },


    async file_delete(id) {
      if (await isok_delete_confirm() === false) return
      await api.file_delete({id})
      await this.file_upload_find_list()
    },//


    async file_area_click() {
      document.querySelector(".file_input")?.click()
    },//


    async make_file_one({files}) {
      console.log(`111---files:`, files)
      let file = files[0]
      let result = await api.file_upload_one_3d({file})
      console.log(`上传文件---result:`, result)
      // 本地文件blobURL
      let blobURL = URL.createObjectURL(file)//得到blobURL
      await three_parse_show({canvas: document.querySelector('.canvasContainer'), blobURL})
      await this.file_upload_find_list()
      document.querySelector('.file_area')?.classList.add('min_frame')
      return blobURL

    },//


    async goods_card_create(row) {
      console.log(`111---goods_card_create:`, row)
      await api.goods_car_create({name: row.name, img_url: row.url, num: 1,})
      await this.goods_car_find_list()

    },//


    async goods_car_find_list() {
      let res = await api.goods_car_find_list()
      this.goods_car_list = res.goods_car_list
      this.goods_car_price_list = res.goods_car_price_list
      this.goods_car_total = res.goods_car_total
      await this.click_highlight_1111(this.goods_car_list[0], 0)
    },//


    async click_highlight_1111(item, i) {
      console.log(`111---item:`, item)
      this.goods_car_price_curr = {highlight: i, ...item}
    },//


    async goods_car_del(id) {
      if (await isok_delete_confirm() === false) return
      await api.goods_car_del({id})
      await this.goods_car_find_list()
    },//


    async goods_order_create() {
      console.log(`111---222:`, this.goods_car_list)
      console.log(`111---222:`, this.goods_car_total)
      console.log(`111---222:`, this.goods_car_price_curr)
      let data = {
        details: this.goods_car_list,
        price: this.goods_car_price_curr.price,
      }
      let res = await this.api.goods_order_create(data)
      if (res.code === 200) {
        console.log(`请支付--- res.one :`, res.one)
        // alert("请支付")
        this.$router.push("/mall_order_my")
      }
    },//


    async num_change(item) {
      console.log(`111---num_change---item:`, item)
      await this.api.goods_car_update(item)
      await this.goods_car_find_list()
    },//


    async handle_file_drop() {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const file_area = document.querySelector(".file_area")
      // 拖拽进入区域时高亮
      file_area.addEventListener("dragover", (e) => {
        e.preventDefault();
        file_area.classList.add('hover');
        console.log(`111---dragover---拖拽进入区域时高亮:`, 333)
      })

      // 拖拽离开区域
      file_area.addEventListener('dragleave', () => {
        file_area.classList.remove('hover');
        console.log(`222---dragleave---拖拽离开区域:`, 333)
      });


      // 文件释放后处理
      file_area.addEventListener('drop', async (e) => {
        e.preventDefault();
        file_area.classList.remove('hover');
        console.log(`333---drop---文件释放后处理:`, 333)
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          console.log(`444---drop---files:`, files)
          await this.make_file_one({files})
        }
      })


      //画布
      let canvasContainer = document.querySelector(".canvasContainer")
      canvasContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        file_area.classList.add('hover');
        console.log(`canvasContainer---dragover---拖拽进入区域时高亮:`, 333)
      })

      //画布
      canvasContainer.addEventListener('drop', async (e) => {
        e.preventDefault();
        file_area.classList.remove('hover');
        console.log(`333---drop---文件释放后处理:`, 333)
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          console.log(`444---drop---files:`, files)
          await this.make_file_one({files})
        }
      })

    },//


  },
  async mounted() {


    this.api = api
    this.file_upload_find_list()
    this.handle_file_drop()
    this.goods_car_find_list()
    window.c = this.goods_car_curr

  }
};
</script>

<style scoped>
.file_area {
  width: 100%;
  height: 90%;
  border: 1px green solid;
}

.file_area.min_frame {
  width: 150px;
  height: 50px;
}


.file_area.hover {
  color: red;
}

.highlight {
  background: #ecf5ff;
}
</style>