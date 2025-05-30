//*- coding = utf-8 -*-
//@Time : 2023-03-30 0:53
//@Author : 沉默小管
//@File : index.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {resInterface} from "@/commonNetwork/index";
import {requestMenuList} from "@/network/system/menuList";
import {reactive, ref} from "vue";

export const useClass = (model) =>{
    let dicts = reactive({
        sysSwitches:""
    })
    const handleDict = async (dict:any)=>{
        let {sys_switches}=await dict("sys_switches")
        dicts.sysSwitches=sys_switches??[]
        return true;
    }
    let menuOptions = ref([])
    let defaultProps = ref({
        children: "children",
        label: "name"
    })
    // 数据处理 递归获取名称和数量
    const handleGetName = (data) => {
        return data.map(v => {
            return {
                label: `${v.menuName}`,
                name: v.menuName,
                id: v.id,
                children: v.children?.length ? handleGetName(v.children) : null
            }
        })
    }

    //菜单栏列表
    const handleMenuList = async ()=>{
        return await requestMenuList().then((res:resInterface)=>{
            let {data,code,message} = res;
            if(code!=200){
                model.handleMsg(`${message}`,"warning")
                return false;
            }
            menuOptions.value = handleGetName(data)
            return true;
        }).catch((err: any)=>{
            console.log(err);
            return false;
        })
    }
    return {
        handleMenuList,handleDict,dicts,menuOptions,defaultProps
    }
}
