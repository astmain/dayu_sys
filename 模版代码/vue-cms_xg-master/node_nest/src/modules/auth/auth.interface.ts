//*- coding = utf-8 -*-
//@Time : 2022-11-13 11:49
//@Author : 沉默小管
//@File : auth.interface.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
interface userInterface {
  id:number,
  username:string,
  expireTime?:string,//过期时间
  ip:string,
}
