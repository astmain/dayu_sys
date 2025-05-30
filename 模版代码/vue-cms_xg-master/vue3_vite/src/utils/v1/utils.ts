//*- coding = utf-8 -*-
//@Time : 2021-12-23 1:48
//@Author : 沉默小管
//@File : utils.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
// import axios from "axios";

// 处理时间戳
import moment from "moment";
import {ComponentInternalInstance, getCurrentInstance, ref} from 'vue'
import {AsyncComponentLoader, defineAsyncComponent} from "vue";
import LoadComponentsAsync from "@/components/loadComponentsAsync/index.vue"
import {useI18n} from "vue-i18n";
import {useUser} from "@/store/index";
import {permsEnum} from "@/utils/enum";


export function handleFormatDate(timeStamp: string, fmt='YYYY-mm-dd', noShowCy?: undefined){
    if (!timeStamp) return timeStamp;
    const stamp = (timeStamp + "").length === 10 ? parseInt(timeStamp) * 1000 : parseInt(timeStamp)
    const date = new Date(stamp);
    // date.setTime((timeStamp + "").length === 10 ? parseInt(timeStamp) * 1000 : parseInt(timeStamp));
    const isCy = new Date().getFullYear() == date.getFullYear();//本年
    if (!fmt || fmt === 's') {
        const yFmt = isCy && noShowCy ? '' : 'YYYY-';
        fmt = yFmt + (fmt === 's' ? 'mm-dd HH:MM:SS' : 'mm-dd HH:MM');
    }
    if (fmt.includes('YYYY') && isCy && noShowCy) {
        const yTxt = 'YYYY' + fmt.charAt(4);
        fmt = fmt.replace(yTxt, '');//删除显示本年
    }
    let ret;
    let opt:any = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };

    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            const tkey = ret[1];
            const val = (tkey.length == 1) ? (opt[k]) : (opt[k].padStart(tkey.length, "0"));
            fmt = fmt.replace(tkey, val);
        }
    }
    return fmt;
};
// 日期格式化
export function handleParseTime(time:string|number, pattern?:string) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        } else if (typeof time === 'string') {
            time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}


/**
 * 两个时间期间
 */
