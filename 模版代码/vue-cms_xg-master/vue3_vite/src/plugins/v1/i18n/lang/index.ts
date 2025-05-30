/*- coding = utf-8 -*-
@Time : 2023/4/4 17:31
@Author : 沉默小管
@File : index.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/


import {enLocale} from "@/plugins/i18n/lang/en";
import {zhLocale} from "@/plugins/i18n/lang/zh";

export const messages = {
    en: {
       ...enLocale
    },
    zh: {
       ...zhLocale
    }
}