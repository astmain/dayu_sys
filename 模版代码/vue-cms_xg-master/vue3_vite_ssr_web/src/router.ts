import { createRouter } from 'vue-router'
// 模块~pages由vite-env.d.ts中的 /// <reference types="vite-plugin-pages/client" /> 引入定义
import routes from '~pages'

export default function (history: any) {
  return createRouter({
    history: history,
    routes,
  })
}
