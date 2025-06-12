import { Module } from '@nestjs/common';

// 引入控制器
import { orm1 } from '@Controller/orm1/orm1';
import { orm2 } from '@Controller/orm2/orm2';
import { restfull01_module } from '@Controller/restfull01/restfull01_module';
// 引入数据库
import { db_typeorm } from './db_typeorm';
import { DB_prisma } from './DB_prisma/DB_prisma';
import { user_module } from './Controller/curd_user1/curd_user1';

@Module({
    imports: [

        // restfull01_module,

        // 数据库*******************************
        DB_prisma.make_path({ path: "/app.json" }),
        // DB_prisma.make_path({path: "/app.json"}),
        db_typeorm.conn,
        db_typeorm.db,

        // 路由模块*******************************
        user_module,



    ],
    controllers: [
        orm1,
        orm2,
    ],
})
export class AppModule {
}
