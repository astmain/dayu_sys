import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ParseArrayPipe} from '@nestjs/common/pipes/parse-array.pipe';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import {PrismaClient} from "@prisma/client";
import tool from "../tool";
import {DTO_role_id_menu_permiss} from "../DTO/DTO_role_id_menu_permiss";


let db = new PrismaClient()


@ApiTags('菜单管理')
@ApiBearerAuth('Authorization')
@Controller("menu")
export class menu {


    @tool.Get_form("find_menu_tree", "菜单树_列表", [])
    async find_role_list(@Query() form) {

    }





}



