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
import {requestMenuDel, requestMenuList} from "@/network/system/menuList/index";
import {nextTick, onMounted, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
import {isArray} from "@/utils/lodash";
import FormList from "@/components/formList";
import TableList from "@/components/tableList";
import MenuEditDialog from "../cpns/menuEditDialog/index.vue"
import MenuAddDialog from "../cpns/menuAddDialog/index.vue"
import {useRoute} from "vue-router";
import router from "@/router/index";

export const useFunc = () =>{
    let formRef = ref<InstanceType<typeof FormList>>()
    let tableListRef = ref<InstanceType<typeof TableList>>(null)
    let menuEditRef = ref<InstanceType<typeof MenuEditDialog>>()
    let menuAddRef = ref<InstanceType<typeof MenuAddDialog>>()
    let formSearchModel = ref({
        ...formInit
    })
    let dialogTitle = ref("")
    let key = ref(0)
    let route = useRoute()
    let id = route.params.id??''

    let loading = ref(false)
    let dialogShow = ref(false)
    let ids = ref<number|string[]>([]) // 选中数组
    let multiple = ref<boolean>(true)// 非多个禁用
    let isExpandAll = ref<boolean>(false)// 是否展开
    let refreshTable = ref<boolean>(true)// 是否刷新table
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
    const handleList = () => {
        formSearchModel.value.id = id+""
        let form = {
            ...formSearchModel.value,
        }
        return requestMenuList(form).then((res: any) => {
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            tableConfig.tableData.length = 0;
            for(let i in data){
                tableConfig.tableData.push(data[i])
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

    /** 删除按钮操作 */
    const handleDelete = (row?: any) => {
        const id = (row.id?[row.id]:false) || ids.value;
        model.handleMsgBox(i18n.t("msg.areYouSureToDelete")).then(() => {
            loading.value = false;
            return requestMenuDel({id:id.toString()}).then(res=>{
                return res.code!=200?false:true;
            });
        }).then(async (res:boolean) => {
            if(res){
                handleList();
                model.handleMsg(i18n.t("msg.successfullyDeleted"), "success");
            }
            loading.value = false
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
                formConfig.formItems[i]["options"]=dicts.sysSwitches;
                break;
            }
        }
    }
    /** 修改按钮操作 */
    const handleEdit = (row: any,menuEditRef:any) => {
        loading.value = true
        menuEditRef.handleOpenDialog(row)
        loading.value = false
    }
    const handleAdd = (row ?: any,menuAddRef?:any) => {
        loading.value=true;
        if(!row){
            menuAddRef.handleOpenDialog("")
        }else{
            //有上一级
            let menuOptions = [{
                id:0,
                menuName:"主类目",
                children:tableConfig.tableData
            }]
            menuAddRef.handleOpenDialog(row)
        }
        loading.value=false
    }
    const handleCloseDialog = async ()=>{
        loading.value = true
        await handleList().then((res:any)=>{
            loading.value = false
        })
    }
    const handleToggleExpandAll = () => {
        refreshTable.value = false;
        isExpandAll.value = !isExpandAll.value
        nextTick(() => {
            refreshTable.value = true;
        }).then(r => r);
    }
    //进入下一级
    const handleToChild = (val:any)=>{
        console.log(val);
        let id = val.id;
        router.push({ path: '/system/menuList/children/'+id })
    }
    //上一级
    const handleGoBack = ()=>{
       router.back()
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
        handleGoBack,handleToChild,handleTableSelectionChange,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleDelete,handleEdit,handleCloseDialog,handleAdd,handleToggleExpandAll,
        route,tableListRef,formRef,menuEditRef,menuAddRef,appStore,dicts,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,isExpandAll,refreshTable,loading
    }
}