/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {inject, onMounted, provide, reactive, ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
import {handleGetCurInstance} from "@/utils/utils";
import {useClass} from "@/views/layout/cpns/notice/hooks/useClass";
import {TabsPaneContext} from "element-plus";
import {pageConfig, tableConfig} from "@/views/layout/cpns/notice/config/tableConfig";
import {socketClient} from "@/plugins/socketClient";
import {requestNotifyList} from "@/network/system/msgManage/notify";
import {requestNoReadNotice} from "@/network/system/msgManage/notify/index";
import {socketEnum} from "@/utils/enum";

export const useFunc = (tableListRef:any,popoverRef:any) =>{

    let dialogTitle = ref("")

    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    let ids = ref<number|string[]>([]) // 选中数组
    let multiple = ref<boolean>(true)// 非多个禁用
    let settingStore = useStore("useSetting")
    let {model,dict} = handleGetCurInstance()
    let {dicts,handleDict} = useClass()
    let activeName = ref("")
    let newNum = ref(0);//未读通知和消息
    let userStore:any = useStore("useUser")
    let appStore:any = useStore("useApp")

    const handleTableSelectionChange = (selection: any[])=>{
        ids.value = selection.map((item:any) => item.id);
        multiple.value = !selection.length;
    }
    const handleList = async (noticeType?:number|string) => {
        let form = {
            notifyUid:userStore.userInfo.id,
            noticeType:noticeType??activeName.value, //通知公告类型id
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
     * 显示通知公告
     */
    const handleShowMsg = async ()=>{
        loading.value = true;
        await handleDict(dict);
        activeName.value = dicts.sysNoticeType[0]["value"];
        await handleList();
    }
    const handleTabClick = async (tab: TabsPaneContext, event: Event) => {
        loading.value = true;
        tableConfig.tableData.length = 0;
        await handleList(tab.props.name);
    }

    const handleGetNoReadNotify = async (uid?:number)=>{
        let form = {
            uid:uid??userStore.userInfo.id
        }
        await requestNoReadNotice(form).then(res=>{
            let {code,data,msg} = res
            if(code == 200){
                newNum.value = data;
            }
        })
    }
    let name = ref("")
    let client = inject<any>(socketEnum.socket);
    const handleInit = ()=>{
        client.value.handleSocketEvent('enter', enterRoom);
        client.value.handleSocketEvent('enterName', enterNameRoom);
        client.value.handleSocketEvent('name', nameRoom);
        client.value.handleSocketEvent("message",handleMsg)
        client.value.handleSocketEvent("leave",handleLeave)
    }
    /**
     * 离开房间
     * @param res
     */
    const handleLeave = (res: string) => {
        console.log(res,"resresres");
    }
    /**
     * 监听通知公告
     * @param res
     */
    const handleMsg = async (res: string) => {
        let uidArr = res.indexOf(",")>=0?res?.split(","):[res]
        let uid = userStore.userInfo.id;
        //数组中有该uid，进行通知，请求数据
        if(uidArr.includes(uid+"")){
            await handleGetNoReadNotify(uid)
        }
    }
    let list = reactive<any>([])
    /**
     * 进入房间
     */
    const enterRoom = (data) => {
        list.push({
            type: 'enter',
            name: data.name
        })
    }

    /**
     * 进入房间时的用户名称
     */
    const enterNameRoom = (data) => {
        console.log(data,"datadata")
        name.value = data
    }

    /**
     * 修改名称
     */
    const nameRoom = (data) => {
        console.log(data,"enterNameRoomenterNameRoom");
        name.value = data
        model.handleMsg(`成功修改名称为${name}`,"success")
    }

    /**
     * 查看消息通知详细内容
     */
    const handleDetail = (val:any,noticeDetailDialogRef:any)=>{
        noticeDetailDialogRef.handleOpenDialog(val);
        popoverRef.value.hide()
    }
    const handleCloseDialog = async ()=>{
        loading.value = true
        await handleList()
        await handleGetNoReadNotify()
        loading.value = false
    }
    onMounted(async ()=>{
        handleInit()
        await handleGetNoReadNotify();//获取未读信息
    })

    return {
        handleCloseDialog,dicts,handleDict,handleShowMsg,activeName,handleTabClick,handleTableSelectionChange,handleList,handleSizeChange,handleCurrentChange,handleDetail,
        settingStore,dialogShow,dialogTitle,pageConfig,tableConfig,loading,newNum
    }
}
