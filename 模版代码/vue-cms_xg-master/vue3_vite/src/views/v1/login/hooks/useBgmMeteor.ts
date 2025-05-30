/*- coding = utf-8 -*-
@Time : 2023/4/8 16:06
@Author : CSDN 沉默小管
@File : useBgmMeteor.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import $ from 'jquery'

export const useBgmMeteor = ()=>{

    const handleInitMeteor = ()=>{
        let wdWidth = $('.login').width();//获取浏览器宽度


        function getRandom(range){//获取指定范围的随机数[0,range]
            return Math.floor(Math.random()*(range+1));
        }

        //创建流星并移动
        function move(){
            let star = $('<div id="star" style="width:10px;height:10px;background-color: transparent;position:absolute;top:-5px;">' +
                '<div style="position:absolute;width:4px;height:4px;border-radius: 100%;bottom:0px;left:0px;background-color:#ccc!important;"></div>' +
                '<div style="position:absolute;width:3px;height:3px;bottom:3px;left:3px;background-color:#ccc!important;"></div>' +
                '<div style="position:absolute;width:2px;height:2px;bottom:6px;left:6px;background-color:#ccc!important;"></div>' +
                '<div style="position:absolute;width:1px;height:1px;bottom:8px;left:8px;background-color:#ccc!important;"></div>' +
                '<div style="position:absolute;width:1px;height:1px;bottom:9px;left:9px;background-color:#ccc!important;"></div>' +
                '</div>');//创建元素
            $('.login').append(star);//添加元素
            let range = getRandom(wdWidth);//获取随机位置
            star.css('left',range);//设置流星初始位置
            star.animate({top:range,left:0,bottom:0},5*range,function () {//向45度角左下方移动，设置移动方向距离和速度
                star.remove();//删除div
            });
        }

        move();//加载完成立即运行一次
        setInterval(move,700);//间隔一定时间重复运行
    }
    return{
        handleInitMeteor
    }
}