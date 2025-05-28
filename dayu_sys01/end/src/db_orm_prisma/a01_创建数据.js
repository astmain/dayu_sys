let {PrismaClient} = require("@prisma/client")
let prisma = new PrismaClient()


async function make() {
    await require("./先清空重置数据库")()
    await require("./菜单数据菜单")()


    let tb_depart = [
        {id: 1, name: "大宇三维打印",}, //总公司
        {id: 10000, name: "客户", parent_id: 1},  //客户
        {is_depart: false, name: "vip1", id: 1000091, parent_id: 10000,},
        {is_depart: false, name: "vip2", id: 1000092, parent_id: 10000,},

        {id: 20000, name: "技术部", parent_id: 1},  //技术部
        {is_depart: false, name: "主管", id: 2000091, parent_id: 20000,},
        {is_depart: false, name: "职员", id: 2000092, parent_id: 20000,},
        //
        {id: 30000, name: "泉州分公司", parent_id: 1},//泉州分公司
        {id: 30001, name: "财务部", parent_id: 30000},//财务部
        {is_depart: false, name: "主管", id: 3000191, parent_id: 30001,},
        {is_depart: false, name: "职员", id: 3000192, parent_id: 30001,},
        {id: 30002, name: "业务部", parent_id: 30000},//业务部
        {is_depart: false, name: "主管", id: 3000291, parent_id: 30002,},
        {is_depart: false, name: "职员", id: 3000292, parent_id: 30002,},
        //
        {id: 40000, name: "德化分公司", parent_id: 1},//德化分公司
        {id: 40001, name: "财务部", parent_id: 40000},//财务部
        {is_depart: false, name: "主管", id: 4000191, parent_id: 40001,},
        {is_depart: false, name: "职员", id: 4000192, parent_id: 40001,},
        {id: 40002, name: "业务部", parent_id: 40000},//业务部
        {is_depart: false, name: "主管", id: 4000291, parent_id: 40002,},
        {is_depart: false, name: "职员", id: 4000292, parent_id: 40002,},
    ]
    await prisma.tb_depart.createMany({data: tb_depart})


    let tb_user = [
        {id: 1, username: '许鹏', tel: '111',},
        {id: 2, username: '二狗', tel: '222',},
        {id: 3, username: '张三', tel: '333',},
        {id: 4, username: '李四', tel: '444',},
        {id: 5, username: '王五', tel: '555',},
        {id: 6, username: '赵六', tel: '666',},
        {id: 7, username: '孙七', tel: '777',},
    ]

    await prisma.tb_user.createMany({data: tb_user})


    await prisma.tb_user.update({
        where: {id: 1},
        data: {tb_depart: {connect: [{id: 2000091},{id: 2000092}]      /*分配部门*/    }}
    })

    await prisma.tb_user.update({
        where: {id: 2},
        data: {tb_depart: {connect: [{id: 2000092}]      /*分配部门*/    }}
    })


    console.log('数据初始化完成');
    // 帮我用 prisma 创建数据库表关系  .   用户表,部门表,角色表.      用户表 关联 角色表.   用户表 关联 部门表.      部门表 关联 角色表.
}

make()