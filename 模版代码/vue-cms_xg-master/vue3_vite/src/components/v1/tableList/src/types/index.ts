//*- coding = utf-8 -*-
//@Time : 2024-04-30 15:44
//@Author : 管茂良
//@File : index.js
//@web  : www.php-china.com
//@Software: WebStorm
import {pageInterface, tableInterface} from "@/components/tableList/types";

export interface propsInterface{
    tableConfig?:tableInterface
    pageConfig?:pageInterface
    tableStyle?:string
    tableClass?:string
    pageStyle?:string
    pageClass?:string              //page页class类
    topHeight?:number              //向上的距离
}

export interface exposeInterface{
    handleSetScrollTop:(num:number)=>void
    toggleRowSelection:(row:any)=>void,
    handleClearSelection:()=>void,
}