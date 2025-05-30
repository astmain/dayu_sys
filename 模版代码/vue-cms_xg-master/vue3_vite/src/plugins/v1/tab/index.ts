/*- coding = utf-8 -*-
@Time : 2022/9/25 18:01
@Author : CSDN 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
import router from '@/router/index';
import {useStore} from "@/store/piniaAutoImport";

export default {
    // 刷新当前tab页签
    refreshPage(obj:any) {
        const useTagsViewStore:any = useStore("useTagsView")
        const { path, query, matched } = router.currentRoute.value;
        if (obj === undefined) {
            matched.forEach((m:any) => {
                if (m.components && m.components.default && m.components.default.name) {
                    if (!['layout', 'parentView'].includes(m.components.default.name)) {
                        obj = { name: m.components.default.name, path: path, query: query };
                    }
                }
            });
        }

        return useTagsViewStore.delCachedView(obj).then(() => {
            const { path, query } = obj
            router.replace({
                path: '/redirect' + path,
                query
            }).then(r => r)
        })
    },
    // 关闭当前tab页签，打开新页签
    closeOpenPage(obj:any) {
        const useTagsViewStore:any = useStore("useTagsView")
        useTagsViewStore.delView(router.currentRoute.value)
        if (obj !== undefined) {
            return router.push(obj);
        }
    },
    // 关闭指定tab页签
    closePage(obj:any) {
        const useTagsViewStore:any = useStore("useTagsView")
        if (obj === undefined) {
            return useTagsViewStore.delView(router.currentRoute.value).then(({ lastPath }) => {
                return router.push(lastPath || '/');
            });
        }
        return useTagsViewStore.delView(obj)
    },
    // 关闭所有tab页签
    closeAllPage() {
        const useTagsViewStore:any = useStore("useTagsView")
        return useTagsViewStore.delAllViews();
    },
    // 关闭左侧tab页签
    closeLeftPage(obj:any) {
        const useTagsViewStore:any = useStore("useTagsView")
        return useTagsViewStore.delLeftTags(obj || router.currentRoute.value);
    },
    // 关闭右侧tab页签
    closeRightPage(obj:any) {
        const useTagsViewStore:any = useStore("useTagsView")
        return useTagsViewStore.delRightTags(obj || router.currentRoute.value);
    },
    // 关闭其他tab页签
    closeOtherPage(obj:any) {
        const useTagsViewStore:any = useStore("useTagsView")
        return useTagsViewStore.delOthersViews(obj || router.currentRoute.value);
    },
    // 添加tab页签
    openPage(title:string, url:string) {
        const useTagsViewStore:any = useStore("useTagsView")
        let obj = { path: url, meta: { title: title } }
        useTagsViewStore.addView(obj)
        return router.push(url);
    },
    // 修改tab页签
    updatePage(obj:any) {
        const useTagsViewStore:any = useStore("useTagsView")
        return useTagsViewStore.updateVisitedView(obj);
    }
}
