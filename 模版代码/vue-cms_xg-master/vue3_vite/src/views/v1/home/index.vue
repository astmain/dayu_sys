<!--
*- coding = utf-8 -*-
#@Time : 2022/9/11 17:00
#@Author : 沉默小管
#@File : index.vue
#@web  : golangblog.blog.csdn.net
#@Software: WebStorm
-->
<template>
  <Loading :isLoading="loading">
    <div class="margin-top-20">
      <!--        统计显示-->
      <el-row :gutter="16">
        <el-col class="margin-bottom-10" :span="10" :xs="24" :sm="24" :md="12" :lg="12">
          <div class="card-style">
            <div>
              <div class="u-f margin-bottom-10">
                <div class="margin-right-5 title-icon"></div>
                <div style="line-height: 25px;">简介</div>
              </div>
              <div style="line-height: 24px">
                <div class="margin-bottom-10">
                  <div class="u-f u-f-ac u-f-ajc" style="height:100px;">
                    <CommonImage :isShowImg="false" :imgStyle="'max-height: 100px;width: auto;'" :picUrl="vueCms" />
                  </div>
                  <div class="margin-top-5" style="text-align: center;font-weight: bolder">vueCms</div>
                </div>

                <div class="margin-bottom-10 font-style" style=" text-indent: 2em;font-size:12px;">
                    <span class="span-style">
                      如果你只熟悉<span style="color:red;">javascript</span>和基本的<span style="color:red;">html+css</span>，而且想快速开发自己的项目或者建立公司项目，你可以参考或者采纳本后台管理系统。
                    </span>
                </div>
                <div class="margin-bottom-10 font-style" style=" text-indent: 2em;font-size:12px;">
                    <span class="span-style">
                      <span style="color:red;">vueCms</span>是基于<span style="color:red;">vue3</span>+vite+elementPlus的UI框架+ <span style="color:red;">nestjs</span>的内容管理系统(cms)，本系有基本的内容管理和权限管理，日志管理，图片管理等。能让开发者在本系统上快速建立自己的业务，降低开发时间和精力，提高开发效率
                    </span>
                </div>
                <div class="margin-bottom-10 font-style" style=" text-indent: 2em;font-size:12px;">
                      <span class="span-style">
                    本网站可能有bug，或者你有新意的想法，欢迎你关注我的<a style="color:red" href="https://blog.csdn.net/qq_36977923" target="_blank" title="沉默小管">CSDN（沉默小管）</a>，并私信我。若开发中遇到问题可以添加我的微信群，大家一起讨论问题，闲聊。
                      </span>
                </div>

                <div style="text-indent: 2em;font-size:12px;" class="font-style">
                    <span class="span-style">
                      🔥   <span class="margin-left-5"></span>技术交流QQ群：837051545 <br/>
                    </span>
                </div>
                <div style="text-indent: 2em;font-size:12px;" class="font-style">
                    <span class="span-style">
                      👍   <span class="margin-left-5" style="color:red">点赞</span>，你的认可是我创作的动力！ <br/>
                    </span>
                </div>
                <div style="text-indent: 2em;font-size:12px;" class="font-style">
                    <span class="span-style">
                      ⭐️<span class="margin-left-5" style="color:red">收藏</span>，你的青睐是我努力的方向！ <br/>
                    </span>
                </div>
                <div style="text-indent: 2em;font-size:12px;" class="font-style">
                    <span class="span-style">
                      ✏️<span class="margin-left-5" style="color:red">评论</span>，你的意见是我进步的财富！ <br/>
                    </span>
                </div>
                <div class="margin-top-10 font-style" style=" text-indent: 2em;font-size:12px;">
                    <span class="span-style">
                      <a href="https://blog.csdn.net/qq_36977923" target="_blank" title="沉默小管">本网站持续迭代和更新，更多笔记请看我的<span style="color:red">CSDN（沉默小管）</span></a>
                    </span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col class="margin-bottom-10" :span="10" :xs="24" :sm="24" :md="12" :lg="12">
          <el-row :gutter="16">
            <el-col class="margin-bottom-10" :span="10" :xs="24" :sm="24" :md="24" :lg="24">
              <div class="card-style">
                <div>
                  <div class="u-f margin-bottom-10">
                    <div class="margin-right-5 title-icon"></div>
                    <div style="line-height: 25px;">项目</div>
                  </div>
                  <div style="text-indent: 2em;font-size:12px;line-height:24px" class=" font-style">
                    <span class="span-style">
                      前端基于 <span style="color:red">Vue3</span>、Typescipt、Element-plus、vite、pinia、less、Sass、axios 等技术栈。后端基于 <span style="color:red">NestJS</span>，它利用JavaScript的渐进增强的能力，
                    使用并完全支持TypeScript（仍然允许开发者使用纯 JavaScript 进行开发），并结合了OOP（面向对象编程）、FP（函数式编程）和 FRP （函数响应式编程）。如果对你有帮助或者喜欢，可以点个星星支持一下。
                    </span>
                  </div>
                  <div class="u-f margin-top-10">
                    <div class="margin-right-10">
                      <a target="_blank" href='https://gitee.com/derekgo/vue-cms_xg'><img src='https://gitee.com/derekgo/vue-cms_xg/badge/star.svg?theme=dark' alt='star'/></a>
                    </div>
                    <div>
                      <a target="_blank" href='https://gitee.com/derekgo/vue-cms_xg/members'><img src='https://gitee.com/derekgo/vue-cms_xg/badge/fork.svg?theme=dark' alt='fork'/></a>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col class="margin-bottom-10" :span="10" :xs="24" :sm="24" :md="24" :lg="24">
              <div class="card-style">
                <div>
                  <div class="u-f margin-bottom-10">
                    <div class="margin-right-5 title-icon"></div>
                    <div style="line-height: 25px;">交流</div>
                  </div>
                  <div class="margin-top-20 u-f u-f-aja u-f-spa">
                    <div>
                      <div class="u-f u-f-ac u-f-ajc" style="height:100px;">
                        <CommonImage :imgStyle="'cursor:pointer;height: 100px;width: auto;'" :picUrl="stationBImage" />
                      </div>
                      <div class="margin-top-5" style="text-align: center;color:#a8abb2;font-size:12px;">
                        b站
                      </div>
                    </div>
                    <div>
                      <div class="u-f u-f-ac u-f-ajc" style="height:100px;">
                        <CommonImage :imgStyle="'cursor:pointer;height: 100px;width: auto;'" :picUrl="douyinImage" />
                       </div>
                      <div class="margin-top-5" style="text-align: center;color:#a8abb2;font-size:12px;">
                        抖音
                      </div>
                    </div>
                    <div>
                      <div class="u-f u-f-ac u-f-ajc" style="height:100px;">
                        <CommonImage :imgStyle="'cursor:pointer;height: 100px;width: auto;'" :picUrl="wechatImage" />
                      </div>
                      <div class="margin-top-5" style="text-align: center;color:#a8abb2;font-size:12px;">
                        微信
                      </div>
                    </div>
                    <div>
                      <div class="u-f u-f-ac u-f-ajc" style="height:100px;">
                        <CommonImage :imgStyle="'cursor:pointer;height: 100px;width: auto;'" :picUrl="qqImage" />
                      </div>
                      <div class="margin-top-5" style="text-align: center;color:#a8abb2;font-size:12px;">
                        QQ
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="card-style">
      <div class="u-f u-f-spa margin-bottom-5 margin-top-5">
        <div class="u-f margin-right-10">
          <div class="margin-right-5 title-icon"></div>
          <div style="line-height: 25px;">访问量</div>
        </div>
        <div class="u-f u-f-ac u-f-ajc">
          <el-date-picker
              @change="handleChangeDate"
              v-model="dateRangeData"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :disabled-date="handleDisabledDate"
              :size="'small'"/>
        </div>
      </div>
      <div style="min-height:250px;max-height:250px;width:100%;position: relative;">
        <QiunVueUcharts style="position:absolute;left:0px;top:0px;" type="area" :opts="opts" :chartData="chartData" :ontouch="true" />
      </div>
      <el-row :gutter="16" class="margin-top-20">
        <el-col class="margin-bottom-10" :span="10" :xs="24" :sm="24" :md="12" :lg="12">
          <div class="u-f margin-bottom-10">
            <div class="margin-right-5 title-icon"></div>
            <div style="line-height: 25px;">用户来源排名</div>
          </div>
          <div style="line-height: 24px">
            <UserSourceTop/>
          </div>
        </el-col>
        <el-col class="margin-bottom-10" :span="10" :xs="24" :sm="24" :md="12" :lg="12">
          <div class="u-f margin-bottom-10">
            <div class="margin-right-5 title-icon"></div>
            <div style="line-height: 25px;">活跃页面排名</div>
          </div>
          <div style="line-height: 24px">
            <ActivePageTop/>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="margin-top-20">
      <!--        统计显示-->
      <el-row :gutter="16">
        <el-col class="margin-bottom-10" :span="10" :xs="24" :sm="8" :md="8" :lg="8">
          <div class="card-style">
            <el-statistic :value="accessStatistics">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  访问人数
                  <el-tooltip
                      effect="dark"
                      content="Number of visitors"
                      placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col class="margin-bottom-10" :span="10" :xs="24" :sm="8" :md="8" :lg="8">
          <div class="card-style">
            <el-statistic :value="artStatistics">
              <template #title>
                <div style="display: inline-flex; align-items: center">
                  文章总数
                  <el-tooltip
                      effect="dark"
                      content="Total number of articles"
                      placement="top"
                  >
                    <el-icon style="margin-left: 4px" :size="12">
                      <Warning />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col class="margin-bottom-10" :span="10" :xs="24" :sm="8" :md="8" :lg="8">
        </el-col>
      </el-row>
    </div>

    <div class="margin-top-20">
      <el-row :gutter="16">
        <el-col class="margin-bottom-10" :span="10" :xs="24" :sm="12" :md="8" :lg="8">
          <div class="card-style">
            <div>
              <div class="u-f margin-bottom-10">
                <div class="margin-right-5 title-icon"></div>
                <div style="line-height: 25px;">日历</div>
              </div>
              <div class="u-f u-f-ac u-f-ajc">
                <Calendar
                    backgroundText
                    class-name="select-mode"
                    :remarks="remarks"
                    :lunar="lunar"
                />
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!--        编辑-->
    <G_GetStarDialog ref="getStarDialogRef"/>
  </Loading>