export function handleTimeDiff(oldDate:any=(new Date("2019-11-12 00:00:00")),newDate:any=(new Date())){

    let diffTime:any = Math.abs((newDate - oldDate)/1000); //计算时间差,并把毫秒转换成秒

    let days = Math.floor(diffTime/86400); // 天  24*60*60*1000
    let hours = Math.floor(diffTime/3600)-24*days;    // 小时 60*60 总小时数-过去的小时数=现在的小时数
    let minutes = Math.floor(diffTime%3600/60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
    let seconds = Math.floor(diffTime%60);  // 以60秒为一整份 取余 剩下秒数
    return days+"天"+hours+"时"+minutes+"分"+seconds+"秒";
}
/**
 * 下载文件
 * @param fileStream    文件流
 * @param fileName      文件名
 */
export function downLoadFile(fileStream: BlobPart,fileName="test"){
    let link = document.createElement("a");
    //type就是blob的type,是MIME类型的，可以自己查看MIME类型都有哪些
    let blogw = new Blob([fileStream],{type:"application/vnd.ms-excel;charset=utf-8"})
    let objectUrl = window.URL.createObjectURL(blogw);    //创建一个新的url对象
    link.href = objectUrl;
    let file_name = `${moment().format('YYYY-MM-DD HH:mm:ss')}的${fileName}列表.xlsx`;
    link.download = file_name;    //  下载的时候自定义的文件名
    link.click();
    window.URL.revokeObjectURL(objectUrl);
}

//获取当前页面的上下文
export function handleGetCurInstance(){
    const {appContext,proxy} = getCurrentInstance() as ComponentInternalInstance
    let globalProperties = appContext.config.globalProperties;
    let axios = globalProperties.$axios;
    let model = globalProperties.$model;
    let tab = globalProperties.$tab;
    let download = globalProperties.$download;
    let auth = globalProperties.$auth;
    let dict = globalProperties.$dict;
    let i18n = useI18n();
    return {
        globalProperties,proxy,
        axios,model,tab,download,auth,dict,i18n
    }
}

//异步加载组件
export function handleAsyncComp(asyncComp:AsyncComponentLoader){
    const AsyncComp = defineAsyncComponent({
        // 加载函数
        loader:asyncComp,

        // 加载异步组件时使用的组件
        loadingComponent: LoadComponentsAsync,
        // 展示加载组件前的延迟时间，默认为 200ms
        delay: 200,

        // 加载失败后展示的组件
        errorComponent: ()=>"444444444444444444444444444",
        // 如果提供了一个 timeout 时间限制，并超时了
        // 也会显示这里配置的报错组件，默认值是：Infinity
        timeout: 4000
    })
    return AsyncComp;
}
// 处理导航路劲
export const handleDealNormalPath = (p: string) => {
    if (p.length === 0 || !p || p == "undefined") {
        return p;
    }
    let res = p.replace("//", "/");
    if (res[res.length - 1] === "/") {
        return res.slice(0, res.length - 1);
    }
    return res;
}

/**
 * 判断当前设备
 * @returns
 */
export function handleCurBrowser():string|void {
    let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    let isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    let isIE = userAgent.indexOf("compatible") > -1
        && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    let isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    let isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    let isSafari = userAgent.indexOf("Safari") > -1
        && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    let isChrome = userAgent.indexOf("Chrome") > -1
        && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        let fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return "IE7";
        } else if (fIEVersion == 8) {
            return "IE8";
        } else if (fIEVersion == 9) {
            return "IE9";
        } else if (fIEVersion == 10) {
            return "IE10";
        } else if (fIEVersion == 11) {
            return "IE11";
        } else {
            return "0";
        }//IE版本过低
        return "IE";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isEdge) {
        return "Edge";
    }
    if (isFF) {
        return "FF";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
    }
}
// 系统区分
export function handleGetOS():string{
    let u = navigator.userAgent
    if (!!u.match(/compatible/i) || u.match(/Windows/i)) {
        return 'windows'
    } else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i)) {
        return 'macOS'
    } else if (!!u.match(/iphone/i) || u.match(/Ipad/i)) {
        return 'ios'
    } else if (u.match(/android/i)) {
        return 'android'
    } else if (u.match(/Ubuntu/i)) {
        return 'Ubuntu'
    } else {
        return 'other'
    }
}
// 区别是否为pc端还是无线端
// const RequestTerminal={
//   1:"PC端",
//   2:"无线端",
// }
export function handleGetPcOrIphone():number {
    let u = navigator.userAgent
    if (!!u.match(/compatible/i) || u.match(/Windows/i)) {
        return 1
    } else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i)) {
        return 1
    } else if (!!u.match(/iphone/i) || u.match(/Ipad/i)) {
        return 2
    } else if (u.match(/android/i)) {
        return 2
    } else if (u.match(/Ubuntu/i)) {
        return 1
    } else {
        return 3
    }
}

//获取时间区间所有日期
export const handleGetAllDate = (start, end) => {
    let dateArr:string[] = [];
    let startArr = start.split("-");
    let endArr = end.split("-");
    let db = new Date();
    db.setUTCFullYear(startArr[0], startArr[1] - 1, startArr[2]);
    let de = new Date();
    de.setUTCFullYear(endArr[0], endArr[1] - 1, endArr[2]);
    let unixDb = db.getTime();
    let unixDe = de.getTime();
    let stamp;
    const oneDay = 24 * 60 * 60 * 1000;
    for (stamp = unixDb; stamp <= unixDe; ) {
        dateArr.push(handleFormat(new Date(parseInt(stamp))));
        stamp = stamp + oneDay;
    }
    return dateArr;
};
export const handleFormat = (time:any) => {
    let ymd = "";
    let mouth =
        time.getMonth() + 1 >= 10
            ? time.getMonth() + 1
            : "0" + (time.getMonth() + 1);
    let day = time.getDate() >= 10 ? time.getDate() : "0" + time.getDate();
    ymd += time.getFullYear() + "-"; // 获取年份。
    ymd += mouth + "-"; // 获取月份。
    ymd += day; // 获取日。
    return ymd; // 返回日期。
};

//判断是否为json格式数据
export const handleIsJSON = (str) => {
    if (typeof str == 'string') {
        try {
            let obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }
        } catch(e) {
            console.log('error：'+str+'!!!'+e);
            return false;
        }
    }
    return true;
}

/**
 *
 * @param otherDom
 * @param isPageShow      是否有分页显示
 */
//用watch监听 数据变化
export const handleGetHeight = (otherDom?:string|boolean,isPageShow=false)=>{
    let topHeight = 88;//窗口顶层的高度
    let marginAndPaddingHeight = 25
    let pageHeight = !isPageShow?50:0;
    let fullHeight = document.documentElement.clientHeight+pageHeight;
    let otherHeight = document.querySelector(otherDom?otherDom:".top-style")?.clientHeight-100;//窗口中除了table其他的高度
    return fullHeight - topHeight - otherHeight - marginAndPaddingHeight - topHeight;
}

