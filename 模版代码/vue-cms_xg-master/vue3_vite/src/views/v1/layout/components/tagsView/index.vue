<template>
    <div id="tags-view-container" class="tags-view-container">
        <G_ScrollPane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
            <!--      循环数组下的meta数组-->
            <router-link
                    v-for="item in visitedViews"
                    ref="tag"
                    :key="item.path"
                    :class="isActive(item)?'active':''"
                    :to="{ path: item.path, query: item.query, fullPath: item.fullPath }"
                    tag="span"
                    class="tags-view-item"
                    :style="activeStyle(item)"
                    @click.middle.native="!isAffix(item)?closeSelectedTag(item):''"
                    @contextmenu.prevent.native="openMenu(item,$event)"
            >
                <!--        是否附上标签-->
                <template v-if="!isAffix(item)">
                    <!--          是否激活-->
                    <template v-if="isActive(item)">
                        <el-tag
                                class="mx-1"
                                closable
                                :disable-transitions="false"
                                @close.prevent.stop="closeSelectedTag(item)"
                        >
                            {{ item.title }}
                        </el-tag>
                    </template>
                    <template v-else>
                        <el-tag
                                class="mx-1"
                                closable
                                :disable-transitions="false"
                                @close.prevent.stop="closeSelectedTag(item)"
                                effect="plain"
                        >
                            {{ item.title }}
                        </el-tag>
                    </template>
                </template>
                <template v-else>
                    <template v-if="isActive(item)">
                        <el-tag
                                class="mx-1"
                                :disable-transitions="false"
                        >
                            {{ item.title }}
                        </el-tag>
                    </template>
                    <template v-else>
                        <el-tag
                                class="mx-1"
                                :disable-transitions="false"
                                effect="plain"
                        >
                            {{ item.title }}
                        </el-tag>
                    </template>
                </template>
            </router-link>
        </G_ScrollPane>
        <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
            <li @click="refreshSelectedTag(selectedTag)"><i class="el-icon-refresh-right"></i> 刷新页面</li>
            <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)"><i class="el-icon-close"></i> 关闭当前</li>
            <li @click="closeOthersTags"><i class="el-icon-circle-close"></i> 关闭其他</li>
            <li v-if="!isFirstView()" @click="closeLeftTags"><i class="el-icon-back"></i> 关闭左侧</li>
            <li v-if="!isLastView()" @click="closeRightTags"><i class="el-icon-right"></i> 关闭右侧</li>
            <li @click="closeAllTags(selectedTag)"><i class="el-icon-circle-close"></i> 全部关闭</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import path from 'path-browserify'
    import {handleGetCurInstance} from "@/utils/utils";
    import {computed, defineAsyncComponent, nextTick, onMounted, ref, watch} from "vue";
    import {useStore} from "@/store/piniaAutoImport";
    import {useRouter,useRoute} from "vue-router";
    const G_ScrollPane = defineAsyncComponent(()=>import("./scrollPane.vue"))
    let {globalProperties} = handleGetCurInstance();

    let tag = ref()
    let scrollPaneRef = ref<InstanceType<typeof G_ScrollPane>>()
    let visible = ref<boolean>(false)
    let top = ref<number>(0)
    let left = ref<number>(0)
    let selectedTag = ref<object>({})
    let affixTags = ref<Array<any>>([])

    const useSettingStore:any = useStore("useSetting")
    const usePermissionStore:any = useStore("usePermission")
    const useTagsViewStore:any = useStore("useTagsView")
    const route = useRoute()
    const router = useRouter()

    //watch监听动态拿到值的变化,从而做出反应
    watch(()=> visible.value,(newData:boolean,oldData:boolean)=>{
        if (newData) {
            document.body.addEventListener('click', closeMenu)
        } else {
            document.body.removeEventListener('click', closeMenu)
        }
    })

    watch(()=>router.currentRoute.value.path,(newData:string,oldData:string)=>{
        addTags()
        moveToCurrentTag()
    })



    const visitedViews = computed(()=>{
        return useTagsViewStore.visitedViews
    })
    const routes = computed(()=>{
        return usePermissionStore.routes
    })
    const theme = computed(()=>{
        return useSettingStore.themeColor.primary
    })
    const isActive = (route:{path:string})=>{
        return route.path === router.currentRoute.value.path
    }

    const activeStyle = (tag:any)=>{
        if (!isActive(tag)) return {};
        return {
            // "background-color": theme.value,
            "border-color": theme.value,
        };
    }
    //是否附上
    const isAffix = (tag:any)=>{
        return tag.meta && tag.meta.affix
    }
    const isFirstView = ()=>{
        try {
            return selectedTag.value.fullPath === visitedViews.value[1].fullPath || selectedTag.value.fullPath === '/'
        } catch (err) {
            return false
        }
    }
    const isLastView = ()=>{
        try {
            return selectedTag.value.fullPath === visitedViews.value[visitedViews.value.length - 1].fullPath
        } catch (err) {
            return false
        }
    }
    const filterAffixTags = (routes:any, basePath = '/')=>{
        let tags:any = []
        routes.forEach((route: { meta: { affix: any; }; path: string; name: any; children: any; }) => {
            if (route.meta && route.meta.affix) {
                const tagPath = path.resolve(basePath, route.path)
                tags.push({
                    fullPath: tagPath,
                    path: tagPath,
                    name: route.name,
                    meta: { ...route.meta }
                })
            }
            if (route.children) {
                const tempTags = filterAffixTags(route.children, route.path)
                if (tempTags.length >= 1) {
                    tags = [...tags, ...tempTags]
                }
            }
        })
        return tags
    }
    /**
     * 初始标签
     */
    const initTags = ()=>{
        affixTags.value = filterAffixTags(routes.value)
        for (const tag of affixTags.value) {
            // Must have tag name
            if (tag.name) {
                useTagsViewStore.addVisitedView(tag)
            }
        }
    }
    /**
     * 添加标签
     */
    const addTags = ()=>{
        const { name } = router.currentRoute.value
        if (name) {
            useTagsViewStore.addView(router.currentRoute.value)
        }
        return false
    }
    /**
     * 删除标签
     */
    const moveToCurrentTag = ()=>{
      nextTick(() => {
        for (const r of visitedViews.value) {
          if (r.path === route.path) {
            scrollPaneRef.value.moveToTarget(r);
            if (r.fullPath !== route.fullPath) {
              useTagsViewStore.updateVisitedView(route);
            }
          }
        }
      })
    }
    /**
     * 重新加载选中按钮
     * @param view
     */
    // const refreshSelectedTag = inject("reload");
    const refreshSelectedTag = (view:any)=>{
        return globalProperties.$tab.refreshPage(view)
    }
    /**
     * 关闭被选中的标签
     * @param view
     */
    const closeSelectedTag = (view:any)=>{
        globalProperties.$tab.closePage(view).then(({ visitedViews }) => {
            if (isActive(view)) {
                toLastView(visitedViews, view)
            }
        })
    }
    const closeRightTags = ()=>{
        globalProperties.$tab.closeRightPage(selectedTag.value).then((visitedViews: any[]) => {
            if (!visitedViews.find(i => i.fullPath === router.currentRoute.value.fullPath)) {
                toLastView(visitedViews)
            }
        })
    }
    const closeLeftTags = ()=>{
        globalProperties.$tab.closeLeftPage(selectedTag.value).then((visitedViews: any[]) => {
            if (!visitedViews.find(i => i.fullPath === router.currentRoute.value.fullPath)) {
                toLastView(visitedViews)
            }
        })
    }
    const closeOthersTags = ()=>{
        router.push(selectedTag.value).catch(()=>{});
        globalProperties.$tab.closeOtherPage(selectedTag.value).then(() => {
            moveToCurrentTag()
        })
    }
    const closeAllTags = (view:any)=>{
        globalProperties.$tab.closeAllPage().then(({ visitedViews }) => {
            if (affixTags.value.some((tag: { path: any; }) => tag.path === router.currentRoute.value.path)) {
                return
            }
            toLastView(visitedViews, view)
        })
    }
    const toLastView = (visitedViews:any, view?:string|any)=>{
        const latestView = visitedViews[0]
        // const latestView = visitedViews.slice(-1)[0]
        if (latestView) {
            router.push(latestView.fullPath)
        } else {
            // now the default is to redirect to the home page if there is no tags-view,
            // you can adjust it according to your needs.
            if (view.name === 'Dashboard') {
                // to reload home page
                router.replace({ path: '/redirect' + view.fullPath })
            } else {
                router.push('/')
            }
        }
    }
    const openMenu = (tag:any, e:any)=>{

        const menuMinWidth = 105
        const offsetLeft = document.querySelector("#tags-view-container").getBoundingClientRect().left // container margin left
        const offsetWidth = document.querySelector("#tags-view-container").offsetWidth // container width
        const maxLeft = offsetWidth - menuMinWidth // left boundary
        const curLeft = e.clientX - offsetLeft + 15 // 15: margin right

        if (curLeft > maxLeft) {
            left.value = maxLeft
        } else {
            left.value = curLeft
        }

        top = e.clientY
        visible.value = true
        selectedTag.value = tag
    }
    const closeMenu = ()=>{
        visible.value = false
    }
    const handleScroll = ()=>{
        closeMenu()
    }

    initTags()
    addTags()

