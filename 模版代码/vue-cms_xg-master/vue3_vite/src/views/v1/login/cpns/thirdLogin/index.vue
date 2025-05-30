<!--
*- coding = utf-8 -*-
#@Time : 2023-10-14 22:02
#@Author : 管茂良
#@File : index.vue
#@web  : www.php-china.com
#@Software: WebStorm
-->
<template>
    <div style="width:100%">
        <el-divider content-position="center">其他登录方式</el-divider>
        <div class="u-f u-f-ac u-f-ajc" style="width:100%">
            <el-space wrap :size="'default'">
                <div class="u-f u-f-ac u-f-ajc" style="cursor:pointer" @click="handleToLogin('qq')">
                    <SvgIcon :size="'20px'" style="color:#79bbff" :iconClass="'qq'" />
                </div>
                <div class="u-f u-f-ac u-f-ajc" style="cursor:pointer" @click="handleToLogin('gitee')">
                    <SvgIcon :size="'20px'" :iconClass="'gitee'" />
                </div>
            </el-space>
        </div>
    </div>
</template>

<script setup lang="ts">
    //第三方登录
    import {requestIsExistSysConfig} from "@/network/login";
    import {handleGetCurInstance} from "@/utils/utils";
    import {useStore} from "@/store/piniaAutoImport";
    let {model} = handleGetCurInstance()
    let appStore = useStore("useApp")
    const handleToLogin = (type:string)=>{
        let url = import.meta.env.VITE_WEB_URL;
        appStore.handleSwitchGlobalLoading(true)
        let form = {
            type
        }
        requestIsExistSysConfig(form).then(res=>{
            let {code,data,message} = res;
            if(code == 200){
                if(type=='qq'){
                    //请求
                    window.location.href=url+"user/oauth/qq"
                }else if(type=="gitee"){
                    //请求
                    window.location.href=url+"user/oauth/gitee"
                }
            }else{
                appStore.handleSwitchGlobalLoading(false)
                model.handleMsg(`${message}`,"warning")
                return;
            }
        }).catch(err=>{
            console.log(err,"22222222");
        })
    }
</script>

<style scoped lang="less">

</style>