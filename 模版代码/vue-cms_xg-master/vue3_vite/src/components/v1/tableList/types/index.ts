/*- coding = utf-8 -*-
@Time : 2022/9/23 15:03
@Author : 沉默小管
@File : interface.tsx
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

export interface tableColInterface{
    showType:"col" | "slot" | "render",     // col 普通的列表，slot插槽，render 自定义样式修改
    type?:"selection" | "index" | "expand",  //
    index?:number,
    width?:string | number,                  //对应列的宽度
    label:string,                            //table的字段名
    prop?:string,                            //字段名称 对应列内容的字段名
    fixed?:true | 'left' | 'right',          //列是否固定在左侧或者右侧。 true 表示固定在左侧
    resizable?:boolean,                      //对应列是否可以通过拖动改变宽度
    options?:any,                            //自定义html元素
    slot?:string,                            //自定义插槽名称
    sortable?:boolean,                       //对应列是否可以排序
    showOverflowTooltip?:boolean,            //当内容过长被隐藏时显示 tooltip
    isShow:boolean,                         //是否显示
    otherOptions?:any;              //table columns其他操作
}
export interface tableInterface {
    tableData:any,                  //显示的数据
    tableCol:tableColInterface[],   //Table-column属性数组
    tableSize?:string,              //Table 的尺寸
    topStyleClientHeight?:number,   //topStyle高度
    tableHeight?:number|string,     //设置表格单元、行和列的布局方式
    keyId:string|number,            //行数据的 Key，用来优化 Table 的渲染
    topHeight?:number,              //窗口顶层的高度
    tableStyle?:any;                //table 样式
    tableCellStyle?:any;            //table 列样式
    showSelectColumn?:boolean;      //是否显示多选按钮
    isExpand?:boolean;              //是否打开展开行
    [key:string]:any
}

export interface pageInterface {
    currentPage:number,
    pageSize:number,
    small:boolean,
    disabled:boolean,
    background:boolean,
    layout?:string,
    total:number,
    isPageShow:boolean,
}
