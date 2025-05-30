/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {resInterface} from "@/commonNetwork/index";
import {handleGetCurInstance} from "@/utils/utils";
import {pageConfig, tableConfig} from "@/views/article/articleSort/config/tableConfig";
import {requestArtSortDel, requestArtSortList} from "@/network/article/articleSort";
import {formInit,formConfig} from "@/views/article/articleSort/config/formConfig";
import {defineAsyncComponent, onMounted, onUnmounted, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
import {isArray} from "@/utils/lodash";
import TableList from "@/components/tableList";
const G_ArtSortEditDialog = defineAsyncComponent(()=>import("../cpns/articleSortEditDialog/index.vue"))
const G_ArtSortAddDialog = defineAsyncComponent(()=>import("../cpns/articleSortAddDialog/index.vue"))


export const useFunc = () =>{
    let tableListRef = ref<InstanceType<typeof TableList>>(null)
    let artSortEditDialogRef = ref<InstanceType<typeof G_ArtSortEditDialog>>()
    let artSortAddDialogRef = ref<InstanceType<typeof G_ArtSortAddDialog>>()
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
    let {axios,model,i18n} = handleGetCurInstance()
    const handleList = ()=>{
        let form = {
            ...formSearchModel.value,
            pageSize:pageConfig.pageSize,
            currentPage:pageConfig.currentPage,
        }
        return requestArtSortList(form).then((res:resInterface)=>{
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
            tableListRef.value?.handleSetScrollTop()
        })
    }
    const handleCurrentChange = async (val:number)=>{
        loading.value = true
        pageConfig.currentPage = val;

        await handleList().then((res:any)=>{
            loading.value = false
            tableListRef.value?.handleSetScrollTop()
        })
    }
    //关闭弹出框回调函数
    const handleCloseDialog = async ()=>{
        loading.value = true
        await handleList().then((res:any)=>{
            loading.value = false
        })
    }
    //删除
    const handleDelete = (row?: any)=>{
        const id = (row.id?[row.id]:false) || ids.value;
        model.handleMsgBox(i18n.t("msg.areYouSureToDelete")).then(()=>{
            loading.value=true
            return requestArtSortDel({id:id.toString()}).then(res=>{
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
    //编辑
    const handleEdit = (row: any,artSortEditDialogRef:any)=>{
        artSortEditDialogRef.handleOpenDialog(row)
    }
    //添加
    const handleAdd = (artSortAddDialogRef:any) => {
        artSortAddDialogRef.handleOpenDialog()
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
    onUnmounted(()=>{
        tableConfig.tableData.length = 0;
    })
    return {
        handleTableSelectionChange,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleCloseDialog,handleDelete,handleEdit,handleAdd,
        tableListRef,artSortEditDialogRef,artSortAddDialogRef,tableConfig,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,loading
    }
}