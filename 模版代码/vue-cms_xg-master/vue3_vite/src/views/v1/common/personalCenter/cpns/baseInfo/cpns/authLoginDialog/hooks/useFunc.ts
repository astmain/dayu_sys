/*- coding = utf-8 -*-
@Time : 2023/3/30 9:20
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import FormList from "@/components/formList";
import {handleGetCurInstance} from "@/utils/utils";
import {ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";
import {requestUnbindGitee, requestUnbindQQ} from "@/network/common/oauthPage";

export const useFunc = () =>{
    let dialogTitle = ref("")
    let key = ref(0)
    let loading = ref<boolean>(false)
    let dialogShow = ref(false)
    let {model,i18n} = handleGetCurInstance()
    let userStore = useStore("useUser")
    let userInfo = ref()
    let url = import.meta.env.VITE_WEB_URL;
    let viteWebBaseUrl = import.meta.env.VITE_WEB_BASE_URL;
    window.addEventListener('message', async function (e) {
        let {isClose} = e.data;
        if(isClose){
            await userStore.GetInfo().then(res=>{
                userInfo.value = userStore.userInfo;
            })
        }
    },viteWebBaseUrl);

    //授权与解绑
    const handleClickToAuth =(type:string)=>{

        if(type=='qq'){
            if(userInfo.value.isQQAuth){
                model.handleMsgBox('你确定要解绑？',"",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(()=>{
                    let form = {
                        uid:userStore.userInfo.id,
                        token:userStore.token
                    }
                    requestUnbindQQ(form).then(async res=>{
                        await userStore.GetInfo().then(res=>{
                            userInfo.value = userStore.userInfo;
                        })
                    })
                })
            }else{
                //请求
                window.open(url+"user/oauth/qq?uid="+userStore.userInfo.id)
            }

        }else if(type=="gitee"){
            if(userInfo.value.isGiteeAuth){
                model.handleMsgBox('你确定要解绑？',"",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(()=>{
                    let form = {
                        uid:userStore.userInfo.id,
                        token:userStore.token
                    }
                    requestUnbindGitee(form).then(async res=>{
                        await userStore.GetInfo().then(res=>{
                            userInfo.value = userStore.userInfo;
                        })
                    })
                })
            }else{
                //请求
                window.open(url+"user/oauth/gitee?uid="+userStore.userInfo.id)
            }
        }
    }
    const handleCancel = ()=>{
        dialogShow.value =false
        key.value = Math.random();
    }
    //初始化弹出框
    const handleOpenDialog = ()=> {
        dialogTitle.value = "账号关联"
        key.value = Math.random()
        dialogShow.value = true
        userInfo.value = userStore.userInfo;
    }
    return {
        handleOpenDialog,handleCancel,handleClickToAuth,userInfo,dialogShow,loading,dialogTitle,key
    }
}
