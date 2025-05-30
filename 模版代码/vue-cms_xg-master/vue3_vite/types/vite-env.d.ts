/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
//全局声明内部模块
declare module '*.css' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.sass' {
    const classes: { readonly [key: string]: string };
    export default classes;
}
declare module '*.less' {
    const classes: { readonly [key: string]: string };
    export default classes;
}
