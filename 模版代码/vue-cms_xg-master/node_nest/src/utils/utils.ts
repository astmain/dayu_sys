//*- coding = utf-8 -*-
//@Time : 2022-11-12 23:53
//@Author : 沉默小管
//@File : utils.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import fs, {createWriteStream} from "fs";
import path, {join} from "path";
import {createParamDecorator, ExecutionContext} from "@nestjs/common";

/**
 * md5加密
 */
export function securityMd5(val:string){
  let jsMd5 = require('js-md5');
  return jsMd5(val).toString()
}

/**
 * 记录访问路径
 * @param type   记录类型
 * @param data   详细内容
 * 1 访问日志
 * 2 操作行为日志
 */
type typeType = 1 | 2
type statusType = "success" | "error"
interface logsDataInterface{
  url?:string,//访问路径
  clientIp?:string,//访问ip
  detail?:string,//记录详情
  status?:statusType,//记录状态
}
export function handleRecordLogs(type:typeType = 1,data:logsDataInterface){
  let fs = require("fs")
  let path = require("path");

  let publicUrl = "../../src/logs"
  let logsUrl;//日志路径
  let ipArr;
  let ip;
  let url;
  let clientIp;
  let operationDetails;
  let operationDetailsStatus:statusType;
  if(type == 1){
    //访问日志
    url = data.url;
    clientIp = data.clientIp;
    logsUrl = publicUrl+"/accessRecords"
    ipArr = clientIp.split(':')
    ip = ipArr[ipArr.length - 1]
  }else if(type == 2){
    //操作行为日志
    logsUrl = publicUrl+"/operationBehavior"
    operationDetails = data.detail;
    operationDetailsStatus = data.status;
  }
  try {

    let date = new Date();
    let curTime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate())
    let curTimeDetail = date.toLocaleString()

    logsUrl = path.join(__dirname, logsUrl)
    //判断文件是否存在
    if(!fs.existsSync(logsUrl)){
      //同步创建文件路径
      // fs.mkdirSync(logsUrl+"\\","0777")
      handleMakeDirsSync(logsUrl)
    }
    let txt;
    if(ip){
      txt = `时间:${curTimeDetail} ip:${ip} 访问路径:${url}`
    }else{
      txt = `时间:${curTimeDetail} ${operationDetailsStatus}:${operationDetails}`
    }
    fs.appendFileSync(logsUrl+"/"+curTime+".txt",`\r\n${txt}`)
  }catch (e) {
    console.log("记录访问路径,报错信息：",e);
  }
}

