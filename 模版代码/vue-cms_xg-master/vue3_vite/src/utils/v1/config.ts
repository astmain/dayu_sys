//*- coding = utf-8 -*-
//@Time : 2021-12-23 1:48
//@Author : 沉默小管
//@File : utils.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

//配置文件
const baseInfo = {
    //基础域名
    BaseURL:"/dev-api/",
    BaseURLStorage: "/dev-api/storage/",
    ImgURLStorage: "/dev-api/static/img/",
    VideoURLStorage: "/dev-api/static/video/",
    BackUrl:"/dev-api/",
    HomeBaseURL:"/dev-api/",
    //项目版本
    ItemVersion:"v1",

    // Socket链接 暂不做配置
    WSS_SERVER_URL:'',

    // 以下配置非开发者，无需修改
    // Socket调试模式
    SERVER_DEBUG:true,
    // 心跳间隔
    PINGINTERVAL:3000,
    // 回话密钥名称
    TOKENNAME: 'Authori-zation',
    //用户信息缓存名称
    // CACHE_USERINFO:'USERINFO',
    //token缓存名称
    CACHE_TOKEN:'TOKEN',
    //token过期事件
    CACHE_EXPIRES_TIME:'EXPIRES_TIME',
    //模板缓存
    CACHE_SUBSCRIBE_MESSAGE:'SUBSCRIBE_MESSAGE',
    //用户信息缓存名称
    CACHE_USERINFO: 'USERINFO',
    //缓存经度
    CACHE_LONGITUDE: 'LONGITUDE',
    //缓存纬度
    CACHE_LATITUDE: 'LATITUDE',
    //主题颜色
    PrimaryColor: '#cc7832',

    //项目语言
    Language:"zh",

    //项目大小
    SysSize:"small",

    Theme: '#FFFFFF',
    /**
     * 侧边栏主题 深色主题theme-dark，浅色主题theme-light
     */
    SideTheme: 'theme-dark',
    /**
     * 是否系统布局配置
     */
    ShowSettings: false,
    /**
     * 是否显示顶部标题
     */
    TopTitle: true,
    /**
     * 是否显示 tagsView
     */
    TagsView: true,
    /**
     * 是否固定头部
     */
    FixedHeader: true,
    /**
     * 是否显示logo
     */
    SidebarLogo: true,
    /**
     * 是否显示动态标题
     * 浏览器那个小标题
     */
    DynamicTitle: true,
    /**
     * @types {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    ErrorLog: 'production',

    StoreKey:"derek",

    /**
     * 响应式手机宽度
     */
    PhoneWidth:700,

    //项目地址
    ItemUrl:"https://gitee.com/derekgo/vue-cms_xg",

  };

  export default baseInfo
