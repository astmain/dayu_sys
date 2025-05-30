<template>
    <div :class="!isOpen?'':'childItem'" v-if="!item.hidden">
      <!--没下级-->
      <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
        <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
          <el-menu-item :index="resolvePath(onlyOneChild.path)">
              <G_Item :icon="onlyOneChild.meta && onlyOneChild.meta.icon" :title="onlyOneChild.meta.title" :lev="lev" :sidebarStatus="sidebarStatusComputed" :isChild="false" />
          </el-menu-item>
        </AppLink>
      </template>
      <!--有下级-->
      <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)">
        <template #title>
          <G_Item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" :lev="lev" :sidebarStatus="sidebarStatusComputed" :isChild="true" />
        </template>
        <template v-for="(child,index) in item.children" :key="index">
          <template v-if="!child.hidden">
            <G_SidebarItem
                :isNest="true"
                :item="child"
                :basePath="resolvePath(child.path)"
                :lev="lev+1"
                class="nest-menu"
            ></G_SidebarItem>
          </template>
        </template>

      </el-sub-menu>
    </div>
</template>

<script setup lang="ts">
    import {handleDealNormalPath} from "@/utils/utils";
    const G_SidebarItem = defineAsyncComponent(()=>import("./sidebarItem.vue"))
    import { isExternal } from '@/utils/validate'
    import {computed, defineAsyncComponent, onMounted, ref} from "vue";
    import {useStore} from "@/store/piniaAutoImport";
    const G_Item = defineAsyncComponent(()=>import('./item.vue'))
    const AppLink = defineAsyncComponent(()=>import('./link.vue'))

    const appStore:any = useStore("useApp")
    // const appStore:any = useStore("useApp")
    let onlyOneChild = ref(null)
    let subMenu = ref(null)


    interface propsInterface{
        item?:any,
        buttonTop?:number,
        lev?:number,
        basePath?:string,
        isOpen?:boolean,
        isNest?:boolean,
    }
    let {
        item={},
        buttonTop=0,
        lev,
        basePath="",
        isOpen=false,
        isNest=false
    } = defineProps<propsInterface>()
    onMounted(()=>{
        fixBugIniOS()
    })

    const sidebarStatusComputed = computed(()=>{
      return !appStore.sidebar.opened
    })

    const hasOneShowingChild = (children = [], parent: any)=> {
        if (!children) {
            children = [];
        }
        // if(children?.length==1 && children[0]["hidden"]==true){
        //   let showingChildren = children.filter((item:any) => {
        //     if (item.hidden) {
        //       return false
        //     } else {
        //       onlyOneChild.value = item
        //       return true
        //     }
        //   })
        //   //当只有一个路由时，默认情况下会显示子路由
        //   if (showingChildren.length === 1) {
        //     return true
        //   }
        //   //如果没有显示子路由，就显示父路由
        //   if (showingChildren.length === 0) {
        //     onlyOneChild.value = { ... parent, path: '', noShowingChildren: true }
        //     return true
        //   }
        // }
      let showingChildren = children.filter((item:any) => {
            if (item.hidden) {
                return false
            } else {
                onlyOneChild.value = item
                return true
            }
        })
        //当只有一个路由时，默认情况下会显示子路由
        if (showingChildren.length === 1) {
            return true
        }

        //如果没有显示子路由，就显示父路由
        if (showingChildren.length === 0) {
            onlyOneChild.value = { ... parent, path: '', noShowingChildren: true }
            return true
        }

        return false
    }
    const resolvePath = (routePath: string, routeQuery?: string)=> {
      if (isExternal(routePath)) {
            return routePath
        }
      if (isExternal(basePath)) {
            return basePath
        }
        if (routeQuery) {
            let query = JSON.parse(routeQuery);
            return { path: handleDealNormalPath(basePath + "/" + routePath), query: query }
        }
      return handleDealNormalPath(basePath + "/" + routePath)
    }

    const fixBugIniOS = () => {
        const $subMenu = subMenu.value
        if ($subMenu) {
            const handleMouseleave = $subMenu.handleMouseleave
            $subMenu.handleMouseleave = (e: any) => {
                if (appStore.device === 'mobile') {
                    return
                }
                handleMouseleave(e)
            }
        }
    }
</script>

<style scoped lang="less">
    .childItem{
        :deep(.el-sub-menu__icon-arrow){
            display: none;
        }
        :deep(.title){
            display: none;
        }
    }
</style>
