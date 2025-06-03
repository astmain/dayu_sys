// 自定义
import {conf} from "./conf"
import {swagger} from "./swagger"
import {cors} from "./cors"
import {files} from "./files"

import {useStaticAssets} from "./useStaticAssets"
import {filter_error_sys} from "./filter_error_sys"
import {filter_error_dto} from "./filter_error_dto"
import {filter_error_prisma} from "./filter_error_prisma"

export const Config = {
    conf,
    swagger,
    cors,
    files,
    filter_error_sys,
    filter_error_dto,
    filter_error_prisma,
    useStaticAssets,

}