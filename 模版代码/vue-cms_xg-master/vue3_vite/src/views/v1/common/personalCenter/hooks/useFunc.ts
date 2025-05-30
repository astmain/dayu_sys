//*- coding = utf-8 -*-
//@Time : 2023-04-13 23:05
//@Author : CSDN 沉默小管
//@File : useFunc.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm


import {formInit} from "@/views/common/personalCenter/cpns/baseInfo/config/formConfig";
import {useClass} from "@/views/common/personalCenter/cpns/baseInfo/hooks/useClass";
import {handleGetCurInstance} from "@/utils/utils";
import {requestUserInfoDetail} from "@/network/common/personalCenter";
import {resInterface} from "@/network";
import {defineAsyncComponent, onMounted, ref, shallowRef} from "vue"
import {useStore} from "@/store/piniaAutoImport";
import {TabsPaneContext} from "element-plus";
const BaseInfo = defineAsyncComponent(()=>import("../cpns/baseInfo/index.vue"))
const LoginLog = defineAsyncComponent(()=>import("../cpns/loginLog/index.vue"))
const OperationLog = defineAsyncComponent(()=>import("../cpns/operationLog/index.vue"))
const Notify = defineAsyncComponent(()=>import("../cpns/notify/index.vue"))

export const useFunc = ()=>{
    let settingStore = useStore("useSetting")
    let activeComponent = ref<any>("BaseInfo")
    let curComponent = shallowRef<any>(BaseInfo)
    let loading = ref(false)
    let formModel = ref({
        ...formInit
    })
    let userStore:any = useStore("useUser")
    let {handleRoleList,handleDict,dicts,roleOptions} = useClass()
    let {model,axios,dict} = handleGetCurInstance()
    const handleList = ()=>{
        let form:any = {
            uid:userStore.userInfo.id,
        }
        return requestUserInfoDetail(form).then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            formModel.value = {
                ...data,
                password:data.originalPwd,
                sex:data.sex+""
            }
            // formModel.value = data.data
            return true;
        }).catch((err: any)=>{
            console.log(err);
        })
    }
    //初始化页面数据
    const handleInit = async ()=>{
        await handleRoleList(model);
        await handleDict(dict);
        return true;
    }

    let componentArr = {
        "BaseInfo": BaseInfo,
        "LoginLog": LoginLog,
        "OperationLog": OperationLog,
        "Notify": Notify,
    }
    const handleClick = (tab: TabsPaneContext, event: Event) => {
        activeComponent.value = tab?.paneName
        curComponent.value = componentArr[tab?.paneName]
    }
    onMounted(()=>{
        loading.value = true;
        //这里出问题
        axios.all([handleList(),handleInit()]).then(axios.spread((res:boolean,res1:boolean)=>{
            if(res && res1){
                loading.value = false
            }else{
                loading.value = false;
            }
        }))
    })
    return {
        loading,formModel,dicts,roleOptions,settingStore,activeComponent,curComponent,handleClick
    }
}
