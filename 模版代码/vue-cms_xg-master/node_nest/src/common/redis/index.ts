//*- coding = utf-8 -*-
//@Time : 2022-11-20 23:49
//@Author : 沉默小管
//@File : index.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import Redis from "ioredis/built/Redis";
import { redisConfig } from "@/utils/config";

let num:number = 0;
const redisIndex = [];//记录redis实例索引
const redisList:Redis[] = [];//用于存储redis实例

export class RedisInstance {

  private readonly cacheName:string;  //缓存名
  private readonly remarks:string; //缓存名的备注
  private readonly db:number;      //目标库
  private client:Redis;

  /**
   * @param cacheName   缓存名称
   * @param remarks     备注
   * @param db          库数字
   */
  constructor(cacheName:string="vueCms_xg",remarks:string="其他",db:number=1) {
    this.cacheName = cacheName
    this.remarks = remarks
    this.db = db
    this.client = this.initRedis(cacheName,db)
  }

  //初始化redis
  private initRedis(cacheName:string,db:number=0){
    const isExist = redisIndex.some(x=>x===db)
    if(!isExist){
      // console.log(`[Redis ${db}]来自 ${cacheName} 方法调用, Redis 实例化了 ${++num} 次 `);
      // redisList["a"] = 1
      redisList[db] = new Redis({...redisConfig,db})
      redisList[db].on('error', (err) => console.log('Redis cluster Error', err));
      redisList[db].on('connect', () => console.log('redis连接成功'));
      redisIndex.push(db)
    }else{
      // console.log(`[Redis ${db}]来自 ${cacheName} 方法调用`);
    }
    return redisList[db]

  }

  /**
   * @Description: 封装设置redis缓存的方法
   * @param key {String} key值
   * @param value {String} key的值
   * @param seconds {Number} 过期时间
   * @return: Promise<any>
   */
  public async set(key: string, value: any, seconds?: number): Promise<any> {
    value = JSON.stringify(value);
    if (!this.client) {
      this.client = await this.initRedis(this.cacheName,this.db)
    }
    if (!seconds) {
      await this.client.set(this.cacheName+":"+this.remarks+":"+key, value, (err:Error, data) => {
        // 为key 设定一个时长 单位为S
        this.client.expire(this.cacheName+":"+this.remarks+":"+key, 3600000*6);//6个小时过期时间
        if (err) {
          console.log(err);
        }
        return data //成功会返回ok
      });
    } else {
      await this.client.set(this.cacheName+":"+this.remarks+":"+key, value, 'EX', seconds);
    }
  }


  /**
   * @Description: 设置获取redis缓存中的值
   * @param key {String}
   */
  public async get(key: string): Promise<any> {
    if (!this.client) {
      this.client = await this.initRedis(this.cacheName,this.db)
    }

    let data = await this.client.get(this.cacheName+":"+this.remarks+":"+key);

    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }
  /**
   * @Description: 判断是否过期
   * @param key {String}
   */
  public async isExists(key: string): Promise<any> {
    if (!this.client) {
      this.client = await this.initRedis(this.cacheName,this.db)
    }

    let data = await this.client.exists(this.cacheName+":"+this.remarks+":"+key);
    if (data ==1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @Description: 根据key删除redis缓存数据
   * @param key {String}  key不能太过长，否则删除失效
   * @return:
   */
  public async del(key: string): Promise<any> {
    if (!this.client) {
      this.client = await this.initRedis(this.cacheName,this.db)
    }

    await this.client.del(key);
  }

  /**
   * @Description: 清空redis的缓存
   * @return:
   */
  public async clearRedisData(): Promise<any> {
    if (!this.client) {
      this.client = await this.initRedis(this.cacheName,this.db)
    }

    await this.client.flushall();
  }

  /**
   * 获取redis中的键
   * @param key
   */
  public keys(key:string){
    return this.client.keys(key);
  }


}
