import {Module, Global} from '@nestjs/common';

// 路由模块
import {__test} from './Module/test';
import {__auth} from './Module/auth';
import {__depart} from './Module/depart'
import {__user} from './Module/user'
import {__role} from './Module/role'
import {__menu} from './Module/menu'
import {__mall_order} from './Module/mall_order'


//测试模块
import {appController} from './app.Controller'
import {Service_test} from './Service/Service_test'
import {Service_app} from './Service/Service_app'

//全局模块
import {global_module} from "./Module/global_module";
// import {orm} from "./Module/orm";
import {db_prisma} from "./db_orm_prisma/db_prisma";
import {db_all} from "./db_orm_prisma/db_all";

// 资源文件模块
import {file_upload_Module} from "./Controller/file_upload/file_upload_Module";
// import {config_static} from "./config_static";


import {tool_Module} from "./tool/tool_Module";
import {tools_Module} from "./tools/tools_Module";
import {goods_car_Module} from "./Controller/goods_car/goods_car_Module";

@Module({

    imports: [
        // config_static,
        //测试模块
        __test,

        __auth,
        __depart,
        __user,
        __role,
        __menu,
        __mall_order,
        // 资源文件模块
        file_upload_Module,
        goods_car_Module,
        //
        //     全局模块,
        global_module.make_path({path: "/app.json"}),
        db_prisma.make_path({path: "/app.json"}),
        db_all.make_path({path: "/app.json"}),
        tool_Module,
        tools_Module,
        // tool_Module.make_path({path: "/app.json"}),




    ],
    controllers: [appController],
    providers: [Service_app, Service_test],
    exports: [Service_app, Service_test],


})
export class AppModule {
}