</template>

<script setup lang="ts">
import wechatGroupImage from "@/assets/img/wechatGroup.jpg"
import douyinImage from "@/assets/img/douyin.png"
import stationBImage from "@/assets/img/stationB.jpg"
import wechatImage from "@/assets/img/wechat.jpg"
import qqImage from "@/assets/img/qq.jpg"
import 'element-plus/es/components/statistic/style/css'
import {
  Warning,
} from '@element-plus/icons-vue'
import QiunVueUcharts from '@qiun/vue-ucharts'
import {handleGetAllDate} from "@/utils/utils";
import {handleFormat, handleGetCurInstance} from "@/utils/utils";
import {requestAccessStatistics, requestAccessTimeSlot} from "@/network/home/index";
import {requestArtStatistics} from "@/network/home/index";
import vueCms from "@/assets/img/vueCms.jpg"
import Loading from "@/components/loading/index.vue"
import Calendar from 'mpvue-calendar'
import lunar from 'mpvue-calendar/dist/lunar'
import {useStore} from "@/store/piniaAutoImport";
import {defineAsyncComponent, onMounted, reactive, ref} from "vue";
import {io} from "socket.io-client";
import {socketClient} from "@/plugins/socketClient";
import {throttle} from "@/utils/lodash";
const CommonImage = defineAsyncComponent(()=>import("@/components/commonImage/index.vue"))
const UserSourceTop = defineAsyncComponent(()=>import("./cpns/userSourceTop/index.vue"))
const ActivePageTop = defineAsyncComponent(()=>import("./cpns/activePageTop/index.vue"))
import G_GetStarDialog from "@/views/common/getStarDialog/index.vue"


