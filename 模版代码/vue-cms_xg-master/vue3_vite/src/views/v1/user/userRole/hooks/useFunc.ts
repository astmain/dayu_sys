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
import {requestChangeRoleStatus, requestRoleDel, requestRoleList} from "@/network/user/userRole/index";
import {defineAsyncComponent, onMounted, onUnmounted, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
import {isArray} from "@/utils/lodash";
import TableList from "@/components/tableList";
const G_RoleEditDialog = defineAsyncComponent(()=>import("../cpns/userRoleEditDialog/index.vue"))
const G_RoleAddDialog = defineAsyncComponent(()=>import("../cpns/userRoleAddDialog/index.vue"))

export const useFunc = () =>{
    let tableListRef = ref<InstanceType<typeof TableList>>(null)
    let roleEditDialogRef = ref<InstanceType<typeof G_RoleEditDialog>>()
    let roleAddDialogRef = ref<InstanceType<typeof G_RoleAddDialog>>()
    let formSearchModel = ref({
        ...formInit
    })
    let dialogTitle = ref("")
    let key = ref(0)

    let loading = ref(false)
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
    const handleList = () => {
        let form = {
            ...formSearchModel.value,
            pageSize:pageConfig.pageSize,
            currentPage:pageConfig.currentPage,
        }
        return requestRoleList(form).then((res:resInterface)=>{
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
        pageConfig.pageSize = val;
        await handleList().then((res:any)=>{
            loading.value = false
            tableListRef.value.handleSetScrollTop()
        })
    }

    /** 删除按钮操作 */
    const handleDelete = (row?: any) => {
        const id = (row.id?[row.id]:false);
        model.handleMsgBox(i18n.t("msg.areYouSureToDelete")).then(() => {
            loading.value = true;
            return requestRoleDel({id:id.toString()}).then(res=>{
                return res.code!=200?false:true;
            });
        }).then(async (res) => {
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
    //初始化页面数据
    const handleInit = async ()=>{
        await handleDict(dict)
        return true;
    }
    const handleCloseDialog = async ()=>{
        loading.value = true
        await handleList().then((res:any)=>{
            loading.value = false
        })
    }
    const handleAdd = (roleAddDialogRef:any)=>{
        roleAddDialogRef.handleOpenDialog()
    }
    //编辑
    const handleEdit = (row: any,roleEditDialogRef:any)=>{
        roleEditDialogRef.handleOpenDialog(row)
    }
    //修改角色状态
    const handleChangeStatus = (val:any)=>{
        loading.value =true;
        let form = {
            id:val.id,
            status:val.status==1?2:1
        }
        requestChangeRoleStatus(form).then(async res=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                loading.value =false;
                return false;
            }
            tableConfig.tableData.length = 0;
            await handleList()

            loading.value =false;
            return true;
        }).catch(err=>{
            loading.value =false;
        })
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
        handleTableSelectionChange,handleAdd,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleDelete,handleEdit,handleCloseDialog,handleChangeStatus,
        roleEditDialogRef,tableListRef,roleAddDialogRef,dicts,settingStore,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading,multiple
    }
}