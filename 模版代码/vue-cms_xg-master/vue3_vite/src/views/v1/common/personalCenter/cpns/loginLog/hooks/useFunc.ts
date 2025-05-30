/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : CSDN 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {handleGetCurInstance} from "@/utils/utils";
import { formInit} from "../config/formConfig";
import {pageConfig, tableConfig} from "../config/tableConfig";
import {
    requestLoginLogListByUid
} from "@/network/system/logManage/loginLog/index";
import {useClass} from "./useClass";
import {useStore} from "@/store/piniaAutoImport";
import {onMounted, ref} from "vue"
import FormList from "@/components/formList";
import TableList from "@/components/tableList";

export const useFunc = () =>{
    let formRef = ref<InstanceType<typeof FormList>>()
    let tableListRef = ref<InstanceType<typeof TableList>>(null)
    let formSearchModel = ref({
        ...formInit
    })
    let dialogTitle = ref("")
    let key = ref(0)

    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    let settingStore = useStore("useSetting")
    let appStore = useStore("useApp")
    let {axios,model,dict,i18n} = handleGetCurInstance()
    let {handleDict,dicts} = useClass()

    const handleList = () => {
        let form = {
            ...formSearchModel.value,
            pageSize:pageConfig.pageSize,
            currentPage:pageConfig.currentPage,
        }
        return requestLoginLogListByUid(form).then((res: any) => {
            let {data,code,message} = res;
            if (code != 200) {
                model.handleMsg(`${message}`, "warning")
                return false;
            }
            tableConfig.tableData = appStore.device=="mobile"?tableConfig.tableData:[];
            let list = data.data;
            pageConfig.total = data.total;
            for(let i in list){
                tableConfig.tableData.push({
                    ...list[i],
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
        pageConfig.pageSize = val;
        await handleList().then((res:any)=>{
            loading.value = false
            tableListRef.value.handleSetScrollTop()
        })
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
    return {
        handleList,handleSizeChange,handleCurrentChange,
        formRef,tableListRef,dicts,settingStore,dialogShow,dialogTitle,key,formSearchModel,pageConfig,tableConfig,loading
    }
}