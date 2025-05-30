import {createApp} from "vue";
import router from "@/router/permission"
import directive from "@/utils/directive/index";
import plugin from '@/plugins/index'

//element-plus 主题颜色
// import './assets/v1/css/element-variables.scss'

import '@/assets/css/index.scss'
import '@/assets/css/base.less'

// element-ui增加的引入
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import 'virtual:svg-icons-register'

import App from './App.vue'
import {store} from "@/store/index";

async function main(){
    const app = createApp(App);
    app.use(store)
    app.use(router)
    // app.use(ElementPlus)
    plugin(app)
    directive(app)
    app.mount('#app')
}
void main()
