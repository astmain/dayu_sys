/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : CSDN 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {handleGetCurInstance} from "@/utils/utils";
import {formInit,formConfig} from "../config/formConfig";
import {pageConfig, tableConfig} from "../config/tableConfig";
import {defineAsyncComponent, onMounted, onUnmounted, ref} from "vue"
import {useStore} from "@/store/piniaAutoImport";
import {useClass} from "./useClass";
import {requestNoticeDel, requestNoticeList} from "@/network/system/msgManage/notice/index";
import {isArray} from "@/utils/lodash";
import TableList from "@/components/tableList";
import G_NoticeAddDialog from "@/views/system/msgManage/notice/cpns/noticeAddDialog/index.vue"
import G_NoticeEditDialog from "@/views/system/msgManage/notice/cpns/noticeEditDialog/index.vue"
import G_NoticeSendMsgDialog from "@/views/system/msgManage/notice/cpns/noticeSendMsgDialog/index.vue"

export const useFunc = () =>{
    let tableListRef = ref<InstanceType<typeof TableList>>(null)
    let noticeEditDialogRef = ref<InstanceType<typeof G_NoticeEditDialog>>()
    let noticeAddDialogRef = ref<InstanceType<typeof G_NoticeAddDialog>>()
    let noticeSendMsgDialogRef = ref<InstanceType<typeof G_NoticeSendMsgDialog>>()
    let formSearchModel = ref({
        ...formInit
    })
    let dialogTitle = ref("")
    let key = ref(0)

    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    let ids = ref<number|string[]>([]) // 选中数组
    let selectedArr = ref<string[]>([]) // 选中数组
    let multiple = ref<boolean>(true)// 非多个禁用
    let settingStore = useStore("useSetting")
    let appStore = useStore("useApp")
    let {axios,model,dict,i18n} = handleGetCurInstance()
    let {handleDict,dicts} = useClass()


    const handleTableSelectionChange = (selection: any[])=>{
        ids.value = selection.map((item:any) => item.id);
        selectedArr.value = selection.map((item:any) => item);
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
        return requestNoticeList(form).then((res: any) => {
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

    /** 删除按钮操作 */
    const handleDelete = (row?: any) => {
        const id = (row.id?[row.id]:false) || ids.value;
        model.handleMsgBox(i18n.t("msg.areYouSureToDelete")).then(() => {
            loading.value = false;
            return requestNoticeDel({id:id.toString()}).then(res=>{
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
    const handleCloseDialog = async ()=>{
        loading.value = true
        await handleList().then((res:any)=>{
            loading.value = false
        })
    }
    //添加
    const handleAdd = (noticeAddDialogRef:any)=>{
        noticeAddDialogRef.handleOpenDialog()
    }
    //编辑
    const handleEdit = (row: any,noticeEditDialogRef:any)=>{
        noticeEditDialogRef.handleOpenDialog(row)
    }
    const handleShowNoticeDialog = (noticeSendMsgDialogRef:any)=>{
        if(selectedArr.value?.length>1){
            model.handleMsg("只能选择一个选项", "warning");
            return;
        }
        noticeSendMsgDialogRef.handleOpenDialog(selectedArr.value[0])
    }
    onMounted(()=>{
        loading.value = true;
        axios.all([handleList(),handleDict(dict)]).then(axios.spread((res:boolean,res1:boolean)=>{
            if(res && res1){
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
        handleAdd,handleList,handleSearch,handleReset,handleSizeChange,handleCurrentChange,handleDelete,handleEdit,handleCloseDialog,handleTableSelectionChange,handleShowNoticeDialog,
        tableListRef,noticeEditDialogRef,noticeAddDialogRef,noticeSendMsgDialogRef,dicts,settingStore,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,tableConfig,loading,multiple,ids
    }
}