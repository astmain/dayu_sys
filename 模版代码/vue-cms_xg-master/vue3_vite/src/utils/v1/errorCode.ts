/*- coding = utf-8 -*-
@Time : 2022/9/25 9:20
@Author : 沉默小管
@File : errorCode.tsx
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/
interface errCodeInterface{
    [key:string]:string
}
const errCode:errCodeInterface = {
    '401': '认证失败，无法访问系统资源',
    '403': '当前操作没有权限',
    '404': '访问资源不存在',
    'default': '系统未知错误，请反馈给管理员'
}
export default errCode;
