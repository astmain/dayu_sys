import {Module} from "@nestjs/common"
import {DB_prisma} from "../DB_prisma/DB_prisma"
import {files_module} from "@Controller/files/files_module"
// test
import {test1_module} from "@Controller/test1/test1"
// user
import {user2_module} from "@Controller/user2/user2"
import {user3_module} from "@Controller/user3/user3"
import {user4_module} from "@Controller/user4/user4";
// orm
// import {orm1_module} from "@Controller/orm1/orm1";
// import {orm2_module} from "@Controller/orm2/orm2";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "@Controller/users/entities/user.entity"
import {createConnection} from "typeorm";


// console.log(`111---222:`, __dirname + '/**/*.entity{.ts,.js}')
// createConnection({
//     type: 'sqlite',
//     database: 'db.sqlite',
//     entities: [__dirname + '/**/*.entity{.ts,.js}'],
//     synchronize: true,
//     logging: true,
// }).then(connection => {
//     console.log('数据库连接成功');
// }).catch(error => {
//     console.error('数据库连接失败', error);
// });

//nestjs 使用typeorm 初始化sqlite 数据库 并链接
@Module({
    imports: [
        // TypeOrmModule.forRoot({
        //     type: 'sqlite',
        //     database: 'db.sqlite',
        //     // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //     entities: [User],
        //     synchronize: true, // 开发环境使用，生产环境建议关闭
        //     logging: true,
        //
        //     //
        //     // type: 'sqlite',
        //     // database: 'db.sqlite',
        //     // // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //     // entities: ["E:\\AAA\\dayu_sys\\dayu_sys02\\test01\\Controller\\users\\entities\\user.entity.ts"],
        //     // synchronize: true, // 开发环境使用，生产环境建议关闭
        //     // logging: true,
        //
        //     // type: 'sqlite',
        //     // database: 'db.sql',
        //     // autoLoadEntities: true,
        //     // synchronize: true,
        // }),


        // 工具模块*******************************
        DB_prisma.make_path({path: "/app.json"}),
        // 路由模块*******************************
        // 文件管理
        files_module,
        // test
        test1_module,
        // user
        user2_module,
        user3_module,
        user4_module,

        //orm
        // orm1_module,
        // orm2_module,


    ],
    controllers: [],
    providers: [
        // {provide: "test3_dec", useClass: test3_dec}
    ],
})
export class Controller_module {

}
