/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {resInterface} from "@/commonNetwork/index";
import {handleGetCurInstance} from "@/utils/utils";
import {requestDictDel, requestDictList} from "@/network/system/dictList";
import {useClass} from "@/views/system/dictList/hooks/useClass";
import {formInit,formConfig} from "@/views/system/dictList/config/formConfig";
import {pageConfig, tableConfig} from "@/views/system/dictList/config/tableConfig";
import {defineAsyncComponent, onMounted, onUnmounted, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
import {isArray} from "@/utils/lodash";
import FormList from "@/components/formList";
import TableList from "@/components/tableList";
import G_DictAddDialog from "@/views/system/dictList/cpns/dictAddDialog/index.vue";
import G_DictEditDialog from "@/views/system/dictList/cpns/dictEditDialog/index.vue";

export const useFunc = () =>{
    let formRef = ref<InstanceType<typeof FormList>>()
    let tableListRef = ref<InstanceType<typeof TableList>>(null)
    let dictEditDialogRef = ref<InstanceType<typeof G_DictEditDialog>>()
    let dictAddDialogRef = ref<InstanceType<typeof G_DictAddDialog>>()
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

    const handleCloseDialog = async ()=>{
        loading.value = true
        await handleList().then((res:any)=>{
            loading.value = false
        })
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
    const handleAdd = async (dictAddDialogRef:any) => {
        loading.value = true;
        await dictAddDialogRef.handleOpenDialog()
        loading.value = false;
    }

    //编辑
    const handleEdit = async (row: any,dictEditDialogRef:any) => {
        loading.value = true;
        await dictEditDialogRef.handleOpenDialog(row)
        loading.value = false;
    }
    //删除
    const handleDelete = (row?: any)=>{
        const id = (row.id?[row.id]:false) || ids.value;
        model.handleMsgBox(i18n.t("msg.areYouSureToDelete")).then(()=>{
            loading.value=true
            return requestDictDel({id:id.toString()}).then(res=>{
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

    const handleList = ()=>{
        let form = {
            ...formSearchModel.value,
            pageSize:pageConfig.pageSize,
            currentPage:pageConfig.currentPage,
        }
        return requestDictList(form).then((res:resInterface)=>{
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
                    ...list[i],
                })
            }
            return true;
        }).catch((err: any)=>{
            console.log(err);
            return false;
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
    const handleCurrentChange = async (val:number)=>{
        loading.value = true
        pageConfig.currentPage = val;

        await handleList().then((res:any)=>{
            loading.value = false
            tableListRef.value.handleSetScrollTop()
        })
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
                formConfig.formItems[i]["options"]=dicts.sysSwitches;
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
        handleTableSelectionChange,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleCloseDialog,handleDelete,handleEdit,handleAdd,
        formRef,tableListRef,dictEditDialogRef,dictAddDialogRef,dicts,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading
    }
}