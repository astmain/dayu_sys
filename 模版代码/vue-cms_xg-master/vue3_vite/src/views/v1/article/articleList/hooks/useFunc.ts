/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {resInterface} from "@/commonNetwork/index";
import {formConfig} from "@/views/article/articleList/config/formConfig";
import {handleGetCurInstance} from "@/utils/utils";
import {pageConfig, tableConfig} from "@/views/article/articleList/config/tableConfig";
import {requestArtDel, requestArtList, requestChangeArtStatus} from "@/network/article/articleList";
import {ImgURLStorage} from "@/commonNetwork/request";
import {useClass} from "@/views/article/articleList/hooks/useClass";
import {formInit} from "../config/formConfig";
import {defineAsyncComponent, onMounted, onUnmounted, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
import {isArray} from "@/utils/lodash";
import TableList from "@/components/tableList";
const G_ArtEditDialog = defineAsyncComponent(()=>import("../cpns/artEditDialog/index.vue"))
const G_ArtAddDialog = defineAsyncComponent(()=>import("../cpns/artAddDialog/index.vue"))
import {checkPermission} from "@/utils/permission"

export const useFunc = () =>{
    let tableListRef = ref<InstanceType<typeof TableList>>(null)
    let artEditDialogRef = ref<InstanceType<typeof G_ArtEditDialog>>()
    let artAddDialogRef = ref<InstanceType<typeof G_ArtAddDialog>>()
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
    const handleAdd = async (artAddDialogRef:any) => {
        loading.value = true;
        await artAddDialogRef.handleOpenDialog()
        loading.value = false;
    }

    //编辑
    const handleEdit = async (row: any,artEditDialogRef:any) => {
        loading.value = true;
        await artEditDialogRef.handleOpenDialog(row)
        loading.value = false;
    }
    //删除
    const handleDelete = (row?: any)=>{
        const id = (row.id?[row.id]:false) || ids.value;
        model.handleMsgBox(i18n.t("msg.areYouSureToDelete")).then(()=>{
            loading.value=true
            return requestArtDel({id:id.toString()}).then(res=>{
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
    //是否显示
    const handleChangeStatus = (val: any)=>{
        if(!checkPermission(['article:articleList:displayStatus'])){
            model.handleMsg(`暂无权限`,"warning")
            return;
        }
        loading.value =true;
        let form = {
            id:val.id,
            status:val.status==1?2:1
        }
        requestChangeArtStatus(form).then(async res=>{
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

    const handleList = ()=>{
        let form = {
            ...formSearchModel.value,
            pageSize:pageConfig.pageSize,
            currentPage:pageConfig.currentPage,
        }
        return requestArtList(form).then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            tableConfig.tableData = appStore.device=="mobile"?tableConfig.tableData:[];
            let list = data.data;
            pageConfig.total = data.total;
            if(list.length>0){
                for(let i in list){
                    let picUrl = list[i]['picUrl'];
                    if(list[i]['picUrl']){
                        picUrl = ImgURLStorage+list[i]['picUrl']
                    }else{
                        picUrl='';
                    }
                    tableConfig.tableData.push({
                        ...list[i],
                        picUrl,
                    })
                }
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
        handleTableSelectionChange,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleCloseDialog,handleDelete,handleEdit,handleAdd,handleChangeStatus,
        tableListRef,artEditDialogRef,artAddDialogRef,dicts,settingStore,multiple,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading
    }
}
