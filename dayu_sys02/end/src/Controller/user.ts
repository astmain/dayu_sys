import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, Inject} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ParseArrayPipe} from '@nestjs/common/pipes/parse-array.pipe';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";
import tool from "../tool";
import {Qgetform} from "../util/Qgetform";
import {DTO_role_id_menu_permiss} from "../DTO/DTO_role_id_menu_permiss";
import {DTO_user_create} from "../DTO/DTO_user_create";
import * as _ from 'lodash';


@ApiTags('用户管理')
@ApiBearerAuth('Authorization')
@Controller("user")
export class user {
    constructor(@Inject("db_prisma") private db: any) {
    }

    @Qgetform("find_user_list", "查找_用户列表", [])
    async find_user_list(@Query() form) {

    }

    @tool.Dec_public()
    @tool.Get_form("create_user", "/新增用户", [{desc: "职位ids", key: 'depart_ids', val: [], type: String, required: true}, {desc: "电话", key: 'tel', val: "123", type: String, required: true}, {desc: "用户名", key: 'username', val: "111", type: String, required: true},])
    async create_user(@Query() form) {
        form.depart_ids = JSON.parse(form.depart_ids)
        console.log(`111---form:`, form)

        // 判断手机号码是否被其他用户注册
        let one = await this.db.tb_user.findUnique({where: {tel: form.tel}})
        console.log(`111---one:`, one)
        if (one) return tool.R.err({msg: "失败:手机号码已经被其他用户注册", result: {}})


        //创建新用户并分配关联部门角色
        let depart_ids_list = form.depart_ids.map(o => ({id: o}))
        await this.db.tb_user.create({
            data: {
                username: form.username, tel: form.tel,
                tb_depart: {connect: depart_ids_list}
            },

        })
        return tool.R.ok({msg: "成功/create_user", result: {}})

    }


    @tool.Dec_public()
    @tool.Get_form("update_user", "/更新-用户", [
        {desc: "用户id", key: 'user_id', val: 0, type: Number, required: true},
        {desc: "部门角色ids", key: 'depart_ids', val: [], type: String, required: true},
        {desc: "电话", key: 'tel', val: "123", type: String, required: true},
        {desc: "用户名", key: 'username', val: "111", type: String, required: true},])
    async update_user(@Query() form) {
        form.user_id = Number(form.user_id)
        form.depart_ids = JSON.parse(form.depart_ids)
        console.log(`222---form:`, form)

        let one = await this.db.tb_user.findUnique({where: {tel: form.tel}})
        console.log(`111---one:`, one)
        if (!(one?.id === form.user_id)) return tool.R.err({msg: "失败:手机号码已经被其他用户注册", result: {}})


        let depart_ids_list = form.depart_ids.map(o => ({id: o}))
        console.log(`111---depart_ids_list:`, depart_ids_list)

        await this.db.tb_user.update({
            where: {id: form.user_id},
            // data: {tb_depart: {connect: [{id: 2000092}]      /*分配部门*/    }}
            data: {
                username: form.username,
                tel: form.tel,
                tb_depart: {connect: depart_ids_list}  /*分配部门*/
            }
        })


        return tool.R.ok({msg: "成功", result: {}})
    }


    @Qgetform("delete_user", "删除_用户", [{desc: "用户id", key: 'user_id', val: 0, type: Number, required: true},])
    async delete_user(@Query() form) {
        form.user_id = Number(form.user_id)
        console.log(`111---form:`, form)
        await this.db.tb_user.deleteMany({where: {id: form.user_id}})


        return tool.R.ok({msg: "成功", result: {}})
    }


    @tool.Dec_public()
    @tool.Get_form("find_user_by_depart_id", "/查询_用户_根据部门id", [{desc: "部门id", key: 'depart_id', val: 0, type: Number, required: true}])
    async find_user_by_depart_id(@Query() form) {
        form.depart_id = Number(form.depart_id)
        console.log(`form`, form)
        // let user_list_findUnique = await this.db.tb_depart.findUnique(
        //     {
        //         where: {id: form.depart_id},
        //         include: {tb_user: true}, // 关联查询部门下的所有用户
        //     }
        // )
        // console.log(`111---user_list_findUnique:`, JSON.stringify(user_list_findUnique, null, 2))


        // 要在 Prisma 中查询 generalManagement 部门及其所有子部门，您需要执行递归查询。由于 Prisma 本身不直接支持递归查询，您可能需要使用数据库特定的功能来实现这一点。
        const query = `
            WITH RECURSIVE department_tree AS (SELECT id, name, parent_id
                                               FROM tb_depart
                                               WHERE id = ${form.depart_id}

                                               UNION ALL

                                               SELECT d.id, d.name, d.parent_id
                                               FROM tb_depart d
                                                        INNER JOIN department_tree t ON d.parent_id = t.id)
            SELECT *
            FROM department_tree;
        `;

        const depart_list = await this.db.$queryRawUnsafe(query)
        console.log(`111---depart_list:`, depart_list)
        const depart_ids = depart_list.map(o => o.id)


        let user_list_findMany = await this.db.tb_depart.findMany(
            {
                where: {id: {in: depart_ids}},
                include: {tb_user: true}, // 关联查询部门下的所有用户
            }
        )
        console.log(`user_list_findMany---user_list_findMany:`, 333)
        let user_list = _.uniqBy(_.flatMap(user_list_findMany, 'tb_user'), 'id') //lodash从prisma的findMany结果中获取所有用户
        for (let i = 0; i < user_list.length; i++) {
            let user = user_list[i]
            // console.log(`222---user:`, user)
            let user_depart_obj = await this.db.tb_user.findUnique({where: {id: user.id}, include: {tb_depart: true}})
            // console.log(`222---depart_list:`, JSON.stringify(depart_list, null, 2))
            let depart_ids = user_depart_obj.tb_depart.map(o => o.id)
            user_list[i]['depart_ids'] = depart_ids
        }
        console.log(`111---user_list:`, user_list)
        return tool.R.ok({msg: "成功", result: {user_list}})
    }


}



