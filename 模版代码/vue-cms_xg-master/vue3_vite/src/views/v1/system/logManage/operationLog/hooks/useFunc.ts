/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {handleGetCurInstance} from "@/utils/utils";
import {request} from "@/commonNetwork/request"
import {formInit,formConfig} from "../config/formConfig";
import {pageConfig, tableConfig} from "../config/tableConfig";
import {
    requestOperationLog,
    requestOperationLogDel
} from "@/network/system/logManage/operationLog/index";
import {requestCleanOperationLog} from "@/network/system/logManage/operationLog/index";
import {useClass} from "./useClass";
import {onMounted, onUnmounted, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
import {isArray} from "@/utils/lodash";
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
    let ids = ref<number|string[]>([]) // 选中数组
    let multiple = ref<boolean>(true)// 非多个禁用
    let settingStore = useStore("useSetting")
    let appStore = useStore("useApp")
    let {axios,model,dict,i18n} = handleGetCurInstance()
    let {handleDict,dicts} = useClass()

    //返回表单修改
    const handleFormChange = (val,props)=>{
        if(props=="createTime"){
            formSearchModel.value.startTime = val[0]
            formSearchModel.value.endTime = val[1]
        }
    }
    //导出
    const handleExport = ()=>{
        model.handleMsg(`开发中`, "warning")
        // request({downloadData:{
        //         url:"/monitor/operlog/export",
        //         params:{...formSearchModel.value},
        //         filename:`operlog_${new Date().getTime()}.xlsx`,
        //     }})
    }
    const handleTableSelectionChange = (selection: any[])=>{
        ids.value = selection.map((item:any) => item.id);
        multiple.value = !selection.length;
    }

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
        return requestOperationLog(form).then((res: any) => {
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
            console.log(res,"resresresres");
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

    /** 删除按钮操作 */
    const handleDelete = (row?: any) => {
        const id = (row.id?[row.id]:false) || ids.value;
        model.handleMsgBox(i18n.t("msg.areYouSureToDelete")).then(() => {
            loading.value = false;
            return requestOperationLogDel({id:id.toString()}).then(res=>{
                return res.code!=200?false:true;
            });
        }).then(async (res:boolean) => {
            if(res){
                for(let i in tableConfig.tableData){
                    if(isArray(id) && id?.length >0){
                        for(let q in id){
                            if(tableConfig.tableData[i]["id"] == id[q]){
                                tableConfig.tableData.splice(i,1)
                            }
                        }
                    }else{
                        if(tableConfig.tableData[i]["id"] == id){
                            tableConfig.tableData.splice(i,1)
                        }
                    }
                }
                model.handleMsg(i18n.t("msg.successfullyDeleted"), "success");
            }
            loading.value = false
        }).catch(() => {
            loading.value = false
        });
    }
    /** 清空按钮操作 */
    const handleClean = (row?: any)=>{

        model.handleMsgBox(i18n.t("msg.areYouSureToDelete")).then(() => {
            loading.value = false;
            return requestCleanOperationLog();
        }).then(async () => {
            await handleList();
            loading.value = false
            model.handleMsg(i18n.t("msg.successfullyDeleted"), "success");
        }).catch(() => {
            loading.value = false
        });
    }
    const handleRequestParamsToObj = (val)=>{
        if(!val)return
        return JSON.parse(val)
    }
    onMounted(()=>{
        loading.value = true;
        axios.all([handleList(),handleDict(dict)]).then(axios.spread((res:boolean)=>{
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
        handleTableSelectionChange,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleDelete,handleClean,handleFormChange,handleExport,handleRequestParamsToObj,
        formRef,tableListRef,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading,dicts
    }
}