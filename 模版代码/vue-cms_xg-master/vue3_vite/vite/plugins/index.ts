import { Plugin } from 'vite'
import autoImport from './autoImport'
import setupVue from './vue'
import visualizer from './visualizer'
import svgIcons from './svgIcons'

const plugins: Plugin[] = []

export default function setupPlugins(isBuild: boolean) {
    autoImport(plugins, isBuild )
    setupVue(plugins, isBuild )
    visualizer(plugins, isBuild )
    svgIcons(plugins, isBuild )

    return plugins
}
