/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {resInterface} from "@/commonNetwork/index";
import {handleGetCurInstance} from "@/utils/utils";
import {requestImgDel, requestImgList} from "@/network/pic/picList/index";
import {ImgURLStorage} from "@/commonNetwork/request";
import {formInit,formConfig} from "@/views/pic/picList/config/formConfig";
import {pageConfig} from "@/views/pic/picList/config/picConfig";
import {handleGetHeight} from "@/utils/utils";
import {useRoute} from "vue-router";
import {defineAsyncComponent, onMounted, onUnmounted, reactive, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
import {tableConfig} from "@/views/system/msgManage/notice/config/tableConfig";
import router from "@/router/index";
const G_PicEditDialog = defineAsyncComponent(()=>import("../cpns/picEditDialog/index.vue"))
const G_PicAddDialog = defineAsyncComponent(()=>import("../cpns/picAddDialog/index.vue"))

export const useFunc = () =>{
    let loading = ref<boolean>(false)
    let picEditDialogRef = ref<InstanceType<typeof G_PicEditDialog>>()
    let picAddDialogRef = ref<InstanceType<typeof G_PicAddDialog>>()
    let formSearchModel = ref({
        ...formInit
    })
    let contentHeight = ref(0)
    let dialogTitle = ref("")
    let key = ref(0)
    let dataArr = reactive<any>([])

    let picSortId = ref<any>(0);//图片分类id
    let dialogShow = ref(false)
    let settingStore = useStore("useSetting")
    let appStore = useStore("useApp")
    let route = useRoute();
    let {axios,model,i18n} = handleGetCurInstance()
    const handleList = ()=>{
        let form:any = {
            ...formSearchModel.value,
            // pageSize:pageConfig.pageSize,
            // currentPage:pageConfig.currentPage,
        }
        if(picSortId.value>0){
            form = {
                imgSortId:picSortId.value,
                ...form,
            }
        }
        return requestImgList(form).then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            tableConfig.tableData = appStore.device=="mobile"?tableConfig.tableData:[];
            let list = data.data;
            pageConfig.total = data.total;
            dataArr.length = 0;
            for(let i in list){
                let imgMidUrl = ImgURLStorage+list[i]["imgMidUrl"]
                dataArr.push({
                    ...list[i],
                    imgMidUrl,
                })
            }
            return true;
        }).catch((err: any)=>{
            console.log(err);
        })
    }
    //关闭弹出框回调函数
    const handleCloseDialog = async ()=>{
        dataArr.length = 0;
        loading.value = true
        await handleList().then((res:any)=>{
            loading.value = false
        })
    }
    const handleSizeChange = async (val:number)=>{
        loading.value = true
        pageConfig.pageSize = val;
        await handleList().then((res:any)=>{
            loading.value = false
        })
    }
    const handleCurrentChange = async (val:number)=>{
        loading.value = true
        pageConfig.currentPage = val;
        await handleList().then((res:any)=>{
            loading.value = false
        })
    }
    //删除
    const handleDelete = (row?: any)=>{
        const id = (row.id?row.id:false);
        model.handleMsgBox(i18n.t("msg.areYouSureToDelete")).then(()=>{
            loading.value=true
            return requestImgDel({id:id.toString()}).then(res=>{
                return res.code!=200?false:true;
            });
        }).then(async (res:boolean) => {
            if(res){
                for(let i in dataArr){
                    if(id+"" == dataArr[i]["id"]){
                        dataArr.splice(i,1)
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
    const handleEdit = (row: any,picEditDialogRef:any)=>{
        picEditDialogRef.handleOpenDialog(row)
    }
    //添加
    const handleAdd = (picAddDialogRef:any) => {
        picAddDialogRef.handleOpenDialog()
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
    //页面初始化
    const handleInit = ()=>{
        let id = route?.params && route?.params?.id
        picSortId.value = id?id:0;
        handleWatchHeight()
    }
    //监听高度
    const handleWatchHeight = ()=>{
        contentHeight.value = handleGetHeight(false,true)
        window.addEventListener("resize",()=>{
            contentHeight.value = handleGetHeight(false,true)
        })
    }
    //上一级
    const handleGoBack = ()=>{
        router.back()
    }
    onMounted(()=>{
        handleInit()
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
        handleList,handleSearch,handleReset,handleCloseDialog,handleDelete,handleEdit,handleAdd,
        handleSizeChange,handleCurrentChange,handleGoBack,route,
        appStore,picSortId,loading,picEditDialogRef,picAddDialogRef,settingStore,dialogShow,dialogTitle,key,formSearchModel,formConfig,pageConfig,dataArr,contentHeight
    }
}
