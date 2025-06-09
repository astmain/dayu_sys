// 自定义
import {conf} from "@Config/conf"
import {swagger_Knife4j} from "@Config/swagger_Knife4j"
import {cors} from "@Config/cors"
import {files_static} from "@Config/files_static"
import {filter_error_sys} from "@Config/filter_error_sys"
import {filter_error_dto} from "@Config/filter_error_dto"
import {filter_error_prisma} from "@Config/filter_error_prisma"
import {ApiPost} from "@Config/ApiPost"

// 配置:函数
export const Config = {
    conf,
    swagger_Knife4j,
    cors,
    filter_error_sys,
    filter_error_dto,
    filter_error_prisma,
    // files_static: require("./files_static").default,
    files_static,
    ApiPost,

}