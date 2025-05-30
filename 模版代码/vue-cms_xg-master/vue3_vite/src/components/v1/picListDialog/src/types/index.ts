//*- coding = utf-8 -*-
//@Time : 2024-05-20 20:43
//@Author : 管茂良
//@File : index.js
//@web  : www.php-china.com
//@Software: WebStorm

export interface exposeInterface{
    handleOpenDialog:(val: any)=>void
}

export interface choosePicDataInterface{
    id:number,
    picUrl:string
}
export interface propsInterface{
    alignCenter?:boolean//弹出框是否垂直居中
}