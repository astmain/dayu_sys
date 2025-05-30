//*- coding = utf-8 -*-
//@Time : 2024-05-21 8:57
//@Author : 管茂良
//@File : index.js
//@web  : www.php-china.com
//@Software: WebStorm

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import {App} from "vue"
export default (app:App)=>{
    app.use(ElementPlus)
}