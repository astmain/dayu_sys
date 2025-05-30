/*- coding = utf-8 -*-
@Time : 2023/4/6 13:56
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/


import { getRememberUsername, getRememberPwd, getRemember } from "@/utils/storage";
import {resInterface} from "@/commonNetwork/index";
import {ElForm, FormRules} from "element-plus";
import {handleGetCurInstance, handleProEnvToIt} from "@/utils/utils";
import FormList from "@/components/formList";
import {useBgmMeteor} from "@/views/login/hooks/useBgmMeteor";
import {useStore} from "@/store/piniaAutoImport";
import {onMounted, reactive, ref, watch} from "vue";
import $ from "jquery";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import {useUserSources} from "@/views/login/hooks/useUserSources";
import {requestRandomAccountLogin} from "@/network/login/index";
import baseInfo from "@/utils/config";
import {userTypeEnum} from "@/utils/enum";
import PicCode from "@/components/picCode";
import {debounce, throttle} from "@/utils/lodash";


export const useFunc = () =>{
    let userStore = useStore("useUser")
    let appStore = useStore("useApp")
    let {globalLoading} = storeToRefs(appStore)

    interface formModelInterface{
        username:string,
        password: string,
        rememberMe: boolean,
        code: string,
        uuid: string,
    }
    interface registerFormInterface{
        userName:string,
        password: string,
        phoneNumber: string,
        rememberMe: boolean,
    }
    const router = useRouter() as any
    let {model,i18n,globalProperties} = handleGetCurInstance()
    let settingStore = useStore("useSetting")
    let redirect = ref<string|null>("")
    let formRef = ref<InstanceType<typeof FormList>>()
    let formRegisterRef = ref<InstanceType<typeof ElForm>>()
    let countNum = ref<number>(20)
    let isShowLogin = ref<boolean>(true)
    let isShowSendSms = ref<boolean>(true)
    let isShowReSend = ref<boolean>(false)
    let captchaOnOff = ref<boolean>(true)
    let isShowPutSms = ref<boolean>(false)
    let loading = ref<boolean>(false)
    let formModel = ref<formModelInterface>({
        username: getRememberUsername(),
        password: getRememberPwd(),
        rememberMe: getRemember(),
        code: "",
        uuid: "",
    })
    const code = ref("vueCms");
    const picCodeRef = ref<InstanceType<typeof PicCode>>();
    const formRules = reactive<FormRules>({
        username: [{
            required: true,
            trigger: 'blur' ,
            message: '请输入账号'
        }],
        password: [{
            required: true,
            trigger: 'blur' ,
            message: '请输入密码'
        }],
    })
    let registryForm = reactive<registerFormInterface>({
        userName: "",
        password: "",
        phoneNumber: "",
        rememberMe: false,
    })
    const registryRules = reactive<FormRules>({
        userName: [{
            required: true,
            trigger: 'blur' ,
            message: '用户名不能为空'
        }],
        password: [{
            required: true,
            trigger: 'blur' ,
            message: '密码不能为空'
        }],
        phoneNumber: [{
            required: true,
            trigger: 'blur' ,
            message: '短信验证码不能为空'
        }],
    })

    const handleSubmitLoginForm = async (formRef): Promise<void> => {
        if(code.value.toLowerCase()!=formModel.value.code.toLowerCase()){
            picCodeRef.value.handleRefresh();
            model.handleMsg(`验证码错误`,"warning")
            return;
        }
        await formRef.validate(async (valid: any, fields: any) => {
            if (valid) {
                appStore.handleSwitchGlobalLoading(true)
                let {username,password,rememberMe} = formModel.value;
                userStore.LoginNoCode({username,password,rememberMe,userType:userTypeEnum.formalType}).then((res:resInterface)=>{
                    let {data,code,message} = res;
                    if(code!=200){
                        model.handleMsg(`${message}`,"warning")
                        appStore.handleSwitchGlobalLoading(false)
                        return false;
                    }else{
                        model.handleNotificationClose()
                        router.push({path:redirect || "/"})
                    }
                }).catch((err: any)=>{
                    model.handleMsg(`${err.message}`,"warning")
                    appStore.handleSwitchGlobalLoading(false)
                })
            } else {
                console.log('error submit!')
                return false
            }
        })
    }

    const resetForm = (formRef: any) => {
        formRef.resetFields()
    }

//发送短信
    const handleSendSms = ()=>{
        model.handleMsg(`开发中`, "warning")
        // this.isShowReSend = false;
        // if (!this.registryForm.phoneNumber) {
        //   this.msgInfo("请输入手机号码!");
        // } else {
        //   this.isShowSendSms = false;
        //   this.isShowPutSms = true;
        //   // 发送注册码
        //   toSendRegistrySms({ phone: this.registryForm.phoneNumber }).then(
        //       (res) => {
        //         this.msgSuccess("验证码已发送，请注意查收!");
        //         this.sms = res.sms;
        //         console.log(res);
        //       }
        //   );
        //
        //   // 倒计时
        //   let timer = setInterval(() => {
        //     if (this.countNum > 0) {
        //       this.countNum--;
        //     } else if (this.countNum === 0) {
        //       this.isShowPutSms = false;
        //       this.countNum = 20;
        //       this.isShowReSend = true;
        //     }
        //   }, 1000);
        // }
    }

    const handleSubmitRegisterForm = ()=>{
        // if (this.smsCode === this.sms) {
        //   console.log(this.registryForm);
        //   if (!this.registryForm.userName) {
        //     this.msgInfo("请输入账号注册!");
        //   } else if (!this.registryForm.password) {
        //     this.msgInfo("请输入密码注册!");
        //   } else if (!this.smsCode) {
        //     this.msgInfo("请输入短信验证码!");
        //   } else if (
        //       this.registryForm.userName &&
        //       this.registryForm.password &&
        //       this.smsCode
        //   ) {
        //     registry(this.registryForm).then((res) => {
        //       if (res) {
        //         this.msgSuccess("新用户注册成功!");
        //         this.isShowLogin = true;
        //       }
        //     });
        //   }
        // } else {
        //   this.msgInfo("请输入正确的手机注册码");
        // }
    }
    //随机生成账号登录
    const handleRandomAccountLogin = ()=>{
        appStore.handleSwitchGlobalLoading(true)
        let commonData = Math.floor(Math.random() * 100000).toFixed(0)
        let username = "vueCms_xg"+commonData
        let password = baseInfo.ItemUrl+"/"+commonData
        let form = {
            userType:userTypeEnum.testType,
            username,
            password,
        }
        userStore.TestLoginNoCode(form).then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                appStore.handleSwitchGlobalLoading(false)
                return false;
            }else{
                model.handleNotificationClose()
                router.push({path:redirect || "/"})
            }
        }).catch((err: any)=>{
            appStore.handleSwitchGlobalLoading(false)
        })
    }
    watch(()=>router.currentRoute.value.path,()=>{
        redirect = router.currentRoute.value.query && router.currentRoute.value.query.redirect
    },{immediate:true,deep:true})
    const handleNotice = ()=>{
        let msg = '<div class="login-notify-content">\n' +
            '<div><a style="color:red;font-weight: bold" href="https://gitee.com/derekgo/vue-cms_xg" target="_blank">请注意该项目只是演示环境，部分权限暂不开放。如果想要展示所有功能，需要你进入gitee仓库clone使用才有</a></div>'+
            '<div >因token设置有效时间，所以会遇到token失效、退出登录的情况</div>'+
            '          <div class="margin-top-10">\n' +
            '            <p>后台帐号：<br/>' +
            '<span style="margin-right:10px"><b>vueCms1</b></span><span style="margin-right:10px"><b>vueCms2</b></span><span style="margin-right:10px"><b>vueCms3</b></span></p>\n' +
            '          </div>\n' +
            '          <p>后台密码：<br/>' +
            '<span style="margin-right:10px;color:#f56c6c"><b>vueCms1</b></span><span style="margin-right:10px;color:#f56c6c"><b>vueCms2</b></span><span style="margin-right:10px;color:#f56c6c"><b>vueCms3</b></span></p>\n' +
            '        </div>'
        let otherOptions = {
            dangerouslyUseHTMLString: true,
            position: 'bottom-right',
            duration:0
        }
        model.handleNotification(msg,"warning",'提示',otherOptions)
    }
    handleNotice()
    let {handleInitMeteor} = useBgmMeteor()

    $(document).ready(function(){
        handleInitMeteor()
    });

    let {handleInitWebUrl} = useUserSources()
    handleProEnvToIt(()=>{
        handleInitWebUrl().then(r => r)
    })

    window.addEventListener("resize",debounce(throttle(()=>{
            let notify =document.getElementById("notification_1") as any
            if(document.documentElement.clientWidth<baseInfo.PhoneWidth && notify){
                notify.style.display="none"
            }else{
                notify.style.display="block"
            }
        },1000))
    )

    return {
        globalLoading,settingStore,formRef,formRegisterRef,countNum,isShowLogin,isShowSendSms,isShowReSend,captchaOnOff,isShowPutSms,loading,formModel,
        code,picCodeRef,formRules,registryForm,registryRules,handleSubmitLoginForm,resetForm,handleSendSms,handleSubmitRegisterForm,handleRandomAccountLogin
    }
}
