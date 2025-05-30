import {
  OnGatewayConnection, OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import os from "os";
import { handleDealOsTime } from "@/utils/utils";
import { osUtils } from "@/utils/osUtils";

@WebSocketGateway(9876,
    {
      path: '/socket',
      allowEIO3: true,
      cors: {
        origin: /.*/,
        credentials: true
      }
    })
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() private ws:Server;//socket实例

  private allConnectNum = 0 //全部在线人数

  private users:any = {}    //人数信息

  /**
   * 链接成功
   */
  handleConnection(client: Socket) {
    this.allConnectNum += 1
    console.log("链接成功",this.allConnectNum);
    this.users[client.id] = `user-${this.allConnectNum}`
    this.ws.emit('enter', { name: this.users[client.id], allConnectNum: this.allConnectNum });
    this.ws.emit('enterName', this.users[client.id]);
  }

  /**
   * 断开链接
   */
  handleDisconnect(client: Socket) {
    console.log("断开链接");
    this.allConnectNum--;
    this.ws.emit('leave', { name: this.users[client.id], allConnectNum: this.allConnectNum  });
  }

  //发送通知
  @SubscribeMessage('message')
  handleMessage(client: Socket, data: any) {
    //向除自己以外的人广播
    this.ws.emit(data.eventNames?data.eventNames:'message',data);
  }

  //系统cpu和内存监控
  @SubscribeMessage('sysMonitor')
  async handleSysMonitor(client: Socket, data: any) {
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
    console.log("\n");
    const cpuUsage = await (new osUtils()).getCPUUsage({ percentage: true });
    let res = {
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
    this.ws.emit(data.eventNames?data.eventNames:'sysMonitor',res);
  }


  /**
   * 监听修改名称
   */
  @SubscribeMessage('changeName')
  handleChangeName(client: Socket, data: any): void {
    this.users[client.id] = data
    this.ws.emit('name', this.users[client.id]);
  }

  afterInit(server: any): any {
    console.log('初始化之后');
  }
}
