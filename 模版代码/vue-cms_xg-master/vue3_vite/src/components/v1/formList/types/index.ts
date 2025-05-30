/*- coding = utf-8 -*-
@Time : 2023/3/23 11:44
@Author : 沉默小管
@File : useClass.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

type formType = 'slot' | 'input' | 'password' | 'email' | 'select' | 'datePicker' | 'radio' | 'text' | 'cascader'

//如果你选择了datePick需要选以下类型
type dataPickType = 'daterange' | 'datetimerange' | 'datetime' | 'dates'

type placementType = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
interface tooltipOptionsInterface {
    content:string
    placement?:placementType
    otherOptions?:any
}

export interface formItem {
    type: formType,
    dataPickType?:dataPickType
    tooltipOptions?:tooltipOptionsInterface,
    prop: string
    label?: string
    width?: string
    span?: number
    placeholder?: string
    isHidden?: boolean
    clearable?: boolean
    filterable?: boolean
    // 针对select
    options?: any[]
    props?: object
    // 针对特殊的属性 el-form-item 内组件
    otherOptions?: any
    // 针对特殊的属性 el-form-item
    formItemOtherOptions?: any
}
type sizeType = "small" | "default" | "large"
export interface formInterface{
    formItems?: formItem[]
    isHiddenBtn?: boolean
    isCustomBtn?: boolean
    inline?: boolean
    btnSpan?: number
    labelWidth?: string
    labelPosition?: 'left' | 'right' | 'top' | undefined
    rules?: object
    style?:object
    size?:sizeType
}