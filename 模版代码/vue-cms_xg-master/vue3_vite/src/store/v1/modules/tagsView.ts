/*- coding = utf-8 -*-
@Time : 2022/9/8 10:25
@Author : 沉默小管
@File : tagsView.css
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import storeName from "@/store/storeName";
import {defineStore} from "pinia";

interface tagsViewInterface {
    visitedViews:Array<any>,
    cachedViews:Array<any>,
}
// 视图状态管理
const useTagsViewStore = defineStore(storeName.tagsView,{
    state:():tagsViewInterface=>({
        visitedViews: [],
        cachedViews: []
    }),
    getters:{

    },
    actions:{
        addView(view: { path?: any; meta: { title: any; } | { noCache: any; }; name?: any; }){
            this.addVisitedView(view)
            this.addCachedView(view)
        },
        addVisitedView(view: { path?: any; meta: { title: any } | { noCache: any }; name?: any }){
            if (this.visitedViews.some((v:any) => v.path === view.path)) return
            this.visitedViews.push(
                // @ts-ignore
                Object.assign({}, view, {
                    // @ts-ignore
                    title: view.meta?.title || 'no-name'
                })
            )
        },
        addCachedView(view: any){
            if (this.cachedViews.includes(view.name)) return
            if (!view.meta?.noCache) {
                this.cachedViews.push(view.name)
            }
        },
        delView(view: { path?: any; name?: any; }){
            return new Promise(resolve => {
                this.delVisitedView(view)
                this.delCachedView(view)
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews]
                })
            })
        },
        delVisitedView(view: { path?: any; name?: any }){
            return new Promise(resolve => {
                for (const [i, v] of this.visitedViews.entries()) {
                    // @ts-ignore
                    if (v.path === view.path) {
                        this.visitedViews.splice(i, 1)
                        break
                    }
                }
                resolve([...this.visitedViews])
            })
        },
        delCachedView(view: { path?: any; name?: any }){
            return new Promise(resolve => {
                // @ts-ignore
                const index = this.cachedViews.indexOf(view.name)
                index > -1 && this.cachedViews.splice(index, 1)
                resolve([...this.cachedViews])
            })
        },
        delOthersViews(view: { path?: any; name?: any; }){
            return new Promise(resolve => {
                this.delOthersVisitedViews(view)
                this.delOthersCachedViews(view)
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews]
                })
            })
        },
        delOthersVisitedViews(view: { path?: any; name?: any }){
            return new Promise(resolve => {
                this.visitedViews = this.visitedViews.filter((v:any) => {
                    return v.meta.affix || v.path === view.path
                })
                resolve([...this.visitedViews])
            })
        },
        delOthersCachedViews(view: { path?: any; name?: any }){
            return new Promise(resolve => {
                // @ts-ignore
                const index = this.cachedViews.indexOf(view?.name)
                if (index > -1) {
                    this.cachedViews = this.cachedViews.slice(index, index + 1)
                } else {
                    this.cachedViews = []
                }
                resolve([...this.cachedViews])
            })
        },
        delAllViews(){
            return new Promise(resolve => {
                this.visitedViews = []
                this.cachedViews = []
                this.delAllVisitedViews()
                this.delAllCachedViews()
                // dispatch('delAllVisitedViews', view)
                // dispatch('delAllCachedViews', view)
                resolve({
                    visitedViews: [...this.visitedViews],
                    cachedViews: [...this.cachedViews]
                })
            })
        },
        delAllVisitedViews(){
            return new Promise(resolve => {
                // keep affix tags
                // @ts-ignore
                const affixTags = this.visitedViews.filter(tag => tag?.meta?.affix)
                this.visitedViews = affixTags
                resolve([...this.visitedViews])
            })
        },
        delAllCachedViews(){
            return new Promise(resolve => {
                this.cachedViews = []
                resolve([...this.cachedViews])
            })
        },
        updateVisitedView(view: { path: any; }){
            for (let v of this.visitedViews) {
                // @ts-ignore
                if (v.path === view.path) {
                    v = Object.assign(v, view)
                    break
                }
            }
        },
        delRightTags(view:any){
            return new Promise(resolve => {
                const index = this.visitedViews.findIndex((v:any) => v.path === view.path)
                if (index === -1) {
                    return
                }
                this.visitedViews = this.visitedViews.filter((item:any, idx:any) => {
                    if (idx <= index || (item.meta && item.meta.affix)) {
                        return true
                    }
                    // @ts-ignore
                    const i = this.cachedViews.indexOf(item.name)
                    if (i > -1) {
                        this.cachedViews.splice(i, 1)
                    }
                    return false
                })
                resolve([...this.visitedViews])
            })
        },
        delLeftTags(view:any){
            return new Promise(resolve => {
                const index = this.visitedViews.findIndex((v:any) => v.path === view.path)
                if (index === -1) {
                    return
                }
                this.visitedViews = this.visitedViews.filter((item:any, idx) => {
                    if (idx >= index || (item.meta && item.meta.affix)) {
                        return true
                    }
                    // @ts-ignore
                    const i = this.cachedViews.indexOf(item?.name)
                    if (i > -1) {
                        this.cachedViews.splice(i, 1)
                    }
                    return false
                })
                resolve([...this.visitedViews])
            })
        }
    }
})

export default useTagsViewStore;