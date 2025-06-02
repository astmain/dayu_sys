import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, Inject} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ParseArrayPipe} from '@nestjs/common/pipes/parse-array.pipe';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";

import tool from "../tool";
import {json} from "express";

let children5 = {
    include: {
        // children==============
        children: {
            include: {
                children: {
                    include: {
                        children: {
                            include: {

                                children: {
                                    include: {

                                        children: true,
                                    }
                                }
                            }
                        }
                    }

                }
            }
        },

    }
}


@ApiTags('部门管理')
@ApiBearerAuth('Authorization')
@Controller("depart")
export class depart {
    constructor(@Inject("db_prisma") private db: any,) {
    }

    @tool.Dec_public()
    @tool.Get_form("find_departs_tree", "/查询_部门树", [{desc: "部门id", key: 'id', val: 0, type: Number, required: true}])
    async find_departs_tree(@Query() form) {
        form.id = Number(form.id)
        console.log(`form`, form)
        let departs_tree = await this.db.tb_depart.findMany({where: {id: 1}, include: {children: children5}})

        // console.log(`111---departs_tree:`, departs_tree)

        // let departs_tree = tool.build_tree({arr: tb_depart, key_id: 'id', key_parent: 'parent_id'})
        // departs_tree = departs_tree.filter(o => o.id == form.id)
        return tool.R.ok({msg: "成功/find_departs_tree", result: {departs_tree}})
    }


}



