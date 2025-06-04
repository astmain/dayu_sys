// 自定义
import {conf} from "./conf"
import {swagger} from "./swagger"
import {cors} from "./cors"
import {files_static} from "./files_static"
import {filter_error_sys} from "./filter_error_sys"
import {filter_error_dto} from "./filter_error_dto"
import {filter_error_prisma} from "./filter_error_prisma"

// 配置:函数
export const Config = {
    conf,
    swagger,
    cors,
    filter_error_sys,
    filter_error_dto,
    filter_error_prisma,
    // files_static: require("./files_static").default,
    files_static,

}