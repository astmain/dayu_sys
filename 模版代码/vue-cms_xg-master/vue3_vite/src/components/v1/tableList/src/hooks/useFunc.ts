/*- coding = utf-8 -*-
@Time : 2023/4/2 10:56
@Author : 沉默小管
@File : useFunc.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {ref} from "vue";
import {useStore} from "@/store/piniaAutoImport";

export const useFunc = (tableRef, emit, props)=>{
    const appStore:any = useStore("useApp")
    /**
     * 设置滚动条到顶部的距离
     */
    const handleSetScrollTop = (topNum=0)=>{
        tableRef.value.setScrollTop(topNum)
    }
    /**
     * 清空选中的table
     */
    const handleClearSelection = ()=>{
        tableRef.value.clearSelection()
    }

    //修改当前页面条数
    const handleSizeChange = (val: number)=>{
        emit("handleSizeChange",val);
    }
    //修改当前页数
    const handleCurrentChange = (val: number) => {
        emit("handleCurrentChange",val);
    }

    //table中列表选中项
    const toggleRowSelection = (row: any)=>{
        tableRef.value.toggleRowSelection(row,true)
    }

    const handleGetHeight = ()=>{
        let topHeight = props.topHeight??0;//窗口顶层的高度
        let marginAndPaddingHeight = 25
        let pageHeight = !props.pageConfig.isPageShow?50:0;
        let fullHeight = document.documentElement.clientHeight+pageHeight;
        let otherHeight = props.tableConfig.topStyleClientHeight??document.querySelector(".top-style")?.clientHeight??0-0;//窗口中除了table其他的高度
        props.tableConfig.tableHeight=fullHeight-topHeight-otherHeight-marginAndPaddingHeight-topHeight+(appStore.device=="mobile"?95:0)
        window.addEventListener("resize",()=>{
            let topHeight = props.topHeight;//窗口顶层的高度
            let marginAndPaddingHeight = 25
            let fullHeight = document.documentElement.clientHeight+pageHeight;
            let otherHeight = props.tableConfig.topStyleClientHeight??document.querySelector(".top-style")?.clientHeight??0-0;//窗口中除了table其他的高度
            props.tableConfig.tableHeight=fullHeight-topHeight-otherHeight-marginAndPaddingHeight-topHeight+(appStore.device=="mobile"?95:0)
        })
    }
    const handleScroll = (e) => {
        let {clientHeight,scrollHeight,scrollTop} = e.target

        if(clientHeight+scrollTop >= scrollHeight){
            let total = props.pageConfig.total;
            let pageSize = props.pageConfig.pageSize;
            let currentPage = props.pageConfig.currentPage;
            let maxPage = Math.ceil(total/pageSize)
            if(currentPage<maxPage){
                emit("handleCurrentChange",currentPage+1)
            }
        }
    }
    return {
        handleSetScrollTop,handleClearSelection,handleSizeChange,handleCurrentChange,toggleRowSelection,handleGetHeight,appStore,handleScroll
    }
}