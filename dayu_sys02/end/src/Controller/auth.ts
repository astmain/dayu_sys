import {Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, ParseIntPipe, Query, UnauthorizedException, UsePipes, ValidationPipe, Inject} from '@nestjs/common';
import {Put, Param, Delete, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';
import {ApiBearerAuth, ApiBody, ApiParam} from '@nestjs/swagger';
// 自定义
import {JwtService} from "@nestjs/jwt";
import {HttpExceptionFilter} from "../config/exception/HttpExceptionFilter";

import {Qgetform} from "../util/Qgetform";
import tool from "../tool";


import {DTO_role_id_menu_permiss} from "../DTO/DTO_role_id_menu_permiss";

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

@ApiTags('权限管理')
@ApiBearerAuth('Authorization')
@Controller("auth")
export class auth {
    constructor(@Inject("db_prisma") private db: any, private jwt_service: JwtService,) {
    }

    @tool.Dec_public()
    @UseFilters(new HttpExceptionFilter())
    @Qgetform("/login", "登陆", [{desc: "电话", key: 'tel', val: "111", type: String, required: true}, {desc: "密码", key: 'password', val: "123456", type: String, required: true}],)
      async login(@Query() form) {
        console.log(`login---tel:`, form)
        // 1.查询用户校验密码
        let user = await this.db.tb_user.findUnique({where: {tel: form.tel}})
        console.log(`111---user:`, user)
        let password_encode = tool.crypt_encode_md5(form.password)

        console.log(`login---password_encode:`, password_encode) //todo 数据库密码方案使用md5加密
        if (user?.password !== form.password) {
            throw new UnauthorizedException()
        }
        // 2.生成token
        const payload = {username: user?.username, id: user?.id};
        const token = await this.jwt_service.signAsync(payload)
        console.log(`生成token:`, token)
        // 菜单树
        // let menus_tree = await this.db.tb_menu.findMany({include: {children: true},})

        // 菜单树
        let tb_menu = await this.db.tb_menu.findMany()
        tb_menu = tb_menu.map(o => {
            if (o.parent_id === null) o.parent_id = 0
            return o
        })
        const menus_tree = tool.build_tree({arr: tb_menu, key_id: 'id', key_parent: 'parent_id'})
        return tool.R.ok({msg: "成功/login", result: {...user, token, menus_tree}})
    }


    @tool.Get_form("find_depart_role_tree", "/查询_部门_角色_树", [])
    async find_permiss_depart_position_tree(@Query() form) {
        let depart_position_tree = await this.db.tb_depart.findMany({where: {id: 1}, include: {children: children5}})
        return tool.R.ok({msg: "成功/find_depart_role_tree", result: {depart_position_tree: depart_position_tree}})
    }

    @tool.Get_form("find_permiss_menu_tree", "查询_菜单树权限", [{desc: "部门id其实就是职位", key: 'depart_id', val: 1, type: Number, required: true}])
    async find_permiss_menu_tree(@Query() form) {
        form.depart_id = Number(form.depart_id)
        console.log(`111---form:`, form)

        let menu_list = await this.db.tb_menu.findMany()
        console.log(`111---222:`,     menu_list        )
        let tb_permiss = await this.db.tb_permiss.findMany({where: {depart_id: form.depart_id}})
        console.log(`111---tb_permiss:`,     tb_permiss        )
        let menu_list_permiss: any = []
        for (let i = 0; i < menu_list.length; i++) {
            let menu = JSON.parse(JSON.stringify(menu_list[i]))
            let permiss = tb_permiss.find(o => o.menu_id === menu.id    && o.depart_id===form.depart_id)
            if(!permiss){
                menu_list_permiss.push(menu)
            }else{
                menu['create'] = permiss.create
                menu['delete'] = permiss.delete
                menu['update'] = permiss.update
                menu['find'] = permiss.find
                menu['view'] = permiss.view
                menu_list_permiss.push(menu)
            }
        }
        let menu_tree_permiss = tool.build_tree({arr: menu_list_permiss, key_id: 'id', key_parent: 'parent_id'})
        return tool.R.ok({msg: "成功/find_permiss_menu_tree", result: {menu_tree_permiss}})
    }


    @tool.Dec_public()
    @ApiOperation({summary: '角色-保存'})
    @Post("/role_save")
    async role_save(@Body() form: DTO_role_id_menu_permiss) {
        console.log(`111---form:`, form)
        await this.db.tb_depart.update({where: {id: form.depart_id}, data: {name: form.name}})
        let menu_list_flat = tool.build_tree_arr_flat(form.tree_data) //扁平化数据
        // console.log(`111---menu_list_flat:`,     menu_list_flat        )
        for (let i = 0; i < menu_list_flat.length; i++) {
            let menu = menu_list_flat[i]
            let one = await this.db.tb_permiss.findMany({where: {menu_id: menu.id, depart_id: form.depart_id}})
            console.log(`111---one.length:`, one.length)
            if (one.length >= 1) {
                let data = {
                    create: menu.create,
                    delete: menu.delete,
                    update: menu.update,
                    find: menu.find,
                    view: menu.view
                }
                // 应该是update   ,但是先使用updateMany
                await this.db.tb_permiss.updateMany({where: {menu_id: menu.id, depart_id: form.depart_id}, data: data})
            } else {
                let data = {
                    menu_id: menu.id,
                    depart_id: form.depart_id,
                    create: menu.create,
                    delete: menu.delete,
                    update: menu.update,
                    find: menu.find,
                    view: menu.view
                }
                await this.db.tb_permiss.create({data: data})
            }

        }



        return tool.R.ok({msg: "成功/role_save", result: {}})
    }







    // 组织=========================================================================================
    @tool.Get_form("depart_create", "新增_组织", [{desc: "组织名称", key: 'depart', val: "", type: String, required: true}, {desc: "父id", key: 'parent_id', val: "", type: Number, required: true}])
    async depart_create(@Query() form) {

    }

    @tool.Get_form("depart_delete", "删除_组织", [{desc: "组织id", key: 'id', val: 0, type: Number, required: true}])
    async delete_depart(@Query() form) {

    }


    @tool.Get_form("depart_update", "更新_组织", [{desc: "组织id", key: 'id', val: 0, type: Number, required: true}, {desc: "组织名称", key: 'name', val: 0, type: String, required: true}])
    async depart_update(@Query() form) {

    }


    // 角色======================================================================================
    @tool.Get_form("role_create", "新增_职位", [{desc: "职位名称", key: 'name', val: "", type: String, required: true}, {desc: "部门id", key: 'id', val: "", type: Number, required: true}])
    async role_create(@Query() form) {

    }




    @tool.Get_form("role_delete", "删除_角色", [{desc: "职位id", key: 'id', val: 0, type: Number, required: true}])
    async role_delete(@Query() form) {

    }

}

