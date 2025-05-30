import { Plugin } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import CompressPlugin from 'vite-plugin-compression'

//自动导入插件
export default (plugins: Plugin[], isBuild: boolean) => {
    plugins.push(
        AutoImport({
            // resolvers: [ElementPlusResolver()],
            //定义element-plus api按需加载
            imports: [
                // 'vue','vue-router','pinia',
                {
                // '@/store/piniaAutoImport': ['useStore'],
            }],
            //composables目录文件按需加载
            // dirs: ['src/composables'],
            dts: 'types/autoImport.d.ts',
        }),
        Components({
            resolvers: [
                //element-plus组件按需导入
                // ElementPlusResolver(),
                VueUseComponentsResolver(),
                //针对iconpark图标按需导入
                (componentName) => {
                    if (componentName.startsWith('IconPark')) {
                        return { name: componentName.slice(8), from: '@icon-park/vue-next' }
                    }
                },
            ],
            extensions: ['vue', 'tsx'],
            //按需加载的文件夹
            dirs: ['src/components'],
            //组件名称包含目录，防止同名组件冲突
            directoryAsNamespace: true,
            //指定类型声明文件，为true时在项目根目录创建
            dts: 'types/components.d.ts',
        }),
        CompressPlugin({
            verbose: true, // 默认即可
            disable: false, //开启压缩(不禁用)，默认即可
            deleteOriginFile: false, //删除源文件
            threshold: 10240, //压缩前最小文件大小
            algorithm: 'gzip', //压缩算法
            ext: '.gz' //文件类型
        })
    )
}
