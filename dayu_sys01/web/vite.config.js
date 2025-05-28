import { fileURLToPath, URL } from 'node:url'

// vue
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'


//扩展插件
import vueJsx from "@vitejs/plugin-vue-jsx";
import requireTransform from "vite-plugin-require-transform";
import ReactivityTransform from "@vue-macros/reactivity-transform/vite"; // npm install @vue-macros/reactivity-transform -D

export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        vueJsx(),
        requireTransform({fileRegex: /(.vue|.js?|.jsx?|.tsx?)$/}),
        ReactivityTransform(), //child111_$ref_省略点value
    ],
    resolve: {
        alias: {
            '@src': fileURLToPath(new URL('./src', import.meta.url)),
        }
    },
    server: {
        open: true,
        host: "0.0.0.0",
        port: 10002,
        proxy: {
            // 以 /api 开头的请求将被代理到目标服务器
            '/api': {
                target: 'http://localhost:10001', // 后端服务器地址
                changeOrigin: true, // 允许跨域
                rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径，去掉 /api 前缀
            },
        },
    },
}) 