<!--
*- coding = utf-8 -*-
#@Time : 2023-09-04 22:26
#@Author :
#@File : index.vue
#@web  : www.php-china.com
#@Software: WebStorm
-->
<!--3d饼图-->
<template>
  <div style="width: 100%; height: 100%">
    <div ref="pieChart" id="myChart" v-bind="attrs"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useAttrs } from "vue";
import * as echarts from "echarts";
import "echarts-gl";
import ECharts = echarts.ECharts;
let attrs = useAttrs();
let pieChart = ref(null);
let props: any = {
  tname: "",
  tdata: "",
  tcolor1: "#D6476C",
  tcolor2: "#017DC1",
  tcolor3: "red",
  tcolor4: "green",
};
let pieInfo = ref({
  labelColor: "white",
});
let isSelected = ref(false);
let startRatio = ref(0);
let endRatio = ref(1);
let isHovered = ref(true);
let k = ref(0);
let myChart = ref<ECharts | any>();
let option = ref();

onMounted(() => {
  console.log(props.tname, props.tdata);
  initEcharts(props.tdata, props.tname);
});
// 渲染echarts图
const initEcharts = (tdata, tname) => {
  // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
  let selectedIndex = "";
  let hoveredIndex = "";
  myChart.value = echarts.init(pieChart.value);
  // 传入数据生成 option
  option.value = getPie3D(
    [
      {
        name: "100小时以上",
        value: 25,
        itemStyle: {
          color: props.tcolor1,
          opacity: 0.7,
        },
      },
      {
        name: "50-99小时",
        value: 25,
        itemStyle: {
          color: props.tcolor2,
          opacity: 0.7,
        },
      },
      {
        name: "49-20小时",
        value: 25,
        itemStyle: {
          color: props.tcolor3,
          opacity: 0.7,
        },
      },
      {
        name: "0-19小时",
        value: 25,
        itemStyle: {
          color: props.tcolor4,
          opacity: 0.7,
        },
      },
    ],
    0.59
  );

  myChart.value.on("click", function (params: any) {
    //选中下标索引
    // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
    isSelected.value =
      !option.value.series[params.seriesIndex].pieStatus.selected;
    isHovered.value = option.value.series[params.seriesIndex].pieStatus.hovered;
    k.value = option.value.series[params.seriesIndex].pieStatus.k;
    startRatio.value =
      option.value.series[params.seriesIndex].pieData.startRatio;
    endRatio.value = option.value.series[params.seriesIndex].pieData.endRatio;

    // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
    isSelected.value ? (selectedIndex = params.seriesIndex) : null;

    // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
    if (selectedIndex !== "" && selectedIndex !== params.seriesIndex) {
      option.value.series[selectedIndex].parametricEquation =
        getParametricEquation(
          option.value.series[selectedIndex].pieData.startRatio,
          option.value.series[selectedIndex].pieData.endRatio,
          false,
          false,
          k.value,
          option.value.series[selectedIndex].pieData.value
        );
      option.value.series[selectedIndex].pieStatus.selected = false;
    }

    // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
    option.value.series[params.seriesIndex].parametricEquation =
      getParametricEquation(
        startRatio.value,
        endRatio.value,
        isSelected.value,
        isHovered.value,
        k.value,
        option.value.series[selectedIndex].pieData.value
      );
    option.value.series[params.seriesIndex].pieStatus.selected =
      isSelected.value;

    // 使用更新后的 option，渲染图表
    myChart?.value.setOption(option.value);
  });

  // 修正取消高亮失败的 bug
  myChart.value.on("globalout", function () {
    if (hoveredIndex !== "") {
      // 从 option.value.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
      isSelected.value = option.value.series[hoveredIndex].pieStatus.selected;
      isHovered.value = false;
      k.value = option.value.series[hoveredIndex].pieStatus.k;
      startRatio.value = option.value.series[hoveredIndex].pieData.startRatio;
      endRatio.value = option.value.series[hoveredIndex].pieData.endRatio;
      console.log(isSelected.value);

      // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
      option.value.series[hoveredIndex].parametricEquation =
        getParametricEquation(
          startRatio.value,
          endRatio.value,
          isSelected.value,
          isHovered.value,
          k.value,
          option.value.series[hoveredIndex].pieData.value
        );
      option.value.series[hoveredIndex].pieStatus.hovered = isHovered.value;

      // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
      hoveredIndex = "";
    }

    // 使用更新后的 option，渲染图表
    myChart.value.setOption(option.value);
  });

  myChart.value.on("mouseover", function (params) {
    console.log("进去");
    // 准备重新渲染扇形所需的参数
    // let isSelected;
    // let isHovered;
    // let startRatio;
    // let endRatio;
    // let k;
    // 如果触发 mouseover 的扇形当前已高亮，则不做操作
    if (hoveredIndex === params.seriesIndex) {
      return;

      // 否则进行高亮及必要的取消高亮操作
    } else {
      // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
      if (hoveredIndex !== "") {
        // 从 option.value.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
        isSelected.value = option.value.series[hoveredIndex].pieStatus.selected;
        isHovered.value = false;
        startRatio.value = option.value.series[hoveredIndex].pieData.startRatio;
        endRatio.value = option.value.series[hoveredIndex].pieData.endRatio;
        k.value = option.value.series[hoveredIndex].pieStatus.k;

        // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
        option.value.series[hoveredIndex].parametricEquation =
          getParametricEquation(
            startRatio.value,
            endRatio.value,
            isSelected.value,
            isHovered.value,
            k.value,
            option.value.series[hoveredIndex].pieData.value
          );
        option.value.series[hoveredIndex].pieStatus.hovered = isHovered;

        // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
        hoveredIndex = "";
      }
      // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
      if (params.seriesName !== "mouseoutSeries") {
        // 从 option.value.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
        isSelected.value =
          option.value.series[params.seriesIndex].pieStatus.selected;
        isHovered.value = true;
        startRatio.value =
          option.value.series[params.seriesIndex].pieData.startRatio;
        endRatio.value =
          option.value.series[params.seriesIndex].pieData.endRatio;
        k.value = option.value.series[params.seriesIndex].pieStatus.k;

        // 对当前点击的扇形，执行高亮操作（对 option 更新）
        option.value.series[params.seriesIndex].parametricEquation =
          getParametricEquation(
            startRatio.value,
            endRatio.value,
            isSelected.value,
            isHovered.value,
            k.value,
            option.value.series[params.seriesIndex].pieData.value + 20
          );
        option.value.series[params.seriesIndex].pieStatus.hovered =
          isHovered.value;

        // 记录上次高亮的扇形对应的系列号 seriesIndex
        hoveredIndex = params.seriesIndex;
      }

      // 使用更新后的 option，渲染图表
      myChart.value.setOption(option.value);
    }
  });

  myChart.value && myChart.value.setOption(option.value);
};

// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
const getParametricEquation = (
  startRatio,
  endRatio,
  isSelected,
  isHovered,
  k,
  h
) => {
  // 计算
  let midRatio = (startRatio + endRatio) / 2;

  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== "undefined" ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },

    x: function (u, v) {
      if (u < startRadian) {
        return (
          offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y: function (u, v) {
      if (u < startRadian) {
        return (
          offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
};

// 生成模拟 3D 饼图的配置项
const getPie3D = (pieData, internalDiameterRatio) => {
  let series: any = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let legendData: any = [];
  let k =
    typeof internalDiameterRatio !== "undefined"
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3;
  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;

    let seriesItem: any = {
      name:
        typeof pieData[i].name === "undefined" ? `series${i}` : pieData[i].name,
      type: "surface",
      parametric: true,
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k,
      },
      itemStyle: {},
    };
    if (typeof pieData[i].itemStyle != "undefined") {
      let itemStyle: any = {};

      typeof pieData[i].itemStyle.color != "undefined"
        ? (itemStyle.color = pieData[i].itemStyle.color)
        : null;
      typeof pieData[i].itemStyle.opacity != "undefined"
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null;
      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  let linesSeries: any = [];
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;

    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value === series[0].pieData.value ? 35 : 10
    );

    startValue = endValue;
    let midRadian =
      (series[i].pieData.endRatio + series[i].pieData.startRatio) * Math.PI;
    let posX = Math.cos(midRadian) * (1 + Math.cos(Math.PI / 2));
    let posY = Math.sin(midRadian) * (1 + Math.cos(Math.PI / 2));
    let posZ = Math.log(Math.abs(series[i].pieData.value + 1)) * 0.1;
    let flag =
      (midRadian >= 0 && midRadian <= Math.PI / 2) ||
      (midRadian >= (2 * Math.PI) / 2 && midRadian <= Math.PI * 2)
        ? 1
        : -1;
    let endPosArr = [
      posX * 1.2 + i * 0.2 * flag + (flag < 0 ? -0.5 : 0),
      posY * 1.4 + i * 0.1 * flag + (flag < 0 ? -0.5 : 0),
      posZ * 2,
    ];
    linesSeries.push({
      type: "scatter3D",
      label: {
        show: true,
        textStyle: {
          color: pieInfo.value.labelColor,
          backgroundColor: "transparent",
        },
        formatter: "{b}",
      },
      symbolSize: 0,
      data: [{ name: series[i].pieData.value, value: endPosArr }],
    });
    legendData.push(series[i].name);
  }
  series = series.concat(linesSeries);

  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  let option = {
    // animation: false,
    legend: {
      top: 10,
      left: 10,
      textStyle: {
        fontSize: 12,
        color: "#FFFFFF",
      },
      // icon:'diamond',
      data: legendData,
      formatter: (params) => {
        return params;
      },
    },
    tooltip: {
      formatter: (params) => {
        if (params.seriesName !== "mouseoutSeries") {
          return `${
            params.seriesName
          }<br/><span style="display:inline-block;margin-right:.1042rem;border-radius:.2083rem;width:.2083rem;height:.2083rem;background-color:${
            params.color
          };"></span>${option.series[params.seriesIndex].pieData?.value}`;
        }
        return "";
      },
    },
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      min: -1,
      max: 1,
    },
    grid3D: {
      top: 35,
      boxWidth: 80,
      height: 180,
      show: false,
      boxHeight: 5,
      viewControl: {
        //3d效果可以放大、旋转等，请自己去查看官方配置
        // 3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: 35,
        // beta: 30,
        rotateSensitivity: 1,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: true,
        distance: 150,
      },
    },
    series: series,
  };
  return option;
};
onBeforeUnmount(() => {
  if (myChart.value) {
    myChart.value.clear();
    myChart.value.dispose();
    myChart.value = null;
    window.removeEventListener("resize", () => {
      myChart.value.resize();
    });
  }
});
</script>

<style scoped lang="less">
#myChart {
  width: 7.2917rem;
  height: 4.5208rem;
}
</style>
