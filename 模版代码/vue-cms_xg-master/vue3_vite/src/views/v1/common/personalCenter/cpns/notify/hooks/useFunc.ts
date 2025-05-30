/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : CSDN 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {handleGetCurInstance} from "@/utils/utils";
import {defineAsyncComponent, onMounted, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
import {useClass} from "@/views/layout/cpns/notice/hooks/useClass";
import {requestNotifyList} from "@/network/system/msgManage/notify";
import {pageConfig, tableConfig} from "@/views/common/personalCenter/cpns/notify/config/tableConfig";
import FormList from "@/components/formList";
import TableList from "@/components/tableList";
const G_NoticeDetailDialog = defineAsyncComponent(() => import("../cpns/noticeDetailDialog/index.vue"))

export const useFunc = () =>{
    let formRef = ref<InstanceType<typeof FormList>>()
    let tableListRef = ref<InstanceType<typeof TableList>>(null)
    let noticeDetailDialogRef = ref<InstanceType<typeof G_NoticeDetailDialog>>(null)
    let dialogTitle = ref("")

    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    let ids = ref<number|string[]>([]) // 选中数组
    let multiple = ref<boolean>(true)// 非多个禁用
    let settingStore = useStore("useSetting")
    let {dicts,handleDict} = useClass()
    let userStore:any = useStore("useUser")
    let appStore:any = useStore("useApp")
    let {axios,model,dict} = handleGetCurInstance()

    const handleTableSelectionChange = (selection: any[])=>{
        ids.value = selection.map((item:any) => item.id);
        multiple.value = !selection.length;
    }
    const handleList = async () => {
        let form = {
            notifyUid:userStore.userInfo.id,
            pageSize:pageConfig.pageSize,
            currentPage:pageConfig.currentPage,
        }
        return requestNotifyList(form).then((res: any) => {
            let {data, code, message} = res;
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
            loading.value = false;
            return true;
        }).catch((err: any) => {
            console.log(err);
            return false;
        });
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
    /**
     * 查看消息通知详细内容
     */
    const handleDetail = (val:any,noticeDetailDialogRef:any)=>{
        noticeDetailDialogRef.handleOpenDialog(val);
    }
    const handleCloseDialog = async ()=>{
        loading.value = true
        await handleList()
        loading.value = false
    }
    onMounted(async ()=>{
        loading.value = true;
        axios.all([handleList(),handleDict(dict)]).then(axios.spread((res:boolean,res1:boolean)=>{
            if(res && res1){
                loading.value = false
            }else{
                loading.value = false;
            }
        }))
    })
    return {
        dicts,handleDict,formRef,tableListRef,noticeDetailDialogRef,
        handleTableSelectionChange,handleList,handleSizeChange,handleCurrentChange,handleDetail,handleCloseDialog,
        settingStore,dialogShow,dialogTitle,pageConfig,tableConfig,loading
    }
}