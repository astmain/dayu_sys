import './style.css'
import App from './App.vue'

import { createSSRApp } from 'vue'

export default function() {
  if (import.meta.env.SSR) {
    // ... 仅在服务端执行的逻辑
  }

  const app = createSSRApp(App)

  return app
}
