import useSetting from "./modules/setting"
import useApp from "./modules/app"
import usePermission from "./modules/permission"
import useTagsView from "./modules/tagsView"
import useUser from "./modules/user"
import useDict from "./modules/dict"
import {createPinia} from "pinia";
// import piniaCache from "@/plugins/piniaCache";
// import config from "@/utils/config";

// const getters = {
//     sidebar: useAppStore().sidebar,
//     size: useAppStore().size,
//     device: useAppStore().device,
//     visitedViews: useTagsView().visitedViews,
//     cachedViews: useTagsView().cachedViews,
//     token: useUser().token,
//     avatar: useUser().avatar,
//     name: useUser().name,
//     roles: useUser().roles,
//     permissions: useUser().permissions,
//     permission_routes: usePermission().routes
// }
const store = createPinia()
//pinia持久化
// store.use(piniaCache({
//     key:config.StoreKey
// }))
export {
    store,
    useTagsView,
    useUser,
    usePermission,
    useSetting,
    useDict,
    useApp
}