let getStarDialogRef = ref<InstanceType<typeof G_GetStarDialog>>()
let opts1 = ref({
  opts: {
    color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
    padding: [15,30,0,5],
    enableScroll: false,
    legend: {},
    xAxis: {
      boundaryGap: "justify",
      disableGrid: false,
      min: 0,
      axisLine: false,
      max: 70
    },
    yAxis: {},
    extra: {
      bar: {
        type: "stack",
        width: 30,
        meterBorde: 1,
        meterFillColor: "#FFFFFF",
        activeBgColor: "#000000",
        activeBgOpacity: 0.08,
        categoryGap: 2
      }
    }
  }
})
let userSourceTop = ref({})
let activePageTop = ref({})
let appStore = useStore("useApp")
let settingStore = useStore("useSetting")
let remarks = ref({'2023-3-13': ''})
let chartData = ref({})
let opts = ref({
  color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
  padding: [15,15,0,15],
  enableScroll: true,
  legend: {},
  xAxis: {
    disableGrid: true,
    scrollShow: true,
    itemCount: 6
  },
  yAxis: {
    gridType: "dash",
    dashLength: 2
  },
  extra: {
    area: {
      type: "straight",
      opacity: 0.2,
      addLine: true,
      width: 2,
      gradient: false,
      activeType: "hollow"
    }
  }
})
let title = ref("")
let dateRangeData = ref([])
let loading = ref<boolean>(false)
let accessStatistics = ref<number>(0)//访问人数
let artStatistics = ref<number>(0)//文章总数
let {model,axios} = handleGetCurInstance()

let data = ref([
  {
    id:1,
  },
  {
    id:2,
  },
  {
    id:3,
  },
  {
    id:4,
  },
  {
    id:5,
  },
  {
    id:6,
  },
  {
    id:7,
  },
  {
    id:8,
  },
  {
    id:9,
  },
  {
    id:10,
  },
  {
    id:11,
  },
  {
    id:12,
  },
  {
    id:13,
  },
  {
    id:14,
  },
  {
    id:15,
  }
])

