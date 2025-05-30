<!--
*- coding = utf-8 -*-
#@Time : 2023-10-14 12:03
#@Author : 管茂良
#@File : index.vue
#@web  : www.php-china.com
#@Software: WebStorm
-->
<template>
    <div class="u-f u-f-ac u-f-ajc" style="width: 100%;height:100vh">
        <template v-if="isOauth">
            <el-result
                    icon="success"
                    title="授权成功,跳转中..."
            >
            </el-result>
        </template>
        <template v-else>
            <el-result
                    icon="error"
                    title="授权失败"
            >
            </el-result>
        </template>
    </div>
</template>

<script setup lang="ts">
    import {useRoute,useRouter} from "vue-router";
    import {requestGiteeLogin} from "@/network/common/oauthPage";
    import {setToken, setUserId, setUsername} from "@/utils/storage";
    import {handleGetCurInstance} from "@/utils/utils";
    import {ref,onMounted} from "vue"
    import {useStore} from "@/store/piniaAutoImport";
    let route = useRoute()
    let router = useRouter()
    let query = route.query;
    let {model} = handleGetCurInstance()
    let isOauth = ref(true)
    let userStore = useStore("useUser")
    let viteWebBaseUrl = import.meta.env.VITE_WEB_BASE_URL;
    onMounted(()=>{
        let {code} = query;
        let form = {
            uid:userStore.userInfo.id,
            token:userStore.token,
            code
        }
        requestGiteeLogin(form).then(res=>{
            let {data,code,message} = res;
            if(code==200){
                setToken(data.token)
                setUserId(data.id)
                setUsername(data.username)
                if(data.isBind){
                    opener.postMessage({
                        isClose:true
                    },viteWebBaseUrl)
                    setTimeout(()=>{
                        window.close()
                    },1000)
                }else{
                    window.location.href="/"
                }
            }else{
                model.handleMsg(message,"warning")
                isOauth.value =false;
                setTimeout(()=>{
                    window.close()
                },1000)
            }
        })
    })
</script>

<style scoped lang="less">

</style>