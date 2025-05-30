import app from '@src/layout/app.js'
import api from '@src/api/api.js'

app.config.globalProperties['api'] = api

// 注册axios拦截器               功能:全局axios,错误响应,取消网络请求 todo
require('./config_axios_api')({name: 'axios_api', baseURL: 'http://127.0.0.1:10001', debug: false, timeout: 30000})


// 注册全局状态store
let BUS = require('./BUS.js')
require('./config_pinia')({app: app, name: BUS.name, state: BUS.state, persist: BUS.persist})

// 注册全局组件
require('./components/make_components.js')(app)


// 注册多语言配置


//插件
require('./plugins/VueSimpleContextMenu')(app)
require('./plugins/dom_open.js')(app)
require('./plugins/dom_open_data.js')(app)
require('./plugins/vue_open.js')(app)
require('./plugins/vue_dialog.js')(app)
require('./plugins/isok_delete_confirm.js')(app)
require('@src/api/api.js')


// 工具方法:构造菜单树
window.utils = require('@src/utils/index.js')


app.mount('#app')





