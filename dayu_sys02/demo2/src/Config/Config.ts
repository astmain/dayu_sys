// 自定义
import {ApiPost} from "@Config/ApiPost"
import {swagger_Knife4j} from "@Config/swagger_Knife4j"
import {filter_error_sys} from "@Config/filter_error_sys"
import {filter_cors} from "@Config/cors"
import {filter_error_dto} from "@Config/filter_error_dto"

// 配置:函数
export const Config = {
    swagger_Knife4j,
    filter_cors,
    filter_error_sys,
    filter_error_dto,
    ApiPost,

}