</script>

<style lang="scss" scoped>
    .tags-view-container {
        height: 34px;
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #d8dce5;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
        .tags-view-wrapper {
            .tags-view-item {
                display: inline-block;
                position: relative;
                cursor: pointer;
                height: 26px;
                line-height: 26px;
                //border: 1px solid #d8dce5;
                color: #495060;
                background:#fff;

                //padding: 0 8px;
                font-size: 12px;
                margin-left: 5px;
                margin-top: 4px;
                &:first-of-type {
                    margin-left: 15px;
                }
                &:last-of-type {
                    margin-right: 15px;
                }
                &.active {
                    //background-color: #42b983;
                    //color: #fff;
                    //border-color: #42b983;
                    //&::before {
                    //  content: '';
                    //  background: #fff;
                    //  display: inline-block;
                    //  width: 8px;
                    //  height: 8px;
                    //  border-radius: 50%;
                    //  position: relative;
                    //  margin-right: 2px;
                    //}
                }
            }
        }
        .contextmenu {
            margin: 0;
            background: #fff;
            z-index: 3000;
            position: absolute;
            list-style-type: none;
            padding: 5px 0;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 400;
            color: #333;
            box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
            li {
                margin: 0;
                padding: 7px 16px;
                cursor: pointer;
                &:hover {
                    background: #eee;
                }
            }
        }
    }
</style>

<style lang="less">
    //reset element css of el-icon-close
    .tags-view-wrapper {
        .tags-view-item {
            .el-icon-close {
                width: 16px;
                height: 16px;
                vertical-align: 2px;
                border-radius: 50%;
                text-align: center;
                transition: all .3s cubic-bezier(.645, .045, .355, 1);
                transform-origin: 100% 50%;
                &:before {
                    transform: scale(.6);
                    display: inline-block;
                    vertical-align: -3px;
                }
                &:hover {
                    background-color: #b4bccc;
                    color: #fff;
                }
            }
        }
    }
</style>
