/*- coding = utf-8 -*-
@Time : 2023/4/17 15:09
@Author : 沉默小管
@File : index.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
// 公共枚举文件

//登陆状态枚举
enum loginStatusEnum{
    success=1,
    fail=2,
}

//操作类型枚举
enum operationTypeEnum{
    add = 1,//添加
    delete = 2,//删除
    search = 3,//查询
    edit = 4,//修改
    other = 5,//其他
    auth = 6,//授权
    export = 7,//导出
    import = 8,//导入
    forcedRetreat = 9,//强退
    generating = 10,//生成代码
    clearData = 11,//清空数据
    otherLogin = 12,//其他登录
}
//性别枚举
enum sexEnum{
    man = 1,//男
    female = 2,//女
    unknown = 3,//未知
}
//状态枚举
enum statusEnum{
    start = 1,//启用
    stop = 2,//停用
}
//通告状态枚举
enum notifyStatusEnum{
    read = 1,//启用
    unread = 2,//停用
}
//状态类型枚举
enum menuTypeEnum{
    directory = 1,//目录
    menu = 2,//菜单
    button = 3,//按钮
}
//其他通用状态枚举
enum otherStatusEnum{
    yes = 1,//是
    no = 2,//不
}

//账号多地登陆状态枚举
enum multipleLoginAccountsStatusEnum{
    open = 1,//开启
    close = 2,//关闭
}
//账号登录状态
enum userLoginStatusEnum{
    Online = 1,//开启
    Offline = 2,//关闭
}
//用户来源
enum userSourcesEnum{
    juejin = 'juejin.cn',//掘金
    zhihu = 'zhihu.com',//知乎
    bilibili = 'bilibili.com',//b站来源
    baidu = 'baidu.com',//百度
    google = 'google.com',//google
    bing = 'bing.com',//google
    so = 'so.com',//360搜索
    yandex = 'yandex.com',//yandex搜索
    other = 'other',//其他来源
}

//redis缓存名
enum redisEnum{
    userInfo = "用户信息",
    rateLimitGuard = "速率限制保护",
    qqLogin = "qq第三方授权登录",
    giteeLogin = "gitee第三方授权登录",
    menu = "路由信息",
    email = "邮箱",
    textMsg = "短信",
}

//公共枚举
enum commonEnum{
  itemUrl="https://gitee.com/derekgo/vue-cms_xg"
}

//用户类型枚举
enum userTypeEnum{
    testType = 1,//测试类型
    formalType = 2,//正常类型
}
//权限枚举
enum permsEnum{
    adminPerms = "admin",
    testPerms = "test",
}
//显示枚举
enum visibleEnum{
    show = 1,
    hide = 2,
}
//系统配置
enum sysConfigEnum {
  baseSetting = "BASE_SETTING",
  qqEmail = "QQ_EMAIL",
  aliEmail = "ALI_EMAIL",
  aliTextMsg = "ALI_TEXT_MSG",
  txTextMsg = "TX_TEXT_MSG",
  localFile = "LOCAL_FILE",
  qiNiuYunFile = "QI_NIU_YUN_FILE",
  giteeLoginConfig = "GITEE_LOGIN_CONFIG",
  qqLoginConfig = "QQ_LOGIN_CONFIG",
}
//邮箱
enum emailEnum {
  qqEmail = 1,
  aliEmail = 2,
  close = 3,
}
//短信
enum textMsgEnum {
  aliTextMsg = 1,
  txTextMsg = 2,
  close = 3,
}
//文件引擎
enum fileEngineEnum {
  localFile = 1,
  qiNiuYunFile = 2,
  close = 3,
}

export {visibleEnum,permsEnum,userTypeEnum,commonEnum,redisEnum,userSourcesEnum,userLoginStatusEnum,
    multipleLoginAccountsStatusEnum,notifyStatusEnum,otherStatusEnum,loginStatusEnum,menuTypeEnum,
    statusEnum,operationTypeEnum,sexEnum,sysConfigEnum,emailEnum,textMsgEnum,fileEngineEnum}
