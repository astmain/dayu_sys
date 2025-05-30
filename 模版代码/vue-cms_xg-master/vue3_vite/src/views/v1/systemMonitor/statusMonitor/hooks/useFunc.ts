/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/


import {inject, onBeforeUnmount, onMounted, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
import {handleGetCurInstance} from "@/utils/utils";
import {
    requestSysCacheChild,
    requestSysCacheContent,
    requestSysCacheDel,
    requestSysCacheList
} from "@/network/systemMonitor/cacheMonitor";
import {resInterface} from "@/network";
import {tableCacheConfig, tableKeysNameConfig} from "@/views/systemMonitor/statusMonitor/config/tableConfig";
import {socketEnum} from "@/utils/enum";

export const useFunc = () =>{
    let loading = ref<boolean>(true)
    let settingStore = useStore("useSetting")
    let {axios,model,i18n} = handleGetCurInstance()
    let sysInfo = ref({
        cpu:{},
        memory:{},
        sysInfo:{}
    })
    //点击当前缓存数据
    let curClickCacheData = ref({
        parentKeys:"",
        keysName:"",
    })
    let cacheData = ref({
        cacheName:"",//缓存名称
        cacheKeys:"",//缓存键名
        cacheContent:"",//缓存内容
    })
    let timer = ref()

    const handleTimeComponent = (val) => {
        if(!val)return
        let splitData = val.split(":")
        return splitData[0]+"小时"+splitData[1]+"分"+splitData[2]+"秒";
    }

    //删除
    const handleDelete = (row:any,step:string)=>{
        model.handleMsgBox(i18n.t("msg.areYouSureToDelete")).then(()=>{
            if(step=='first'){
                curClickCacheData.value.parentKeys = row.data
            }else{
                curClickCacheData.value.keysName = row.cacheKeysName
            }
            let form = {
                step,
                cacheName:step=="first"?row.data:curClickCacheData.value.parentKeys,
                cacheKeysName:step=="second"?row.cacheKeysName:""
            }
            return requestSysCacheDel(form).then((res:resInterface)=>{
                let {data,code,message} = res;
                if(code!=200){
                    model.handleMsg(`${message}`,"warning")
                    return false;
                }
                if(step=='first'){
                    handleCacheList()
                }else{
                    handleTableCacheRowClick({data:curClickCacheData.value.parentKeys})
                }
                loading.value = false;
            }).catch((err: any)=>{
                console.log(err);
            })
        })

    }

    //点击行事件
    const handleTableCacheRowClick = (row:any)=>{
        loading.value = true;
        curClickCacheData.value.parentKeys = row.data
        let form = {
            parentKeys:row.data
        }
        return requestSysCacheChild(form).then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            tableKeysNameConfig.tableData.length = 0
            tableKeysNameConfig.tableData = data;
            loading.value = false;
        }).catch((err: any)=>{
            console.log(err);
        })
    }
    //点击行事件
    const handleTableKeysRowClick = (row:any)=>{
        loading.value = true;
        curClickCacheData.value.keysName = row.cacheKeysName
        let form = {
            keysName:curClickCacheData.value.keysName,
            parentKeys:curClickCacheData.value.parentKeys,
        }
        return requestSysCacheContent(form).then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            cacheData.value.cacheName = data.cacheName
            cacheData.value.cacheKeys = data.cacheKeys
            cacheData.value.cacheContent = data.cacheContent
            loading.value = false;
        }).catch((err: any)=>{
            console.log(err);
        })
    }


        //缓存列表
    const handleCacheList = ()=>{
        return requestSysCacheList().then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            tableCacheConfig.tableData = data;
            return true
        }).catch((err: any)=>{
            console.log(err);
            return false;
        })
    }

    const handleGetNewSysInfo = ()=>{
        return new Promise((resolve, reject)=>{
            timer.value = setInterval(async ()=>{
                client.value.handleSocketEmit("sysMonitor",{data:"sysMonitor"})
                resolve(true)
            },1000)
        })
    }
    let client = inject<any>(socketEnum.socket);
    client.value.handleSocketEvent("sysMonitor",(data)=>{
        sysInfo.value.cpu = data.cpu
        sysInfo.value.memory = data.memory
        sysInfo.value.sysInfo = data.sysInfo
    })

    onMounted(()=>{
        loading.value = true;
        axios.all([handleGetNewSysInfo(),handleCacheList()]).then(axios.spread((res:boolean,res1:boolean)=>{
            if(res && res1){
                loading.value = false
            }else{
                loading.value = false;
            }
        }))
    })
    onBeforeUnmount(()=>{
        clearInterval(timer.value)
    })
    return {
        loading,settingStore,sysInfo,curClickCacheData,cacheData,
        handleTimeComponent,handleDelete,handleTableCacheRowClick,handleTableKeysRowClick,
    }
}
