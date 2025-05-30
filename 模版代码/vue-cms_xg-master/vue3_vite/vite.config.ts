import { defineConfig,loadEnv } from 'vite';
import path, { join } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import config from "./src/utils/v1/config";
import setupPlugins from "./vite/plugins";
import externalGlobals from "rollup-plugin-external-globals";

let version = config.ItemVersion
console.log(config.ItemVersion);

let globals = externalGlobals({
    vue: 'Vue',
    "element-plus": "ElementPlus",
    'vue-router': 'VueRouter',
    axios: 'axios',
    'vue-i18n': 'VueI18n',
    pinia: 'Pinia',
    "vue-demi": "VueDemi",
    nprogress: 'NProgress',
    jquery: "jQuery",
    moment: 'moment',
    lodash: 'lodash',
    echarts: 'echarts',
    // 'md-editor-v3': 'MdEditor',
    screenfull: 'screenfull'
});

const cdn = {
    cssCdn: [
        'https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.3/index.min.css',
        'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-y/nprogress/0.2.0/nprogress.min.css',
        // 'https://cdn.jsdelivr.net/npm/md-editor-v3@2.11.0/lib/style.css',
    ],
    jsCdn: [
        'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-y/vue/3.2.31/vue.global.prod.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-demi/0.13.11/index.iife.min.js',
        'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-y/screenfull.js/5.2.0/screenfull.min.js',
        'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-y/pinia/2.0.11/pinia.iife.min.js',
        'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-y/jquery/3.6.0/jquery.min.js',
        'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-y/axios/0.26.0/axios.min.js',
        'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-y/moment.js/2.29.1/moment.min.js',
        'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-y/lodash.js/4.17.21/lodash.min.js',
        'https://cdn.bootcdn.net/ajax/libs/element-plus/2.3.3/index.full.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-i18n/9.2.2/vue-i18n.global.min.js',
        'https://cdn.bootcdn.net/ajax/libs/vue-router/4.1.5/vue-router.global.prod.min.js',
        // 'https://cdn.jsdelivr.net/npm/md-editor-v3@2.11.0/lib/md-editor-v3.umd.js',
        'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-y/nprogress/0.2.0/nprogress.min.js',
        'https://lib.baomitu.com/echarts/5.4.3/echarts.js'
    ]
}

const getEnvFn = (mode, target) => {
    return loadEnv(mode, process.cwd())[target]
}
import px2rem from 'postcss-px2rem'
const postcss = px2rem({
    remUnit: 16, //基准大小 baseSize，需要和rem.js中相同
});

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const isBuild = command == 'build'
    const VITE_HTTP: string = getEnvFn(mode,"VITE_HTTP"); // 获取url

    return {
        publicPath:"/",
        plugins: [...setupPlugins(isBuild),
            createHtmlPlugin({
                inject: {
                    data: {
                        title: getEnvFn(mode,"VITE_TITLE"),
                        // 注入cdn
                        cssCdn: getEnvFn(mode,"VITE_NODE_ENV") === 'dev' ? cdn.cssCdn : cdn.cssCdn,
                        jsCdn: getEnvFn(mode,"VITE_NODE_ENV") === 'dev' ? [] : cdn.jsCdn
                    },
                },
            })
        ],
        css:{
            loaderOptions: {
                postcss: {
                    plugins: [postcss],
                },
            },
        },
        //设置别名
        resolve: {
            alias: {
                "@/assets": join(__dirname, './src/assets/'+version+"/"),
                "@/components": join(__dirname, './src/components/'+version+"/"),
                "@/commonNetwork": join(__dirname, './src/network/'),
                "@/network": join(__dirname, './src/network/'+version+"/"),
                "@/router": join(__dirname, './src/router/'+version+"/"),
                "@/store": join(__dirname, './src/store/'+version+"/"),
                "@/plugins": join(__dirname, './src/plugins/'+version+"/"),
                "@/utils": join(__dirname, './src/utils/'+version+"/"),
                "@/views": join(__dirname, './src/views/'+version+"/"),
                "@/interface": join(__dirname, './src/interface/'+version+"/"),
                'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
            },
            extensions: [".vue",'.js', '.json', '.ts', '.tsx'],//使用别名省略的后缀名
        },
        build: {//去除console log.
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
            rollupOptions: {
                // 忽略打包
                external: ['vue-i18n','vue-router','NProgress','element-plus','axios','jquery','moment','echarts','lodash','screenfull','vue', 'Pinia','vue-demi'],
                plugins:[
                    globals
                ],
                // reportCompressedSize: false,
                // sourcemap: false,
                output: { //静态资源分类打包
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                    manualChunks(id) { //静态资源分拆打包
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                },
                minify: 'esbuild' // 混淆器，terser构建后文件体积更小
            }
        },
        server: {//代理
            host: "0.0.0.0",
            port:8081,
            hmr: true,
            proxy: {
                    "/dev-api/": {
                    target: VITE_HTTP,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/dev-api/, ""),
                },
            },
        },
    }

})