// 递归创建目录 同步方法
function handleMakeDirsSync(dirname) {
  let fs = require("fs")
  let path = require("path")
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (handleMakeDirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

/**
 * 时间戳
 */
export function handleCurTime(){
  return Date.parse(new Date() + '')
}

/**
 * 获取url中的参数
 * @param urlString
 * @param paramName
 */
export function handleGetUrlParams(urlString:string,paramName:string) {
  if(urlString.indexOf("http://")<0 || urlString.indexOf("https://")<0){
    urlString = "http://locolhost/"+urlString
  }
  const url = new URL(urlString);
  return url.searchParams.get(paramName);
}

//typeorm开启mysql事务
// export async function handleTypeormTransaction():Promise<QueryRunner>{
//   return new Promise(async (resolve)=>{
//     console.log("链接是否开启:",getConnection());
//       const queryRunner = getConnection().createQueryRunner();     //获取连接并创建新的queryRunner
//       await queryRunner.connect();                                 //使用我们的新queryRunner建立真正的数据库连
//       await queryRunner.startTransaction();                        //开始事务
//       resolve(queryRunner)
//   })
// }

//文件流写入保存
export function handleWriteStream(file,fileUrl?:string){
  let fileName = "img"+Date.now()+Math.random()*100+file.originalname;
  //将图片放到文件夹
  let writeStream = createWriteStream(join(__dirname,fileUrl?fileUrl:"../../public/uploads",fileName))
  writeStream.write(file.buffer)
  return true;
}
//删除单个文件
export function handleRemoveSingleFile(imgRes:string,imgDetail="文件"){
  let fs = require("fs")
  fs.exists(imgRes,function (exist) {
      if(exist){
        fs.unlink(imgRes, function(err) {
          if (err) {
            handleRecordLogs(2,{detail:`删除${imgDetail}异常`,status:"error"})
          }
        });
      }else{
        handleRecordLogs(2,{detail:`原始${imgDetail}不存在`,status:"error"})
      }
    })
}


//过滤对象中空值
export function handleFilterObjectEmptyData(formData:object) {
  function handleIsEmpty(obj) {
    if (typeof obj === 'undefined' || obj === null || obj === '') {
      return true;
    } else {
      return false;
    }
  }
  /* 删除空值 */
  Object.keys(formData).forEach(item=>{
    if(handleIsEmpty(formData[item])) {
      delete formData[item];
    }
  })
  return formData;
}

//过滤，防止sql注入
export function handleReplaceSpecialChar(data:string){
  let regex = "/\ |\/|\~|\!|\@|\#|\\$|\%|\^|\&|\*|\(|\)|\_|\+|\{|\}|\:|\<|\>|\?|\[|\]|\,|\.|\/|\;|\'|\`|\-|\=|\\\|\|/";
  return data.replace(regex,"");
}

//过滤邮箱，防止sql注入
export function handleReplaceEmailSpecialChar(data:string){
  let regex = "/\ |\/|\~|\!|\#|\\$|\%|\^|\&|\*|\(|\)|\_|\+|\{|\}|\:|\<|\>|\?|\[|\]|\,|\/|\;|\'|\`|\-|\=|\\\|\|/";
  return data.replace(regex,"");
}

//处理ip获取ipv4
export function handleDealIpv6ToIpv4(ip:string) {
  if(!ip)return;
  if(ip?.indexOf("::ffff:") !== -1){
    ip = ip.substring(7)
  }
  return ip
}
import * as requestIp from "request-ip";
//自定义参数装饰器
//获取客户端ip
export const IpAddress = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const req = ctx.switchToHttp().getRequest()
      if (req.clientIp)
        return req.clientIp;
      return requestIp.getClientIp(req);
    })


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

// 验证该次请求是否为白名单内的路由
export function handleHasUrl (urlList: string[], url: string): boolean {
  let flag = false;
  if (urlList.indexOf(url) !== -1) {
    flag = true;
  }
  return flag;
}

export function handleDealOsTime (uptime:number) {
  let ut_sec = uptime;
  let ut_min = ut_sec/60;
  let ut_hour = ut_min/60;

  ut_sec = Math.floor(ut_sec);
  ut_min = Math.floor(ut_min);
  ut_hour = Math.floor(ut_hour);

  ut_hour = ut_hour%60;
  ut_min = ut_min%60;
  ut_sec = ut_sec%60;
  return [ut_hour,ut_min,ut_sec].join(':');
}

type sortType = "desc" | "asc"
//数组中对象某个数值进行排名
export function handleSort(field,type?:sortType) {
  if(!type){
    type = "desc"
  }
  //根据传过来的字段进行排序,y-x 得分从高到低，x-y 从低到高
  if(type=="desc"){
    return (x, y) => {
      return y[field] - x[field]
    }
  }else{
    return (x, y) => {
      return x[field] -y[field]
    }
  }

}

// 随机生成验证码
export const handleGetCode = (n) => {
  let all = "azxcvbnmsdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP0123456789";
  let result = "";
  for (let i = 0; i < n; i++) {
    let index = Math.floor(Math.random() * 62);
    result += all.charAt(index);

  }
  return result;
};
//截取token
export const handleInterceptToken = (token:string) => {
  return token.substring(-15,-1)
}