const handleInitUserSource = () => {
  //模拟从服务器获取数据时的延时
  setTimeout(() => {
    //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    let res = {
      categories: ["2018","2019","2020","2021","2022","2023"],
      series: [
        {
          name: "目标值",
          data: [35,36,31,33,13,34]
        }
      ]
    };
    userSourceTop.value = JSON.parse(JSON.stringify(res));
  }, 500);
}
const handleInitActivePageTop = () => {
  //模拟从服务器获取数据时的延时
  setTimeout(() => {
    //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    let res = {
      categories: ["2018","2019","2020","2021","2022","2023"],
      series: [
        {
          name: "目标值",
          data: [35,36,31,33,13,34]
        }
      ]
    };
    activePageTop.value = JSON.parse(JSON.stringify(res));
  }, 500);
}
handleInitUserSource()
handleInitActivePageTop()

//处理访问量时间段数据
const handleDealAccessTimeData = (dataArr:any[]) => {
  let categories:number[] = []
  let data:string[] = []
  for(let i in dataArr){
    categories.push(dataArr[i]["curDate"])
    data.push(dataArr[i]["curNum"])
  }
  let res = {
    categories,
    series: [
      {
        name: "访问量",
        data
      }
    ]
  };
  chartData.value = JSON.parse(JSON.stringify(res));
}
//日期改变
const handleChangeDate = (val:string)=>{
  if(!val)return;
  loading.value= true;
  let dateRangeArr = handleGetAllDate(handleFormat(val[0]),handleFormat(val[1]))
  let form = {
    dateRangeArr:JSON.stringify(dateRangeArr)
  }
  requestAccessTimeSlot(form).then(res=>{
    let {data,code,message} = res;
    if(code!=200){
      model.handleMsg(`${message}`,"warning")
      loading.value = false;
      return false;
    }
    handleDealAccessTimeData(data)
    loading.value = false;
  }).finally(()=>{
    loading.value = false;
  })
}
//设置禁用掉的日期
const handleDisabledDate = (time:Date)=>{
  return Date.now() < time.getTime() || time.getTime() < (Date.now() - 29*24*60*60*1000)
}
//获取访问量时间段数据
const handleGetAccessTimeSlot = ()=>{
  let curDate = handleFormat(new Date());//当天
  let beginDate = handleFormat(new Date(new Date().getTime()- 168*60*60*1000) );//7天前
  dateRangeData.value = [new Date(new Date().getTime()- 168*60*60*1000),new Date()]
  let dateRangeArr = handleGetAllDate(beginDate,curDate)
  let form = {
    dateRangeArr:JSON.stringify(dateRangeArr)
  }
  return requestAccessTimeSlot(form).then(res=>{
    let {data,code,message} = res;
    if(code!=200){
      model.handleMsg(`${message}`,"warning")
      return false;
    }
    handleDealAccessTimeData(data)
    return true;
  })
}
//文章总数
const handleGetArtStatistics = ()=>{
  return requestArtStatistics().then(res=>{
    let {data,code,message} = res;
    if(code!=200){
      model.handleMsg(`${message}`,"warning")
      return false;
    }
    artStatistics.value = data-0;
    return true;
  })
}
//文章总数
const handleGetAccessStatistics = ()=>{
  return requestAccessStatistics().then(res=>{
    let {data,code,message} = res;
    if(code!=200){
      model.handleMsg(`${message}`,"warning")
      return false;
    }
    accessStatistics.value = data-0;
    return true;
  })
}
onMounted(()=>{
  loading.value = true;
  axios.all([handleGetAccessTimeSlot(),handleGetAccessStatistics(),handleGetArtStatistics()]).then(axios.spread((res:boolean,res1:boolean,res2:boolean)=>{
    if(res && res1 && res2){
      loading.value = false
    }else{
      loading.value = false
    }
  }))
    if(!appStore.getStar){
    getStarDialogRef.value.handleOpenDialog()
  }
})

</script>
<style scoped lang="less">
.font-style{
  line-height:2;
  .span-style{
    padding:4px 0px;
    background:linear-gradient(to right,rgb(64, 158, 255),rgb(64, 208, 255)) no-repeat right bottom;
    background-size:0px 2px;
    transition:background-size 1300ms linear;
  }
  .span-style:hover{
    background-position-x: left;
    background-size:100% 2px
  }
}

</style>
<style scoped lang="scss">
@import "@/assets/css/variables.scss";
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}
.title-icon{
  width:5px;
  height:25px;
  background-color: v-bind("settingStore.themeColor.primary");
}
.el-statistic {
  --el-statistic-content-font-size: 28px;
}
.card-style {
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}

.listItem{
  border:1px solid red;
  padding:10px;
}
</style>
