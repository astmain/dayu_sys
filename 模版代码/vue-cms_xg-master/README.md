<div align=center>

![vite](https://img.shields.io/badge/3.0.7-vite-orange)
![typeScript](https://img.shields.io/badge/4.6.4-typeScript-lightgrey)
![vue](https://img.shields.io/badge/3.2.47-vue-brightgreen)

</div>
<div align=center>

![vite](https://img.shields.io/badge/5.3.1-ioredis-orange)
![typeScript](https://img.shields.io/badge/9.0.0-nestjs/cli-lightgrey)
![vue](https://img.shields.io/badge/0.2.2-typeorm-brightgreen)
![vue-router](https://img.shields.io/badge/6.1.3-@nestjs/swagger-blueviolet)

</div>
<div align=center>

![axios](https://img.shields.io/badge/0.27.2-axios-ff69b4)
![vue-router](https://img.shields.io/badge/4.1.5-vue%20router-blueviolet)
![pinia](https://img.shields.io/badge/2.0.33-pinia-yellow)
![element-plus](https://img.shields.io/badge/2.2.36-element--plus-409EFF)
![nprogress](https://img.shields.io/badge/0.2.0-nprogress-red)
![sass](https://img.shields.io/badge/1.54.9-sass-orange)
![sass](https://img.shields.io/badge/4.1.3-less-orange)

</div>

# ⚠项目技术问题集合
https://blog.csdn.net/qq_36977923/article/details/139337084


# 🎮在线体验
- 项目安装教程：[https://www.bilibili.com](https://www.bilibili.com/video/BV1JC4y1k7LP)
- 开发文档：[doc.vuecms.cn](https://doc.vuecms.cn/vueCms/intro.html)
- 后台地址：[vueCms.cn](https://www.vuecms.cn)

[![star](https://gitee.com/derekgo/vue-cms_xg/badge/star.svg?theme=dark)](https://gitee.com/derekgo/vue-cms_xg/stargazers)
[![fork](https://gitee.com/derekgo/vue-cms_xg/badge/fork.svg?theme=dark)](https://gitee.com/derekgo/vue-cms_xg/members)
[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)


# ⚡ 简介

一个开箱即用，前端基于 `vite 2` + `vue 3` + `typeScript` + `element Plus` + `pinia` + `vue-router 4` 的PC端项目模板。
后端由`nestjs`构建高效、可扩展的 Node.js 服务器端应用程序的开发框架。

# 🚀 开发

1. 安装

```
#全局安装yarn
npm install yarn -g

#进入项目根目录
yarn install
```

2. 运行

```
#前端运行项目 默认端口号为8081
yarn dev

#后端运行项目 默认端口号为3000
nest start --watch
```

3. 导入数据库
```
项目更目录中叫:g_vuecms_xg.sql这个文件
```

4. 修改后端配置文件config.ts文件，下方有详细步骤说明


5. 登录项目
```
超级管理员账号:test
超级管理员密码:gml1098155807
```

# 📦️ 环境打包

- 生产环境打包

```
yarn build
```

# 🔧 项目配置
- 后端配置(node_nest/src/utils/config.ts)
``` bash
#进入node_nest/src/utils/config.ts

//系统基础设置
export const sysBase = {
  host:"http://127.0.0.1",
  port:3000
}

//jwt配置
export const jwtKey = {
  secret: 'vueCms_xg',
  expireTime:"10h"
};
//跨域配置
export const corsConfig = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//mysql配置
export const mysqlConfig:any = {
  type: 'mysql',//数据库类型
  host: '你的服务器ip',//ip
  port: 3306,//端口号
  username: '链接mysql的账号',//账号
  password: '链接mysql的密码',//密码
  database: 'g_vuecms_xg',//数据库名
  synchronize: true,//是否自动将实体类同步到数据库
  retryDelay:500,//重试连接数据库间隙
  retryAttempts:10,//重试连接数据库的次数
  // entities: [__dirname+"/**/*.entity{.ts,.js}"],//实体文件
  autoLoadEntities:true,//如果为true，将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体
  cache:false,//要启用缓存
  logging:true,//开启日志
}

//redis配置
export const redisConfig = {
  port: 6379,
  host: '你的服务器ip',
  password: '你的redis链接密码',
  db: 0
}
export const uploadImgConfig = {
  imgBaseUrl:"./public/uploads/img",//图片上传路径
  artContentImgBaseUrl:"./public/uploads/artContentImg",//文章图片上传路径
}

```

# 📚 目录

```
└─ vue3_vite        //前端
  │─ src
    │─ App.vue      // 根容器
    │─ main.ts      // 前端入口文件
    ├─ assets       // 静态资源
    ├─ components   // 组件
    ├─ network      //项目api接口
    ├─ plugins      //项目第三方插件
    ├─ router       //路由
    ├─ store        //状态管理器
    ├─ router       // 路由
    ├─ utils        // 工具库
      ├──directive          //自定义指令 权限
      │  config.ts          //项目配置文件
      │  storage.ts         // 本地缓存
      │  systemRules.ts     // 系统规则
      │  utils.ts           // 公共工具函数
      └─ test.js            // 校验函数集合
    ├─ views // 视图
      │  
      └─ v1 // 版本v1
        ├─ article            // 文章管理
        ├─ common             // 公共页面   .
        ├─ home               // 首页   .
        ├─ layout             // 公共页面模板
        ├─ login              // 登陆
        ├─ pic                // 图片管理
        ├─ system             // 系统管理   .
        ├─ user               // 用户管理   .
        └─ redirect.vue       // 重定向   .          
  ├─ types              // ts类型定义
  ├─ vite               // vite项目配置
  ├─ .env.xxx           // 各环境的配置文件
  ├─ vite.config.ts     // 项目配置
  ├─ tsconfig.json      // ts配置
  └─ index.html         // 入口文件

└─ node_nest        //后端
  │─ src
    ├─ common        // 公共
      ├─ apiErr                 //api错误类
      ├─ enum                   //项目枚举
      ├─ filters                //过滤器
      ├─ interceptor            //拦截器
      ├─ middleware             //中间件
      ├─ redis                  //redis缓存类
      └─ validation             // 管道校验
    ├─ logs         // 日志
      ├─ accessRecords          //访问本地记录
      └─ operationBehavior      //操作本地记录
    ├─ modules      // 功能模块
      ├─ art                    //文章
      ├─ artColumn              //文章栏目
      ├─ artSort                //文章分类
      └─ ...
    ├─ tasks        // 定时任务
      ├─ tasks.module.ts        // 
      └─ tasks.service.ts       // 
    ├─ utils        // 工具库
      │  config.ts              //项目配置文件
      └─  utils.ts              // 公共工具函数
    ├─ app.controller.ts        // 全局控制层
    ├─ app.module.ts            // 全局模块
    ├─ app.service.ts           // 全局服务层
    └─ main.ts                  // 项目入口
  └─ tsconfig.json      // ts配置
```
# 🔨项目功能
- [x] 登录
- [x] 文章管理
  - [x] 文章列表
  - [x] 文章栏目
  - [x] 文章分类
- [x] 用户管理
  - [x] 用户列表
  - [x] 角色列表
- [x] 图片管理
  - [x] 图片分类
  - [x] 图片列表
- [ ] 系统监控
  - [ ] 缓存监控
  - [x] 在线用户
  - [ ] 监控服务器
- [ ] 系统管理
  - [x] 系统设置
  - [x] 字典列表
  - [x] 菜单列表
  - [x] 系统文档-(接口文档)
  - [x] 通知管理
    - [x] 消息通知
    - [x] 通知公告
  - [x] 日志管理
      - [x] 错误日志
      - [x] 登录日志
      - [x] 操作日志



# 💻系统截图
<table>
    <tr>
        <td valign="top"><img src="https://gitee.com/derekgo/vue-cms_xg/raw/v1.0/static/%E5%9B%BE%E7%89%87%E5%88%97%E8%A1%A8.jpg"/></td>
        <td valign="top"><img src="https://gitee.com/derekgo/vue-cms_xg/raw/v1.0/static/%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8.jpg"/></td>
        <td valign="top"><img src="https://gitee.com/derekgo/vue-cms_xg/raw/v1.0/static/%E6%96%87%E7%AB%A0%E7%BC%96%E8%BE%91.jpg"/></td>
        <td valign="top"><img src="https://gitee.com/derekgo/vue-cms_xg/raw/v1.0/static/%E7%99%BB%E5%BD%95.jpg"/></td>
    </tr>
    <tr>
        <td valign="top"><img src="https://gitee.com/derekgo/vue-cms_xg/raw/v1.0/static/%E7%99%BB%E5%BD%95%E6%97%A5%E5%BF%97.jpg"/></td>
        <td valign="top"><img src="https://gitee.com/derekgo/vue-cms_xg/raw/v1.0/static/%E9%A6%96%E9%A1%B5.jpg"/></td>
    </tr>
    <tr>
        <td valign="top"><img src="https://gitee.com/derekgo/vue-cms_xg/raw/v1.0/static/手机端文用户列表.jpg"/></td>
        <td valign="top"><img src="https://gitee.com/derekgo/vue-cms_xg/raw/v1.0/static/手机端文用户添加.jpg"/></td>
        <td valign="top"><img src="https://gitee.com/derekgo/vue-cms_xg/raw/v1.0/static/移动端设置页.jpg"/></td>
        <td valign="top"><img src="https://gitee.com/derekgo/vue-cms_xg/raw/v1.0/static/移动端首页.jpg"/></td>
    </tr>
    <tr>
        <td valign="top"><img src="https://gitee.com/derekgo/vue-cms_xg/raw/v1.0/static/移动端登录页.jpg"/></td>
    </tr>
</table>
<br><br>

# ⚠温馨提醒

1. 本项目仅适用于学习交流，并且`不提供无偿的`、 `不提供无偿的`、 `不提供无偿的` 维护修改服务（但可提issue）***
2. 本项目不在任何平台出售,如有发现请积极举报
3. 为了更好的体验，友情提示此项目是一个全栈项目，熟练掌握后你就比较牛掰了，认真刻苦的掌握它，累觉不爱ღ( ´･ᴗ･` )比心
4. 不要只是白嫖 ,如果帮到你了麻烦***点个Star***
5. 发现有问题？欢迎加入下方交流群一起探讨，或者直接提Issues


>✨  分享是一种美德，右上随手点个 🌟 Star <br/>
>📃 个人主页：[沉默小管](https://blog.csdn.net/qq_36977923)
>🔥 技术交流QQ群：837051545 <br/>
>👍 点赞，你的认可是我创作的动力！ <br/>
>✏ 评论，你的意见是我进步的财富！ <br/>
>如果有不懂可以留言，我看到了应该会回复
>如有错误，请多多指教
