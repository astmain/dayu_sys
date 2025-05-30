//*- coding = utf-8 -*-
//@Time : 2022-11-12 16:12
//@Author : 管茂良
//@File : config.js
//@web  : www.php-china.com
//@Software: WebStorm
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
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
export const handleMyConfig = ()=>{
    let mysqlConfig:any = {
        type: 'mysql',//数据库类型
        host: '127.0.0.1',//ip
        port: 3306,//端口号
        username: 'root',//账号
        password: 'admin123',//密码
        database: 'g_vuecms_xg',//数据库名
        synchronize: true,//是否自动将实体类同步到数据库
        retryDelay:500,//重试连接数据库间隙
        retryAttempts:2,//重试连接数据库的次数
        // entities: [__dirname+"/**/*.entity{.ts,.js}"],//实体文件
        autoLoadEntities:true,//如果为true，将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体
        cache:false,//要启用缓存
        logging:true,//开启日志
    }
    return mysqlConfig;
}

//redis配置
export const redisConfig = {
    port: 6379,
    host: '127.0.0.1',
    password: '123456',
    db: 0
}
export const uploadImgConfig = {
    imgBaseUrl:"./public/uploads/img",//图片上传路径
    artContentImgBaseUrl:"./public/uploads/artContentImg",//文章图片上传路径
}

//状态监控配置
export const statusMonitorConfig = {
    pageTitle: '',
    // 配置端口
    port: 3000,
    path: '/statusMonitor',
    ignoreStartsWith: '/health/alive',
    spans: [
        {
            interval: 1, // Every second
            retention: 60, // Keep 60 datapoints in memory
        },
        {
            interval: 5, // Every 5 seconds
            retention: 60,
        },
        {
            interval: 15, // Every 15 seconds
            retention: 60,
        },
    ],
    chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
    },
    healthChecks: [],
};

//swagger配置函数
export const handleBuildSwagger = (app)=>{
    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('vueCms')
        .setDescription('沉默小管')
        .setVersion('1.0')
        .addTag('vue')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('sysApi', app, document,{
        // 自定义样式
        customCssUrl: '/css/swagger/theme-muted.css',
    });
}

// qq邮箱配置
export const emailQQConfig = {
    host: "smtp.qq.com",//邮箱服务器  这里我用的QQ邮箱
    port: 465,//邮箱使用端口
    secure: true,//是否使用默认的465端口
    auth: {
        user: "", // 发送方邮箱地址
        pass: "" // smtp 验证码
    }
}
// 阿里邮箱配置
export const emailAliConfig = {
    host: "smtp.mxhichina.com",//邮箱服务器  这里我用的QQ邮箱
    port: 465,//邮箱使用端口
    secure: true,//是否使用默认的465端口
    auth: {
        user: "", // 发送方邮箱地址
        pass: "" // smtp 验证码
    }
}

// gitee 的认证配置
export const giteeOauthConfig = {
    cid: "",//gitee官网设置获取
    secret: "",
    redirectURL: '',//gitee官网配置进行填写
    authorizeUrl: 'https://gitee.com/oauth/authorize',
    getAccessTokenUrl: 'https://gitee.com/oauth/token?grant_type=authorization_code',
    giteeUserAPI: 'https://gitee.com/api/v5/user',
};
// qq 的认证配置
export const qqOauthConfig = {
    cid: "",//gitee官网设置获取
    secret: "",
    redirectURL: '',//gitee官网配置进行填写
    authorizeUrl: 'https://graph.qq.com/oauth2.0/authorize?response_type=code',
    getAccessTokenUrl: 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code',
    openId:"https://graph.qq.com/oauth2.0/me",
    qqUserAPI:"https://graph.qq.com/user/get_user_info"
};
