import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import path from 'path'
import vitePluginCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitePluginCompression(),
    vue(),
    Pages({
      // 需要生成路由的文件的目录
      dirs: 'src/views',
      // 排除在外的目录，将所有 components 目录下的 .vue 文件排除
      exclude: ['**/components/*.vue']
    })],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
})
