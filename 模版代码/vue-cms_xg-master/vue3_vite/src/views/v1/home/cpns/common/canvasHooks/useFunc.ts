/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import {onUnmounted, ref} from "vue";
import * as echarts from "echarts";
import {debounce} from "@/utils/lodash";

export const useFunc = (styleId:string,handleGetServerData:Function) =>{
    let cWidth = ref(750)
    let cHeight = ref(500)
    let attackSourcesColor1 = ['#FF557F','#FFAA00','#5470C6','#1E9FFF'];
    let seriesName = ['2023年出口额','2022年出口额'];
    let echart = echarts;

    let attackSourcesColor = [
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: 'rgba(255,85,127,1)' },
            { offset: 1, color: 'rgba(255,85,127,1)' },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: 'rgba(255,170,0,1)' },
            { offset: 1, color: 'rgba(255,170,0,1)' },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: 'rgba(84,112,198,1)' },
            { offset: 1, color: 'rgba(84,112,198,1)' },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
            { offset: 0, color: 'rgba(30,159,255,.82)' },
            { offset: 1, color: 'rgba(30,159,255,.82)' },
        ]),
    ];


    const dataFormat = (data) => {
        let arr:Array<any> = [];
        data.forEach(function (item, i) {
            let itemStyle = {
                color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i],
            };
            arr.push({
                value: item,
                itemStyle: itemStyle,
            });
        });
        return arr;
    }
    const contains = (arr, dst) => {
        let i = arr.length;
        while ((i -= 1)) {
            if (arr[i] == dst) {
                return i;
            }
        }
        return false;
    }
    let chart:any;
    const handleInitChart = (item:any) => {
        let rankings:Array<string|number> = [];
        let stationData:Array<string|number> = [];
        let values:Array<string|number> = [];

        item.forEach((it:any, index:any)=>{
            rankings.push(it.ranking);
            stationData.push(it.station);
            values.push(it.value);
        });

        chart = echart.init(document.getElementById(styleId), "dark");
        chart.setOption({
            backgroundColor: '',
            grid: {
                top: '30px',
                left: '50px',
                right: '0px',
                bottom: '0px',
                // containLabel: true,
            },
            xAxis: {
                type: 'value',
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
            },
            yAxis: [
                {
                    type: 'category',
                    inverse: true,
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    data: stationData,
                    axisLabel: {
                        margin: 30,
                        fontSize: 14,
                        align: 'left',
                        padding: [3, 0, 0, 0],
                        color: '#000',
                        rich: {
                            nt1: {
                                color: '#fff',
                                backgroundColor: attackSourcesColor1[0],
                                width: 20,
                                height: 18,
                                fontSize: 12,
                                align: 'center',
                                borderRadius: 50,
                                lineHeight: '5',
                                padding: [2, 0, 0, 0],
                                // padding:[0,0,2,0],
                            },
                            nt2: {
                                color: '#fff',
                                backgroundColor: attackSourcesColor1[1],
                                width: 20,
                                height: 18,
                                fontSize: 12,
                                align: 'center',
                                borderRadius: 50,
                                padding: [2, 0, 0, 0],
                            },
                            nt3: {
                                color: '#fff',
                                backgroundColor: attackSourcesColor1[2],
                                width: 20,
                                height: 18,
                                fontSize: 12,
                                align: 'center',
                                borderRadius: 50,
                                padding: [2, 0, 0, 0],
                            },
                            nt: {
                                color: '#fff',
                                backgroundColor: attackSourcesColor1[3],
                                width: 20,
                                height: 18,
                                fontSize: 12,
                                align: 'center',
                                borderRadius: 50,
                                padding: [2, 0, 0, 0],
                            },
                        },
                        formatter: function (value, index) {
                            index = contains(stationData, value) + 1;
                            if (index - 1 < 3) {
                                return ['{nt' + index + '|' + index + '}'].join('\n');
                            } else {
                                return ['{nt|' + index + '}'].join('\n');
                            }
                        },
                    },
                },

                {
                    type: 'category',
                    inverse: true,
                    axisTick: 'none',
                    axisLine: 'none',
                    show: true,
                    axisLabel: {
                        color: '#666',
                        fontSize: '12',
                    },
                    data: dataFormat(values),
                },

                {  // 条状标题
                    type: 'category',
                    inverse: true,
                    offset: -10,
                    position: 'left',
                    axisTick: 'none',
                    axisLine: 'none',
                    show: true,
                    axisLabel: {
                        interval: 0,
                        color: ['#666'],
                        align: 'left',
                        verticalAlign: 'bottom',
                        lineHeight: 42,
                        fontSize: 14,
                    },
                    data: dataFormat(stationData),
                },
            ],
            series: [
                {
                    zlevel: 1,
                    name: seriesName[0],
                    type: 'bar',
                    barWidth: 15,
                    data: dataFormat(values),
                    align: 'center',
                    itemStyle: {
                        borderRadius: 5,
                    },
                    label: {   //条状中的样式
                        show: true,
                        fontSize: 10,
                        color: '#fff', //条装中字体颜色
                        textBorderWidth: 2,
                        padding: [2, 0, 0, 0],
                    },
                },
                {
                    name: seriesName[1],
                    type: 'bar',
                    barWidth: 15,
                    barGap: '-100%',
                    data: [18, 16, 17, 15, 16, 15, 14, 15, 14, 13],
                    itemStyle: {
                        color: 'rgba(200,200,200,.3)',
                        //width:"100%",
                        fontSize: 12,
                        borderRadius: 5,
                    },
                },
            ],
        })

        window.onresize = function() {
            handleWindowsResize()
        }
    }
    const handleWindowsResize = debounce(()=>{
        chart.resize();
    },500)
    const handleInitData = ()=>{
        handleGetServerData()
    }
    onUnmounted(()=>{
        handleWindowsResize.cancel()
    })
    return {
        handleInitData,handleInitChart,cWidth,cHeight
    }
}
