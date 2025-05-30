//*- coding = utf-8 -*-
//@Time : 2022-09-11 22:51
//@Author : 沉默小管
//@File : index.jsx
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm

import {App} from "vue"
import hasPower from "./hasPower"
import hasRole from "./hasRole"

const modules = [hasPower,hasRole]

export default (app:App)=>{
    modules.map((val)=>{
        return val(app)
    })
}

