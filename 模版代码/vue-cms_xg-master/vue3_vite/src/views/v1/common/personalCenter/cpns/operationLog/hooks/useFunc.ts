/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : CSDN 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {handleGetCurInstance} from "@/utils/utils";
import {
   requestOperationLogByUid,
} from "@/network/system/logManage/operationLog/index";
import {formInit} from "@/views/common/personalCenter/cpns/operationLog/config/formConfig";
import {pageConfig, tableConfig} from "@/views/common/personalCenter/cpns/operationLog/config/tableConfig";
import {onMounted, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
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

    //操作内容处理
    const computedContent = (val?:string|undefined)=>{
        let content
        if (typeof val === "string") {
            content = JSON.parse(val)
        }
        return "ip:"+content.ip+" 访问路劲:"+content.accessUrl
    }
    const handleList = () => {
        let form = {
            ...formSearchModel.value,
            pageSize:pageConfig.pageSize,
            currentPage:pageConfig.currentPage,
        }
        return requestOperationLogByUid(form).then((res: any) => {
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
    const handleRequestParamsToObj = (val)=>{
        if(!val)return
        return JSON.parse(val)
    }
    onMounted(()=>{
        loading.value = true;
        axios.all([handleList()]).then(axios.spread((res:boolean)=>{
            if(res){
                loading.value = false
            }else{
                loading.value = false;
            }
        }))
    })
    return {
        handleList,handleSizeChange,handleCurrentChange,computedContent,handleRequestParamsToObj,
        formRef,tableListRef,settingStore,dialogShow,dialogTitle,key,formSearchModel,pageConfig,tableConfig,loading
    }
}