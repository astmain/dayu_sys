/*- coding = utf-8 -*-
@Time : 2023/8/10 14:34
@Author : 管茂良
@File : osUtils.ts
@web  : www.php-china.com
@Software: WebStorm
*/
const os = require('os');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class osUtils {
  public cpuUsageMSDefault;// CPU 利用率默认时间段
  constructor() {
    this.cpuUsageMSDefault = 1000;
  }

  /**
   * 获取某时间段 CPU 利用率
   * @param { Number } Options.ms [时间段，默认是 1000ms，即 1 秒钟]
   * @param { Boolean } Options.percentage [true（以百分比结果返回）|false]
   * @returns { Promise }
   */
  async getCPUUsage(options:any={}) {
    const that = this;
    let { cpuUsageMS, percentage } = options;
    cpuUsageMS = cpuUsageMS || that.cpuUsageMSDefault;
    const t1 = that.handleGetCPUInfo(); // t1 时间点 CPU 信息

    let res = await sleep(cpuUsageMS).then(()=>{
      const t2 = that.handleGetCPUInfo(); // t2 时间点 CPU 信息
      const idle = t2.idle - t1.idle;
      const total = t2.total - t1.total;
      let usage:any = 1 - idle / total;

      if (percentage) usage = (usage * 100.0).toFixed(2) + "%";

      return usage;
    });
    return res;
  }

  /**
   * 获取 CPU 信息
   * @returns { Object } CPU 信息
   * user <number> CPU 在用户模式下花费的毫秒数。
   * nice <number> CPU 在良好模式下花费的毫秒数。
   * sys <number> CPU 在系统模式下花费的毫秒数。
   * idle <number> CPU 在空闲模式下花费的毫秒数。
   * irq <number> CPU 在中断请求模式下花费的毫秒数。
   */
  handleGetCPUInfo() {
    const cpus = os.cpus();
    let user = 0, nice = 0, sys = 0, idle = 0, irq = 0, total = 0;

    for (let cpu in cpus) {
      const times = cpus[cpu].times;
      user += times.user;
      nice += times.nice;
      sys += times.sys;
      idle += times.idle;
      irq += times.irq;
    }

    total += user + nice + sys + idle + irq;

    return {
      user,
      sys,
      idle,
      total,
    }
  }

}

export {osUtils}
