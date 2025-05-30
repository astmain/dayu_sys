/*- coding = utf-8 -*-
@Time : 2023/4/6 17:42
@Author : 沉默小管
@File : useDataFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {formConfig, formInit} from "@/views/system/dictList/config/dataFormConfig";
import {handleGetCurInstance} from "@/utils/utils";
import {useClass} from "@/views/system/dictList/hooks/useClass";
import {requestDictList} from "@/network/system/dictList";
import {pageConfig, tableConfig} from "@/views/system/dictList/config/dataTableConfig";
import {requestDictDataDel, requestDictDataList} from "@/network/system/dictList/data";
import {resInterface} from "@/network";
import {defineAsyncComponent, onMounted, onUnmounted, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
import {useRoute} from "vue-router";
import {isArray} from "@/utils/lodash";
import router from "@/router/index";
import FormList from '@/components/formList'
const G_DictDataEditDialog = defineAsyncComponent(() => import("../cpns/dictDataEditDialog/index.vue"))
const G_DictDataAddDialog = defineAsyncComponent(() => import("../cpns/dictDataAddDialog/index.vue"))
const TableList = defineAsyncComponent(()=>import("@/components/tableList"))

export const useFunc = () =>{
    let formRef = ref<InstanceType<typeof FormList>>()
    let tableListRef = ref<InstanceType<typeof TableList>>(null)
    let dictDataEditDialogRef = ref<InstanceType<typeof G_DictDataEditDialog>>()
    let dictDataAddDialogRef = ref<InstanceType<typeof G_DictDataAddDialog>>()
    let formSearchModel = ref({
        ...formInit
    })
    let curDictId = ref();//当前字典id
    let dictList = ref([])//类型数据字典
    let dialogTitle = ref("")
    let key = ref(0)

    let loading = ref(false)
    let dialogShow = ref(false)
    let ids = ref<number|string[]>([]) // 选中数组
    let multiple = ref<boolean>(true)// 非多个禁用
    let route = useRoute()
    let settingStore = useStore("useSetting")
    let appStore = useStore("useApp")
    let {axios,model,dict,i18n} = handleGetCurInstance()
    let {handleDict,dicts} = useClass()
    let dictId = route.params && route.params.id
    const handleTableSelectionChange = (selection: any[])=>{
        ids.value = selection.map((item:any) => item.id);
        multiple.value = !selection.length;
    }

    const handleCloseDialog = async ()=>{
        loading.value = true
        await handleList(dictId).then((res:any)=>{
            loading.value = false
        })
    }

    const handleSearch = async () => {
        loading.value = true

        await handleList(dictId).then((res:any)=>{
            loading.value = false
        })
    }
    const handleReset = async () => {
        loading.value = true
        formSearchModel.value={
            ...formInit
        }
        await handleList(dictId).then((res:any)=>{
            loading.value = false
        })
    }
    const handleAdd = async (dictDataAddDialogRef:any) => {
        loading.value = true;
        console.log(dictDataAddDialogRef,"ggggggggggggg");
        await dictDataAddDialogRef.handleOpenDialog(curDictId.value)
        loading.value = false;
    }

    //编辑
    const handleEdit = async (row: any,dictEditDialogRef:any) => {
        loading.value = true;
        await dictEditDialogRef.handleOpenDialog(curDictId.value,row)
        loading.value = false;
    }
    //删除
    const handleDelete = (row?: any)=>{
        const id = (row.id?[row.id]:false) || ids.value;
        model.handleMsgBox(i18n.t("msg.areYouSureToDelete")).then(()=>{
            loading.value=true
            return requestDictDataDel({id:id.toString()}).then(res=>{
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

    const handleList = async (id:any)=>{
        formSearchModel.value.dictId = id+""
        let form = {
            ...formSearchModel.value,
            pageSize:pageConfig.pageSize,
            currentPage:pageConfig.currentPage,
        }
        return await requestDictDataList(form).then((res:any)=>{
            let {code, message,data} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            tableConfig.tableData = appStore.device=="mobile"?tableConfig.tableData:[];
            curDictId.value = id;
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
        })
    }

    const handleCurrentChange = async (val:number)=>{
        loading.value = true
        pageConfig.currentPage = val;

        await handleList(dictId).then((res:any)=>{
            loading.value = false
            tableListRef.value.handleSetScrollTop()
        })
    }
    const handleSizeChange = async (val:number)=> {
        loading.value = true
        pageConfig.pageSize = val;
        let form = {
            dictId:dictId,
            pageSize:pageConfig.pageSize,
            currentPage:pageConfig.currentPage,
        }
        await handleList(form).then((res: boolean) => {
            loading.value = false
            tableListRef.value.handleSetScrollTop()
        })
    }
    const handleDictsList = async ()=>{
        return await requestDictList().then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            return data.data;
        }).catch((err: any)=>{
            console.log(err);
            return false;
        })
    }
    //初始化页面数据
    const handleInit = async ()=>{
        let dictsList = await handleDictsList()
        await handleDict(dict)
        await handleFormInit(dicts,dictsList)
        return true;
    }
    const handleFormInit = (dicts,dictsList)=>{
        for(let i in formConfig.formItems){
            if(formConfig.formItems[i]["prop"]=="status"){
                formConfig.formItems[i]["options"]=dicts.sysSwitches;
            }
            if(formConfig.formItems[i]["prop"]=="dictId"){
                formConfig.formItems[i]["options"]=dictsList;
            }
        }
    }
    /** 查询字典类型列表 */
    const handleGetTypeList = () => {
        return requestDictList().then((res:any) => {
            dictList.value = res.data;
            return true
        });
    }
    //上一级
    const handleGoBack = ()=>{
        router.back()
    }
    onMounted(()=>{
        loading.value = true;
        axios.all([handleGetTypeList(),handleInit()]).then(axios.spread(async (res:boolean)=>{
            await handleList(dictId)
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
        appStore,formRef,ids,tableListRef,dictDataEditDialogRef,dictDataAddDialogRef,handleTableSelectionChange,handleGoBack,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleCloseDialog,handleDelete,handleEdit,handleAdd,
        route,dicts,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,curDictId,dictList,loading
    }
}