import { createApp } from 'vue'
import App from '@src/layout/App.vue'
import router from '@src/router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router.router)
app.use(ElementPlus, { size: 'small' })
// app.mount('#app')

import { ElMessageBox } from 'element-plus'

window.ElMessageBox = ElMessageBox


import { defineAsyncComponent } from 'vue'
window.defineAsyncComponent = defineAsyncComponent

import "./css_toolbar1.css"

export default app