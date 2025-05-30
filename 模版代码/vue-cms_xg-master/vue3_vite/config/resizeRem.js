/*- coding = utf-8 -*-
@Time : 2023/8/24 17:15
@Author : 管茂良
@File : resizeRem.ts
@web  : www.php-china.com
@Software: WebStorm
*/
//移动端适配配置
// 基准大小
let baseSize = 16;

// 设置 rem 函数
function setRem() {
    // 当前页面宽度相对于 375 宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / 375;
    // 设置页面根节点字体大小,Math.min(scal,2)表示最大缩放比例为2
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + "px";
}

// 初始化
// setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    // setRem();
};
