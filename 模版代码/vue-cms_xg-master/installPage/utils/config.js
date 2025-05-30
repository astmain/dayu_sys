/*- coding = utf-8 -*-
@Time : 2023/9/16 11:41
@Author : 管茂良
@File : config.ts
@web  : www.php-china.com
@Software: WebStorm
*/

let port = 3002

//redis默认配置
let redisConfig = {
    host:"127.0.0.1",
    port:6379,
    pwd:"vuecms",
}
//mysql默认配置
let mysqlConfig = {
    host:"127.0.0.1",
    port:3306,
    user:"root",
    password:"root",
    database:"g_vuecms_xg",
    multipleStatements:true,
}

let data = {
    port,
    redisConfig,
    mysqlConfig,
}
module.exports=data
