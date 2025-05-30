import {Injectable} from '@nestjs/common';
import {MsgService} from "@/modules/common/msg/msg.service";
import { handleDealOsTime, handleFilterObjectEmptyData } from "@/utils/utils";
import { osUtils } from "@/utils/osUtils";
import { SysCacheDelDto, SysCacheChildDto, SysCacheContentDto } from "@/modules/statusMonitor/dto";
import { RedisInstance } from "@/common/redis";

@Injectable()
export class StatusMonitorService {
    private redisObj;
    constructor(private readonly msgService:MsgService) {
      this.redisObj = new RedisInstance()
    }
    /**
     * 系统cpu和内存监控
     */
    async sysMonitor() {
      const os = require('os');
      // 查看当前 Node 进程内存使用情况
      const { rss, heapUsed, heapTotal } = process.memoryUsage();
      // 系统空闲内存
      const systemFree:any = (os.freemem()/( 1024 * 1024 )/1000).toFixed(1);
      // 系统总内存
      const systemTotal:any = (os.totalmem()/( 1024 * 1024 )/1000).toFixed(1);
      // 获取系统操作系统
      const platform = os.platform();
      // 操作系统内核
      const type = os.type();
      // 系统cpu
      const cpus = os.cpus();

      //系统开机时间
      const uptime = os.uptime();
      let sysOnTime = handleDealOsTime(uptime)

      //系统开机时间
      const hostname = os.hostname();

      //主目录
      const hdir = os.homedir();
      const cpuUsage = await (new osUtils()).getCPUUsage({ percentage: true });
      let data = {
        cpu:{
          cpuLength:cpus.length,//cpu核数
          cpuUsage,//CPU 利用率
          cpuModel:cpus[0]["model"],//CPU型号
        },
        memory:{//内存
          systemFree,//系统空闲内存
          systemTotal,//系统总内存
          sysUsePercent:((1 - systemFree / systemTotal)*100).toFixed(2),//系统内存占用率
        },
        sysInfo:{//系统信息
          sysOnTime,//开启时间
          hostname,
          hdir,
          type,//操作系统内核
          platform,//操作系统平台
        }
      }
        return this.msgService.success(data)
    }
    /**
     * 缓存列表
     */
    async sysCacheList() {
      let keyArr = await this.redisObj.keys("*")
      let arr = []
      let newArr = []
      let num = 1;
      for(let i in keyArr){
        let objSplit = keyArr[i].split(":");
        let objSplit1 = objSplit[0]
        let objSplit2 = objSplit[1]
        if(!arr.includes(objSplit1+":"+objSplit2)){
          arr.push(objSplit1+":"+objSplit2)
          newArr.push({
            id:num,
            cacheName:objSplit1,
            remarks:objSplit2,
            data:objSplit1+":"+objSplit2
          })
          num++;
        }
      }
      /**
       * 缓存名称 缓存键名 缓存内容
       */
        return this.msgService.success(newArr)
    }
    /**
     * 查看缓存下级
     */
    async sysCacheChild(sysCacheChildDto: SysCacheChildDto) {
      let {parentKeys} = sysCacheChildDto
      let keyArr = await this.redisObj.keys(parentKeys+":*")
      let arr = []
      let num = 1;
      for(let i in keyArr){
        let childData =keyArr[i].split(parentKeys)[1]
        arr.push({
          id:num,
          cacheKeysName:childData.substring(1,childData.length)
        })
        num++;
      }
        return this.msgService.success(arr)
    }
    /**
     * 系统缓存内容
     */
    async sysCacheContent(sysCacheContentDto: SysCacheContentDto) {
      let {keysName,parentKeys} = sysCacheContentDto
      let redisObj = new RedisInstance(parentKeys.split(":")[0],parentKeys.split(":")[1])
      let redisData:any = await redisObj.get(keysName)
      if(typeof redisData=="object"){
        redisData = JSON.stringify(redisData)
      }
      let data = {
        cacheName:parentKeys.split(":")[0],
        cacheKeys:keysName,
        cacheContent:redisData
      }
      return this.msgService.success(data)
    }
    /**
     * 删除缓存
     */
    async sysCacheDel(sysCacheDelDto: SysCacheDelDto) {
      let {step,cacheKeysName,cacheName} = sysCacheDelDto
      let redisObj = new RedisInstance(cacheName.split(":")[0],cacheName.split(":")[1])
      if(step=="first"){
          await redisObj.del(cacheKeysName+":*")
      }else{
        if(await redisObj.isExists(cacheKeysName)){
          await redisObj.del(cacheName+":"+cacheKeysName)
        }
      }
      return this.msgService.success()
    }

}
