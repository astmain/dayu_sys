/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {handleGetCurInstance} from "@/utils/utils";
import {formConfig, formInit} from "../config/formConfig";
import {pageConfig, tableConfig} from "../config/tableConfig";
import {useClass} from "./useClass";
import {resInterface} from "@/commonNetwork/index";
import {onMounted, onUnmounted, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
import {requestOnlineUserList} from "@/network/systemMonitor/onlineUser";
import {requestChangeStatusExit} from "@/network/systemMonitor/onlineUser/index";
import TableList from "@/components/tableList";

export const useFunc = () =>{
    let tableListRef = ref<InstanceType<typeof TableList>>(null)
    let formSearchModel = ref({
        ...formInit
    })
    let dialogTitle = ref("")
    let key = ref(0)

    let loading = ref(false)
    let dialogShow = ref(false)
    let settingStore = useStore("useSetting")
    let appStore = useStore("useApp")
    let {axios,model,dict,i18n} = handleGetCurInstance()
    let {handleDict,dicts} = useClass()

    const handleSearch = async () => {
        loading.value = true
        await handleList().then((res:any)=>{
            loading.value = false
        })
    }
    const handleReset = async () => {
        loading.value = true
        formSearchModel.value={
            ...formInit
        }
        await handleList().then((res:any)=>{
            loading.value = false
        })
    }
    const handleList = () => {
        let form = {
            ...formSearchModel.value,
            pageSize:pageConfig.pageSize,
            currentPage:pageConfig.currentPage,
        }
        return requestOnlineUserList(form).then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            tableConfig.tableData = appStore.device=="mobile"?tableConfig.tableData:[];
            let list = data.data;
            pageConfig.total = data.total;
            for(let i in list){
                tableConfig.tableData.push({
                    ...list[i]
                })
            }
            return true;
        }).catch((err: any)=>{
            console.log(err);
            return false;
        })
    }

    const handleCurrentChange = async (val:number)=>{
        loading.value = true
        pageConfig.currentPage = val;

        await handleList().then((res:any)=>{
            loading.value = false
            tableListRef.value.handleSetScrollTop()
        })
    }
    const handleSizeChange = async (val:number)=>{
        loading.value = true
        pageConfig.currentPage = val;
        await handleList().then((res:any)=>{
            loading.value = false
            tableListRef.value.handleSetScrollTop()
        })
    }

    /** 修改用户登录状态 */
    const handleChangeStatusExit = (row?: any) => {
        const id = (row.id?[row.id]:false);
        model.handleMsgBox("你是否要强制退出?").then(() => {
            loading.value = false;
            return requestChangeStatusExit({id:id.toString()}).then(res=>{
                return res.code!=200?false:true;
            });
        }).then(async (res:boolean) => {
            if(res){
                tableConfig.tableData.length = 0;
                await handleList();
                model.handleMsg("修改成功", "success");
            }
            loading.value = false
        }).catch(() => {
            loading.value = false
        });
    }
    //初始化页面数据
    const handleInit = async ()=>{
        await handleDict(dict)
        return true;
    }

    onMounted(()=>{
        loading.value = true;
        axios.all([handleList(),handleInit()]).then(axios.spread((res:boolean)=>{
            if(res){
                loading.value = false
            }else{
                loading.value = false;
            }
        }))
    })
    onUnmounted(()=>{
        tableConfig.tableData.length = 0;
    })
    return {
        handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleChangeStatusExit,
        tableListRef,dicts,settingStore,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading
    }
}