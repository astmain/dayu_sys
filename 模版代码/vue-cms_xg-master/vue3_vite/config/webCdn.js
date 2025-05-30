/*- coding = utf-8 -*-
@Time : 2023/8/24 17:15
@Author : 管茂良
@File : webCdn.js
@web  : www.php-china.com
@Software: WebStorm
*/
//cdn访问失败，重新获取最新cdn

//需要替换的域名
const domains = [
    "lib.baomitu.com",
    "cdn.bootcdn.net/ajax/libs",
    "www.staticfile.org",
    "cdn.baomitu.com",
    "cdn.bytedance.com",
    "www.jsdelivr.com",
    "unpkg.com",
]
//重试次数
const maxRetry = 3;
const retryInfo = {}
window.addEventListener('error',(e)=>{
    //通过标签，判断是脚本爆出的错误
    const tag = e.target
    //什么时候触发脚本加载失败？
    if(tag.tagName === "SCRIPT" && !(e instanceof ErrorEvent)){
        let url = new URL(tag.src)
        if(!retryInfo[url.pathname]){
            retryInfo[url.pathname]={
                time:0,
                nextIndex:0,
            }
        }
        const info = retryInfo[url.pathname]
        if(maxRetry>=info.time){
            url.host = domains[info.nextIndex]
            //阻塞页面后续的加载
            document.write(`<script src="${url.toString()}">\<\/script>`)
            info.time++;
            info.nextIndex = (info.nextIndex+1)%domains.length
        }
    }
},true)