//清空数组中字符串的空格
export const handleArrTrim = (arr:any[]) => {
    for (const key in arr) {
        if (Object.prototype.hasOwnProperty.call(arr, key)) {
            const element = arr[key];
            if(typeof element !== 'string') continue
            arr[key] = element.trim()
        }
    }
    return arr;
}
//动态修改网站图标
export const handleIcoCreate = (icoUrl,title:string) => {
    let link:any = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = icoUrl
    document.getElementsByTagName('head')[0].appendChild(link);
    document.title = title +"-"+ import.meta.env.VITE_APP_TITLE
}

/**
 * 判断数据类型
 */
export const handleDataType = ()=>{
    let curCtx;
    curCtx.prototype.handleIsArray=(data:Array<any>)=>{
        return Object.prototype.toString.call(data) === "[object Array]"?true:false;
    }
    curCtx.prototype.handleIsNumber=(data:number)=>{
        return Object.prototype.toString.call(data) === "[object Number]"?true:false;
    }
    curCtx.prototype.handleIsString=(data:string)=>{
        return Object.prototype.toString.call(data) === "[object String]"?true:false;
    }
    curCtx.prototype.handleIsBoolean=(data:boolean)=>{
        return Object.prototype.toString.call(data) === "[object Boolean]"?true:false;
    }
    curCtx.prototype.handleIsNull=(data:null)=>{
        return Object.prototype.toString.call(data) === "[object Null]"?true:false;
    }
    curCtx.prototype.handleIsUndefined=(data:undefined)=>{
        return Object.prototype.toString.call(data) === "[object Undefined]"?true:false;
    }
    curCtx.prototype.handleIsFunction=(data:Function)=>{
        return Object.prototype.toString.call(data) === "[object Function]"?true:false;
    }
    curCtx.prototype.handleIsDate=(data:Date)=>{
        return Object.prototype.toString.call(data) === "[object Date]"?true:false;
    }
    curCtx.prototype.handleIsRegExp=(data:RegExp)=>{
        return Object.prototype.toString.call(data) === "[object RegExp]"?true:false;
    }
    curCtx.prototype.handleIsError=(data:Error)=>{
        return Object.prototype.toString.call(data) === "[object Error]"?true:false;
    }
    return curCtx;
}

//延迟加载
export function handleUseDefer(maxCount: number){
    let frameCount = ref<number>(0)
    let timer;
    //更新帧数
    function handleUpdateFrameCount(){
        timer = requestAnimationFrame(()=>{
            frameCount.value++;
            if(frameCount.value >= maxCount){
                cancelAnimationFrame(timer)
                return;
            }
            handleUpdateFrameCount();
        })
    }
    handleUpdateFrameCount();
    return {frameCount}
}
//生产环境执行
export function handleProEnvToIt(fn){
    if(process.env.NODE_ENV === "production"){
        return fn()
    }
}

//多条数据请求
// export function handleMoreRequest (...requestFunc) {
//     return axios.all([...requestFunc]).then(axios.spread((...res)=>{
//         if(!res.includes(false)){
//             return true;
//         }else{
//             return false;
//         }
//     }))
// }

//去数组中对象重复数据
export const handleUniqueFunc = (arr, uniId) => {
    const res = new Map();
    return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
}
//复制内容
export const handleCopyContent = (val:string|number) => {
    let oInput:any = document.createElement('input');
    oInput.value = val;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象;
    //执行复制
    document.execCommand('copy')
    oInput.remove()
    return true;
}
//echarts字体大小
export function handleFontSize(res, autoWith = 1920) {
    const clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = clientWidth / autoWith;
    return res * fontSize;
}

/**
 * 字符权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function handleCheckPower(value:string|string[]):boolean {
    const all_permission = "*:*:*";
    const permissions = useUser().permissions
    if (value && value instanceof Array && value.length > 0) {
        const permissionFlag = value

        const hasPermissions = permissions.some((permission: string) => {
            return all_permission === permission || permissionFlag.includes(permission)
        })
        if (!hasPermissions) {
          return false;
        }
        return true
    } else {
        return false
    }
}

/**
 * 角色权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function handleCheckRole(value:string|string[]):boolean {
    const super_admin = permsEnum.adminPerms;
    const roles = useUser().roles
    if (value && value instanceof Array && value.length > 0) {
        const roleFlag = value
        const hasRole = roles.some((role: string) => {
            return super_admin === role || roleFlag.includes(role)
        })

        if (!hasRole) {
            return false
        }
        return true
    } else {
        return false
    }
}
