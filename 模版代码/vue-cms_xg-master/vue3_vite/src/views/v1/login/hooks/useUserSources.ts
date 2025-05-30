/*- coding = utf-8 -*-
@Time : 2023/7/23 15:18
@Author : 管茂良
@File : useUserSources.ts
@web  : www.php-china.com
@Software: WebStorm
*/

import {requestObtainUserSources} from "@/network/login";
import {Base64} from "js-base64"

export const useUserSources = () =>{
    //统计用户来源
    const handleStatisticalUserSources = async (webUrl)=>{
        let form = {
            webUrl:Base64.encode(webUrl),
        }
        await requestObtainUserSources(form)
    }
    const handleInitWebUrl = async () => {
        let referrer = document.referrer
        referrer = referrer.split('?')[0]
        let webUrl = ""
        if(referrer){
            if(referrer.indexOf("http://")>=0){
                webUrl = referrer.split("http://")[1]
            }else if(referrer.indexOf("https://")>=0){
                webUrl = referrer.split("https://")[1]
            }
            webUrl = webUrl.slice(webUrl.length - 1, webUrl.length) == "/"?webUrl.slice(0,webUrl.length-1):webUrl
            await handleStatisticalUserSources(webUrl)
        }

    }
    return {
        handleInitWebUrl
    }
}
