/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {handleGetCurInstance} from "@/utils/utils";
import {formConfig, formInit} from "../config/formConfig";
import {request} from "@/commonNetwork/request"
import {pageConfig, tableConfig} from "../config/tableConfig";
import {requestLoginLogList} from "@/network/system/logManage/loginLog/index";
import {useClass} from "./useClass";
import {requestCleanLoginLog} from "@/network/system/logManage/loginLog/index";
import {onMounted, onUnmounted, ref} from "vue";
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
    let ids = ref<number|string[]>([]) // 选中数组
    let multiple = ref<boolean>(true)// 非多个禁用
    let settingStore = useStore("useSetting")
    let appStore = useStore("useApp")
    let {axios,model,dict,i18n} = handleGetCurInstance()
    let {handleDict,dicts} = useClass()

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
    const handleList = () => {
        let form = {
            ...formSearchModel.value,
            pageSize:pageConfig.pageSize,
            currentPage:pageConfig.currentPage,
        }
        return requestLoginLogList(form).then((res: any) => {
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

    /** 清空按钮操作 */
    const handleClean = () => {
        model.handleMsgBox(i18n.t("msg.areYouSureToDelete")).then(() => {
            loading.value = false;
            return requestCleanLoginLog();
        }).then(async () => {
            await handleList();
            loading.value = false
            model.handleMsg(i18n.t("msg.successfullyDeleted"), "success");
        }).catch(() => {
            loading.value = false
        });
    }
    //初始化页面数据
    const handleInit = async ()=>{
        await handleDict(dict)
        await handleFormInit(dicts)
        return true;
    }
    const handleFormInit = (dicts)=>{
        for(let i in formConfig.formItems){
            if(formConfig.formItems[i]["prop"]=="status"){
                formConfig.formItems[i]["options"]=dicts.sysCommonStatus;
                break;
            }
        }
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
        handleTableSelectionChange,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleFormChange,handleExport,handleClean,
        formRef,tableListRef,dicts,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading
    }
}