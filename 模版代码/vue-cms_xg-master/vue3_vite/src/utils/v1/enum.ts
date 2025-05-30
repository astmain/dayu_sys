/*- coding = utf-8 -*-
@Time : 2023/8/14 15:57
@Author : 管茂良
@File : enum.ts
@web  : www.php-china.com
@Software: WebStorm
*/

const enum socketEnum{
    socket = "websocketClient"
}
const enum userTypeEnum{
    testType = 1,
    formalType = 2
}

//权限枚举
const enum permsEnum {
    adminPerms = "admin",
    testPerms = "test"
}

const enum sysConfigEnum {
    baseSetting = "BASE_SETTING",
    qqEmail = "QQ_EMAIL",
    aliEmail = "ALI_EMAIL",
    txEmail = "TX_EMAIL",
    aliTextMsg = "ALI_TEXT_MSG",
    txTextMsg = "TX_TEXT_MSG",
    localFile = "LOCAL_FILE",
    qiNiuYunFile = "QI_NIU_YUN_FILE",
    giteeLoginConfig = "GITEE_LOGIN_CONFIG",
    qqLoginConfig = "QQ_LOGIN_CONFIG",
}

export {permsEnum,userTypeEnum,socketEnum,sysConfigEnum}
